(function(){
  const STORAGE_KEY = "hp_v68_backend_store";
  const defaults = {
    contactLeads: [],
    sellerLeads: [],
    callbacks: []
  };

  function clone(obj){
    return JSON.parse(JSON.stringify(obj));
  }
  function loadLocal(){
    try{
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return Object.assign(clone(defaults), data);
    }catch(e){
      return clone(defaults);
    }
  }
  function saveLocal(data){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  async function localInsert(collection, payload){
    const db = loadLocal();
    if(!Array.isArray(db[collection])) db[collection] = [];
    const item = Object.assign({
      id: collection + "-" + Date.now() + "-" + Math.floor(Math.random() * 10000),
      createdAt: new Date().toISOString(),
      status: "new"
    }, payload);
    db[collection].unshift(item);
    saveLocal(db);
    return item;
  }
  async function localList(collection){
    const db = loadLocal();
    return (db[collection] || []).slice();
  }
  async function localUpdate(collection, id, patch){
    const db = loadLocal();
    db[collection] = (db[collection] || []).map(item => item.id === id ? Object.assign({}, item, patch) : item);
    saveLocal(db);
    return true;
  }
  async function localRemove(collection, id){
    const db = loadLocal();
    db[collection] = (db[collection] || []).filter(item => item.id !== id);
    saveLocal(db);
    return true;
  }

  function firebaseConfigured(){
    const cfg = window.HP_BACKEND_CONFIG && window.HP_BACKEND_CONFIG.firebase;
    return !!(cfg && cfg.apiKey && !String(cfg.apiKey).startsWith("PASTE_FIREBASE") && cfg.projectId && cfg.appId);
  }

  async function waitForFirebase(ms = 6000){
    const start = Date.now();
    while(Date.now() - start < ms){
      if(window.HPFirebase && window.HPFirebase.ready && window.HPFirebase.db) return true;
      await new Promise(r => setTimeout(r, 120));
    }
    return !!(window.HPFirebase && window.HPFirebase.ready && window.HPFirebase.db);
  }

  async function firebaseInsert(collectionName, payload){
    const ok = await waitForFirebase();
    if(!ok) throw new Error("Firebase not ready");
    const { db, fns } = window.HPFirebase;
    const data = Object.assign({
      createdAt: fns.serverTimestamp(),
      status: "new"
    }, payload);
    const ref = await fns.addDoc(fns.collection(db, collectionName), data);
    return Object.assign({ id: ref.id }, payload, { status: "new" });
  }

  async function firebaseList(collectionName){
    const ok = await waitForFirebase();
    if(!ok) throw new Error("Firebase not ready");
    const { db, fns } = window.HPFirebase;
    const q = fns.query(fns.collection(db, collectionName), fns.orderBy("createdAt", "desc"));
    const snap = await fns.getDocs(q);
    return snap.docs.map(docSnap => {
      const data = docSnap.data();
      return Object.assign({ id: docSnap.id }, data, {
        createdAt: data.createdAt && data.createdAt.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || "")
      });
    });
  }

  async function firebaseUpdate(collectionName, id, patch){
    const ok = await waitForFirebase();
    if(!ok) throw new Error("Firebase not ready");
    const { db, fns } = window.HPFirebase;
    await fns.updateDoc(fns.doc(db, collectionName, id), patch);
    return true;
  }

  async function firebaseRemove(collectionName, id){
    const ok = await waitForFirebase();
    if(!ok) throw new Error("Firebase not ready");
    const { db, fns } = window.HPFirebase;
    await fns.deleteDoc(fns.doc(db, collectionName, id));
    return true;
  }

  function useFirebase(){
    return (window.HP_BACKEND_CONFIG && window.HP_BACKEND_CONFIG.provider === "firebase" && firebaseConfigured());
  }

  window.HPBackend = {
    async insert(collection, payload){
      if(useFirebase()){
        try { return await firebaseInsert(collection, payload); }
        catch(err){ console.warn("Firebase insert failed, using local fallback.", err); }
      }
      return localInsert(collection, payload);
    },
    async list(collection){
      if(useFirebase()){
        try { return await firebaseList(collection); }
        catch(err){ console.warn("Firebase list failed, using local fallback.", err); }
      }
      return localList(collection);
    },
    async update(collection, id, patch){
      if(useFirebase()){
        try { return await firebaseUpdate(collection, id, patch); }
        catch(err){ console.warn("Firebase update failed, using local fallback.", err); }
      }
      return localUpdate(collection, id, patch);
    },
    async remove(collection, id){
      if(useFirebase()){
        try { return await firebaseRemove(collection, id); }
        catch(err){ console.warn("Firebase remove failed, using local fallback.", err); }
      }
      return localRemove(collection, id);
    },
    isFirebaseConfigured: firebaseConfigured
  };
})();
