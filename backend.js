(function(){
  const STORAGE_KEY = "hp_v67_backend_store";

  const defaults = {
    contactLeads: [],
    sellerLeads: [],
    callbacks: [],
    adminNotes: []
  };

  function loadLocal(){
    try{
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return Object.assign({}, defaults, data);
    }catch(e){
      return structuredClone ? structuredClone(defaults) : JSON.parse(JSON.stringify(defaults));
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

  const provider = (window.HP_BACKEND_CONFIG && window.HP_BACKEND_CONFIG.provider) || "local";

  async function firebaseReady(){
    return false;
  }

  window.HPBackend = {
    provider,
    isFirebaseConfigured(){
      const cfg = window.HP_BACKEND_CONFIG && window.HP_BACKEND_CONFIG.firebase;
      return !!(cfg && cfg.apiKey && cfg.projectId && cfg.appId);
    },
    async insert(collection, payload){
      if(this.provider === "firebase" && this.isFirebaseConfigured() && await firebaseReady()){
        throw new Error("Firebase mode scaffold added, but Firebase SDK wiring is not yet injected in this static build.");
      }
      return localInsert(collection, payload);
    },
    async list(collection){
      if(this.provider === "firebase" && this.isFirebaseConfigured() && await firebaseReady()){
        throw new Error("Firebase mode scaffold added, but Firebase SDK wiring is not yet injected in this static build.");
      }
      return localList(collection);
    },
    async update(collection, id, patch){
      if(this.provider === "firebase" && this.isFirebaseConfigured() && await firebaseReady()){
        throw new Error("Firebase mode scaffold added, but Firebase SDK wiring is not yet injected in this static build.");
      }
      return localUpdate(collection, id, patch);
    },
    async remove(collection, id){
      if(this.provider === "firebase" && this.isFirebaseConfigured() && await firebaseReady()){
        throw new Error("Firebase mode scaffold added, but Firebase SDK wiring is not yet injected in this static build.");
      }
      return localRemove(collection, id);
    }
  };
})();
