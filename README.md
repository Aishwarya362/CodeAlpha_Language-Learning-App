# 🌍 LinguaLearn — Interactive Language Learning App

An internship-project-ready, single-page web application for learning vocabulary,
phrases, and grammar in **Spanish, French, German, Japanese, and Hindi** — with
flashcards, audio pronunciations, adaptive quizzes, and progress tracking.

---

## ✨ Features

### 📚 Learn Mode (Flashcards)
- 5 categories: **Vocabulary, Everyday Phrases, Grammar Focus, Travel & Places, Food & Dining**
- 3D flip-card animation (tap to reveal translation)
- 🔊 **Text-to-speech pronunciation** for every card (Web Speech API, native voice per language)
- Phonetic spelling, example sentences, and memory tips
- Per-card mastery tracking (New 🟣 → Learning 🟡 → Mastered 🟢)
- Progress bars per category + progress dots for each deck

### 🧠 Quiz Mode
- 10-question adaptive quizzes with **4 question types**:
  - Translation (target → English)
  - Reverse translation (English → target)
  - Fill-in-the-blank (from example sentences)
  - Listening comprehension (audio + multiple choice)
- Instant right/wrong feedback with correct-answer reveal
- End-of-quiz score, emoji rating, and a **mistake review list**
- Quiz history: attempts, best score, lifetime accuracy

### 📊 Progress Dashboard
- Stats cards: total words, mastered, learning, quizzes taken, best score, accuracy
- Full **word bank** table with mastery status and audio replay
- **Export / Import** progress as JSON (manual backup & cross-device sync)

### ☁️ Cloud Sync (Firebase)
- Optional **Firestore** integration — "Sync to Cloud" / "Restore from Cloud" buttons
- Works 100% offline without Firebase (graceful degradation to localStorage)
- Setup takes ~5 minutes — see [Firebase Setup](#-firebase-setup-optional)

### ➕ Custom Words
- Users can add their own vocabulary with category, phonetics, example, and tip
- Custom words persist per language and appear in flashcards & quizzes

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | HTML5, CSS3 (custom design system, 3D transforms), Vanilla JavaScript (ES6+) |
| Audio      | Web Speech API (`SpeechSynthesisUtterance`) |
| Local data | `localStorage` (single serializable state object) |
| Cloud data | Firebase Firestore (optional, v10 compat SDK via CDN) |

**No build step, no frameworks, no dependencies** — open `index.html` and it runs.

---

## 🚀 How to Run

1. Clone or download this folder.
2. Open `index.html` in any modern browser (Chrome/Edge/Firefox recommended).
3. That's it — progress auto-saves to localStorage.

> Tip: for the best experience (and to avoid any browser file:// quirks),
> serve it locally: `npx serve .` or `python -m http.server 8000`

---

## 🔥 Firebase Setup (Optional)

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → create a project.
2. **Build → Firestore Database → Create database** (start in test mode for the demo).
3. **Project settings → Your apps → Web app** → copy the `firebaseConfig` object.
4. Paste it into `FIREBASE_CONFIG` at the top of **`js/firebase-sync.js`**.
5. Reload the app — the ☁️ buttons now sync to Firestore.

**Production note:** the demo identifies users with a random device ID stored in
localStorage. For real multi-device accounts, swap this for **Firebase Authentication**
and store progress under `users/{uid}`.

---

## 📁 Project Structure

```
lingualearn/
├── index.html            # Single-page app shell (4 tabs)
├── css/
│   └── style.css         # Design system, 3D flip cards, responsive layout
├── js/
│   ├── data.js           # Content: 5 languages × 5 categories × ~18 cards
│   ├── storage.js        # localStorage layer + JSON export/import
│   ├── firebase-sync.js  # Optional Firestore cloud sync (graceful fallback)
│   └── app.js            # App logic: flashcards, quiz engine, stats, CRUD
└── README.md             # This file
```

---

## 🧠 Key Design Decisions

- **State as one serializable object** — makes localStorage, JSON export, and
  Firestore sync trivially the same code path.
- **Mastery = max(previous, result)** — a wrong answer demotes nothing below
  "learning"; a right answer promotes to "mastered" (spaced-repetition-lite).
- **Quiz distractors drawn from the same category** — plausible wrong answers
  instead of random noise.
- **Offline-first** — Firebase is a progressive enhancement, never a requirement.

---

*Built as an internship task demo. Free to extend: add Auth, streaks, decks
per user, or swap the static `data.js` bank for an API.*
