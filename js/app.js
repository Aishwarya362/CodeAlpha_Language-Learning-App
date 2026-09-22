/* ============================================================
   LinguaLearn — js/app.js
   Main application logic: flashcards, quizzes, stats, custom words.
   ============================================================ */

// ---------- state ----------
let state = Storage.load();
let curCat = "vocab";
let curIdx = 0;
let quiz = null;

function save() { Storage.save(state); }
function allWords() { return (BANK[state.lang] || []).concat(state.custom[state.lang] || []); }
function wordsInCat(cat) { return allWords().filter(w => w.cat === cat); }
function prog(w) { return state.progress[w.w] || 0; } // 0 new, 1 learning, 2 mastered

// ---------- UI helpers ----------
const $ = id => document.getElementById(id);

function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

function speak(text, langCode) {
  if (!("speechSynthesis" in window)) { toast("Speech not supported in this browser"); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = LANGS[langCode || state.lang].voiceLang;
  u.rate = 0.85;
  speechSynthesis.speak(u);
}

// ---------- tabs ----------
document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
  document.querySelectorAll(".panel").forEach(x => x.classList.remove("active"));
  t.classList.add("active");
  $("panel-" + t.dataset.tab).classList.add("active");
  if (t.dataset.tab === "stats") renderStats();
  if (t.dataset.tab === "add") renderMyWords();
}));

// ---------- language picker ----------
function renderLangPicker() {
  $("langPicker").innerHTML = Object.entries(LANGS).map(([k, v]) =>
    `<div class="lang-chip ${k === state.lang ? "active" : ""}" data-lang="${k}">${v.flag} ${v.name}</div>`
  ).join("");
  document.querySelectorAll(".lang-chip").forEach(c =>
    c.addEventListener("click", () => setLang(c.dataset.lang)));
}
function setLang(k) {
  state.lang = k; save();
  curCat = "vocab"; curIdx = 0;
  renderLangPicker(); renderCats(); renderCatSelects(); showFlashArea();
}

// ---------- categories & flashcards ----------
function renderCats() {
  $("catGrid").innerHTML = Object.entries(CATS).map(([k, c]) => {
    const ws = wordsInCat(k);
    if (!ws.length) return "";
    const done = ws.filter(w => prog(w) === 2).length;
    const pct = Math.round(done / ws.length * 100);
    return `<div class="cat-card" data-cat="${k}">
      <div class="cat-emoji">${c.emoji}</div>
      <div class="cat-name">${c.name}</div>
      <div class="cat-desc">${ws.length} cards · ${done} mastered</div>
      <div class="cat-prog"><div style="width:${pct}%"></div></div>
      <div class="cat-pct">${pct}% complete</div></div>`;
  }).join("");
  document.querySelectorAll(".cat-card").forEach(el =>
    el.addEventListener("click", () => pickCat(el.dataset.cat)));
}

function renderCatSelects() {
  const opts = Object.entries(CATS).map(([k, c]) => {
    const n = wordsInCat(k).length;
    return n ? `<option value="${k}">${c.emoji} ${c.name} (${n})</option>` : "";
  }).join("");
  $("catSelect").innerHTML = opts;
  $("quizCat").innerHTML = `<option value="all">🌍 All categories</option>` + opts;
  $("awCat").innerHTML = opts;
  $("catSelect").value = curCat;
}

function pickCat(k) { curCat = k; curIdx = 0; showFlashArea(); }
function currentList() { return wordsInCat(curCat); }

function showFlashArea() {
  const list = currentList();
  const has = list.length > 0;
  $("flashWrap").style.display = has ? "block" : "none";
  $("flashNav").style.display = has ? "flex" : "none";
  if (!has) { $("dots").innerHTML = ""; return; }
  if (curIdx >= list.length) curIdx = 0;
  renderCard(); renderDots(); renderCats();
}

function renderCard() {
  const c = currentList()[curIdx];
  $("fWord").textContent = c.w;
  $("fPhon").textContent = c.p || "";
  $("bTrans").textContent = c.t;
  $("bEx").textContent = c.ex ? '"' + c.ex + '"' : "";
  $("bExT").textContent = c.ext || "";
  $("bTip").textContent = c.tip ? "💡 " + c.tip : "";
  $("flashWrap").classList.remove("flipped");
}

