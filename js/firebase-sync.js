/* ============================================================
   LinguaLearn — js/firebase-sync.js
   Optional cloud sync via Firebase Firestore.

   HOW TO ENABLE (one-time setup, ~5 minutes):
   1. Go to https://console.firebase.google.com and create a project.
   2. Build → Firestore Database → Create database (test mode is fine
      for a demo; add security rules before production).
   3. Project settings → "Your apps" → add a Web app → copy the
      firebaseConfig object below.
   4. Paste it into FIREBASE_CONFIG.

   The app works 100% offline without this. If config is missing or
   Firebase fails to load, sync buttons show a friendly message and
   everything keeps using localStorage.
   ============================================================ */

const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const CloudSync = {
  db: null,
  enabled: false,

  init() {
    try {
      if (typeof firebase === "undefined") return;
      if (!FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === "YOUR_API_KEY") return;
      firebase.initializeApp(FIREBASE_CONFIG);
      this.db = firebase.firestore();
      this.enabled = true;
    } catch (e) {
      console.warn("Cloud sync unavailable:", e);
    }
  },

  // Simple device "account" — swap for Firebase Auth in production.
  userId() {
    let id = localStorage.getItem("lingualearn_userid");
    if (!id) {
      id = "user-" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem("lingualearn_userid", id);
    }
    return id;
  },

  async push(state) {
    if (!this.enabled) throw new Error("Cloud sync not configured");
    await this.db.collection("users").doc(this.userId()).set({
      state: state,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return true;
  },

  async pull() {
    if (!this.enabled) throw new Error("Cloud sync not configured");
    const doc = await this.db.collection("users").doc(this.userId()).get();
    if (!doc.exists) throw new Error("No cloud data found for this device");
    const data = doc.data();
    if (!data.state || !data.state.lang) throw new Error("Cloud data is invalid");
    return data.state;
  }
};
