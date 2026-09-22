/* ============================================================
   LinguaLearn — js/storage.js
   Local persistence layer (localStorage) + JSON export/import.
   All app state lives in one serializable object.
   ============================================================ */

const STORAGE_KEY = "lingualearn_v1";

const Storage = {
  defaults() {
    return {
      lang: "es",
      progress: {},          // word -> 0 new | 1 learning | 2 mastered
      custom: {},            // lang -> [user-added words]
      quiz: { taken: 0, best: 0, totalQ: 0, totalCorrect: 0 },
      lastVisit: null
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s && s.lang) return Object.assign(this.defaults(), s);
      }
    } catch (e) { console.warn("Could not parse saved state:", e); }
    return this.defaults();
  },

  save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      console.warn("Could not save state:", e);
      return false;
    }
  },

  exportJSON(state) {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "lingualearn-progress.json";
    a.click();
    URL.revokeObjectURL(a.href);
  },

  importJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          if (data && data.lang) resolve(Object.assign(this.defaults(), data));
          else reject(new Error("Not a valid LinguaLearn backup file"));
        } catch (e) { reject(e); }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  },

  reset() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