function flipCard() { $("flashWrap").classList.toggle("flipped"); }
function speakCurrent() { const c = currentList()[curIdx]; if (c) speak(c.w); }
function nextCard() { const l = currentList(); curIdx = (curIdx + 1) % l.length; renderCard(); renderDots(); }
function prevCard() { const l = currentList(); curIdx = (curIdx - 1 + l.length) % l.length; renderCard(); renderDots(); }

function markKnown() {
  const c = currentList()[curIdx];
  state.progress[c.w] = 2; save();
  toast("✓ Mastered: " + c.w);
  nextCard();
}

function renderDots() {
  const l = currentList();
  $("dots").innerHTML = l.map((w, i) =>
    `<div class="dot ${prog(w) === 2 ? "mastered" : prog(w) === 1 ? "seen" : ""} ${i === curIdx ? "cur" : ""}" data-i="${i}" title="${w.w}"></div>`
  ).join("");
  document.querySelectorAll(".dot").forEach(d =>
    d.addEventListener("click", () => { curIdx = +d.dataset.i; renderCard(); renderDots(); }));
}

// ---------- quiz ----------
function startQuiz() {
  const cat = $("quizCat").value;
  let pool = cat === "all" ? allWords() : wordsInCat(cat);
  if (pool.length < 4) { toast("Need at least 4 words in this category"); return; }
  pool = pool.slice().sort(() => Math.random() - .5).slice(0, Math.min(10, pool.length));
  quiz = { qs: pool.map(w => makeQuestion(w, pool)), i: 0, score: 0, wrong: [] };
  $("quizSetup").style.display = "none";
  $("quizResult").style.display = "none";
  $("quizPlay").style.display = "block";
  renderQuestion();
}

function makeQuestion(w, pool) {
  const types = pool.length >= 4 ? ["choice", "reverse", "blank", "listen"] : ["choice"];
  const type = types[Math.floor(Math.random() * types.length)];
  const distract = pool.filter(x => x.w !== w.w).sort(() => Math.random() - .5).slice(0, 3).map(x => x.t);
  return { w, type, distract };
}

function wordForTrans(t) { const o = allWords().find(x => x.t === t); return o ? o.w : t; }

function renderQuestion() {
  const q = quiz.qs[quiz.i];
  $("qNum").textContent = `Question ${quiz.i + 1} / ${quiz.qs.length}`;
  $("qScore").textContent = `⭐ ${quiz.score}`;
  $("qBarFill").style.width = (quiz.i / quiz.qs.length * 100) + "%";
  $("qFeedback").textContent = "";
  $("qNext").style.display = "none";
  $("qSpeakRow").innerHTML = "";
  $("qOpts").innerHTML = "";

  const forward = (q.type === "choice" || q.type === "listen");
  let prompt, options;
  if (q.type === "choice") {
    prompt = `What does <b style="color:var(--accent2)">"${q.w.w}"</b> mean?`;
    options = [q.w.t].concat(q.distract);
  } else if (q.type === "reverse") {
    prompt = `How do you say <b style="color:var(--accent2)">"${q.w.t}"</b> in ${LANGS[state.lang].name}?`;
    options = [q.w.w].concat(q.distract.map(wordForTrans));
  } else if (q.type === "blank") {
    const blanked = q.w.ex ? q.w.ex.replace(q.w.w, "_____") : "_____";
    prompt = `Fill the blank: <b style="color:var(--accent2)">${blanked}</b><br><span style="font-size:12px;color:var(--muted)">(${q.w.ext || q.w.t})</span>`;
    options = [q.w.w].concat(q.distract.map(wordForTrans));
  } else { // listen
    prompt = `🔊 Listen and pick the correct translation:`;
    options = [q.w.t].concat(q.distract);
    $("qSpeakRow").innerHTML = `<button class="btn ghost sm" id="qPlayBtn">🔊 Play pronunciation</button>`;
    $("qPlayBtn").addEventListener("click", () => speak(q.w.w));
    setTimeout(() => speak(q.w.w), 350);
  }
  $("qPrompt").innerHTML = prompt;

  options.sort(() => Math.random() - .5);
  options.forEach(o => {
    const b = document.createElement("button");
    b.className = "quiz-opt"; b.textContent = o;
    b.addEventListener("click", () => answer(b, o === (forward ? q.w.t : q.w.w), q, forward));
    $("qOpts").appendChild(b);
  });
}

