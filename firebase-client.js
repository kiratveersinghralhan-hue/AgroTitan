window.HPFirebase = {
  app: null,
  db: null,
  ready: false,
  error: null
};

(async function(){
  try{
    const cfg = window.HP_BACKEND_CONFIG && window.HP_BACKEND_CONFIG.firebase;
    const valid = cfg && cfg.apiKey && !String(cfg.apiKey).startsWith("PASTE_FIREBASE");
    if(!valid) return;

    const appMod = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
    const fsMod = await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js');

    const app = appMod.initializeApp(cfg);
    const db = fsMod.getFirestore(app);

    window.HPFirebase = {
      app,
      db,
      ready: true,
      error: null,
      fns: {
        collection: fsMod.collection,
        addDoc: fsMod.addDoc,
        getDocs: fsMod.getDocs,
        orderBy: fsMod.orderBy,
        query: fsMod.query,
        serverTimestamp: fsMod.serverTimestamp,
        doc: fsMod.doc,
        updateDoc: fsMod.updateDoc,
        deleteDoc: fsMod.deleteDoc
      }
    };
    document.dispatchEvent(new CustomEvent('hp-firebase-ready'));
  } catch (err){
    window.HPFirebase.error = err;
    console.error('Firebase init failed:', err);
  }
})();