function answer(btn, ok, q, forward) {
  const correctText = forward ? q.w.t : q.w.w;
  document.querySelectorAll(".quiz-opt").forEach(b => {
    b.disabled = true;
    if (b.textContent === correctText) b.classList.add("correct");
  });
  if (ok) {
    quiz.score++;
    btn.classList.add("correct");
    $("qFeedback").innerHTML = '<span style="color:var(--ok)">✓ Correct!</span>';
  } else {
    btn.classList.add("wrong");
    $("qFeedback").innerHTML = `<span style="color:var(--bad)">✗ Correct answer: <b>${correctText}</b></span>`;
    quiz.wrong.push(q.w);
  }
  state.progress[q.w.w] = Math.max(prog(q.w), ok ? 2 : 1);
  state.quiz.totalQ++; if (ok) state.quiz.totalCorrect++;
  save();
  $("qNext").style.display = "block";
  $("qScore").textContent = `⭐ ${quiz.score}`;
}

function nextQuestion() {
  quiz.i++;
  if (quiz.i >= quiz.qs.length) finishQuiz(); else renderQuestion();
}

function finishQuiz() {
  $("quizPlay").style.display = "none";
  $("quizResult").style.display = "block";
  const pct = Math.round(quiz.score / quiz.qs.length * 100);
  $("rScore").textContent = `${quiz.score} / ${quiz.qs.length}`;
  $("rEmoji").textContent = pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "💪" : "📖";
  $("rMsg").textContent = pct >= 90 ? "Outstanding! You nailed it."
    : pct >= 70 ? "Great job — almost perfect!"
    : pct >= 50 ? "Good effort, keep practicing!"
    : "Review the flashcards and try again.";
  $("rReview").innerHTML = quiz.wrong.length
    ? `<b style="font-size:13px">Review these:</b>` + quiz.wrong.map(w =>
        `<div style="font-size:13px;padding:7px 10px;background:var(--card);border-radius:9px;margin-top:6px"><b>${w.w}</b> — ${w.t}</div>`).join("")
    : '<span style="color:var(--ok);font-size:13px">No mistakes — flawless! 🎯</span>';
  state.quiz.taken++;
  state.quiz.best = Math.max(state.quiz.best, pct);
  save();
  renderCats();
}

function backToSetup() {
  $("quizResult").style.display = "none";
  $("quizSetup").style.display = "block";
}

// ---------- stats ----------
function renderStats() {
  const ws = allWords();
  const m = ws.filter(w => prog(w) === 2).length;
  const l = ws.filter(w => prog(w) === 1).length;
  const acc = state.quiz.totalQ ? Math.round(state.quiz.totalCorrect / state.quiz.totalQ * 100) + "%" : "—";
  $("statCards").innerHTML = `
    <div class="stat"><b>${ws.length}</b><span>Total words</span></div>
    <div class="stat"><b>${m}</b><span>Mastered 🟢</span></div>
    <div class="stat"><b>${l}</b><span>Learning 🟡</span></div>
    <div class="stat"><b>${state.quiz.taken}</b><span>Quizzes taken</span></div>
    <div class="stat"><b>${state.quiz.best}%</b><span>Best quiz score</span></div>
    <div class="stat"><b>${acc}</b><span>Lifetime accuracy</span></div>`;
  $("bankBody").innerHTML = ws.map(w => {
    const p = prog(w);
    const cls = p === 2 ? "m-mastered" : p === 1 ? "m-learning" : "m-new";
    const lbl = p === 2 ? "Mastered" : p === 1 ? "Learning" : "New";
    const cat = CATS[w.cat] ? CATS[w.cat].emoji + " " + CATS[w.cat].name : w.cat;
    return `<tr><td><b>${w.w}</b></td><td>${w.t}</td><td>${cat}</td>
      <td><span class="mastery ${cls}">${lbl}</span></td>
      <td><button class="btn sm ghost bank-speak" data-w="${encodeURIComponent(w.w)}">🔊</button></td></tr>`;
  }).join("") || `<tr><td colspan="5" class="empty">No words yet — switch language or add your own!</td></tr>`;
  document.querySelectorAll(".bank-speak").forEach(b =>
    b.addEventListener("click", () => speak(decodeURIComponent(b.dataset.w))));
}

// ---------- data export / import / reset ----------
function exportData() { Storage.exportJSON(state); toast("Progress exported ⬇"); }

function importData(e) {
  const f = e.target.files[0];
  if (!f) return;
  Storage.importJSON(f).then(d => {
    state = d; save(); setLang(state.lang); renderStats();
    toast("Progress imported ⬆");
  }).catch(() => toast("Invalid backup file"));
  e.target.value = "";
}

function resetAll() {
  if (!confirm("Reset ALL progress? This cannot be undone.")) return;
  state.progress = {};
  state.quiz = { taken: 0, best: 0, totalQ: 0, totalCorrect: 0 };
  save();
  renderStats(); renderCats(); showFlashArea();
  toast("Progress reset");
}

// ---------- cloud sync ----------
async function cloudSave() {
  try {
    await CloudSync.push(state);
    toast("☁️ Synced to cloud");
  } catch (e) {
    $("cloudStatus").textContent = "Cloud sync not configured — see js/firebase-sync.js for setup steps. Local save is unaffected.";
    toast("Cloud sync unavailable (using local save)");
  }
}

async function cloudLoad() {
  try {
    state = await CloudSync.pull();
    save(); setLang(state.lang); renderStats();
    toast("☁️ Restored from cloud");
  } catch (e) {
    $("cloudStatus").textContent = "Cloud sync not configured — see js/firebase-sync.js for setup steps.";
    toast("Cloud sync unavailable");
  }
}

// ---------- custom words ----------
function addWord() {
  const w = $("awWord").value.trim(), t = $("awTrans").value.trim();
  if (!w || !t) { toast("Word and translation are required"); return; }
  const item = {
    w, t,
    p: $("awPhon").value.trim(),
    cat: $("awCat").value,
    ex: $("awEx").value.trim(), ext: "",
    tip: $("awTip").value.trim()
  };
  (state.custom[state.lang] = state.custom[state.lang] || []).push(item);
  save();
  ["awWord", "awTrans", "awPhon", "awEx", "awTip"].forEach(id => $(id).value = "");
  renderMyWords(); renderCats(); renderCatSelects(); showFlashArea();
  toast("Added: " + w);
}

function renderMyWords() {
  const list = state.custom[state.lang] || [];
  $("myWords").innerHTML = list.length
    ? `<div style="background:var(--card);border-radius:16px;padding:14px;border:1px solid #31376e">
        <h3 style="margin:0 0 8px;font-size:14px">⭐ My words in ${LANGS[state.lang].name} (${list.length})</h3>
        ${list.map((w, i) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 4px;border-bottom:1px solid #262b55;font-size:13px">
          <span><b>${w.w}</b> — ${w.t} <span style="color:var(--muted)">(${CATS[w.cat].name})</span></span>
          <span><button class="btn sm ghost mw-speak" data-w="${encodeURIComponent(w.w)}">🔊</button>
          <button class="btn sm ghost mw-del" data-i="${i}" style="color:var(--bad)">✕</button></span></div>`).join("")}
       </div>`
    : `<div class="empty">No custom words yet for ${LANGS[state.lang].name}.</div>`;
  document.querySelectorAll(".mw-speak").forEach(b =>
    b.addEventListener("click", () => speak(decodeURIComponent(b.dataset.w))));
  document.querySelectorAll(".mw-del").forEach(b =>
    b.addEventListener("click", () => {
      state.custom[state.lang].splice(+b.dataset.i, 1);
      save(); renderMyWords(); renderCats(); renderCatSelects(); showFlashArea();
    }));
}

// ---------- event wiring ----------
$("flashInner").addEventListener("click", flipCard);
$("speakBtn").addEventListener("click", e => { e.stopPropagation(); speakCurrent(); });
$("prevBtn").addEventListener("click", prevCard);
$("nextBtn").addEventListener("click", nextCard);
$("knownBtn").addEventListener("click", markKnown);
$("catSelect").addEventListener("change", e => pickCat(e.target.value));
$("startQuizBtn").addEventListener("click", startQuiz);
$("qNext").addEventListener("click", nextQuestion);
$("retryBtn").addEventListener("click", startQuiz);
$("changeCatBtn").addEventListener("click", backToSetup);
$("exportBtn").addEventListener("click", exportData);
$("importBtn").addEventListener("click", () => $("importFile").click());
$("importFile").addEventListener("change", importData);
$("resetBtn").addEventListener("click", resetAll);
$("cloudSaveBtn").addEventListener("click", cloudSave);
$("cloudLoadBtn").addEventListener("click", cloudLoad);
$("addWordBtn").addEventListener("click", addWord);

// ---------- init ----------
(function init() {
  CloudSync.init();
  const today = new Date().toDateString();
  if (state.lastVisit !== today) {
    state.lastVisit = today; save();
    setTimeout(() => toast("🌅 Welcome back! Your daily lesson awaits."), 600);
  }
  renderLangPicker(); renderCats(); renderCatSelects(); showFlashArea();
})();
