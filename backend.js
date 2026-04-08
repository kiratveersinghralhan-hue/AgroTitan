(function(){
  const STORAGE_KEY = "hp_v69_backend_store";
  const defaults = {
    contactLeads: [],
    sellerLeads: [],
    callbacks: []
  };

  function clone(obj){ return JSON.parse(JSON.stringify(obj)); }
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

  function supabaseConfigured(){
    const cfg = window.HP_BACKEND_CONFIG && window.HP_BACKEND_CONFIG.supabase;
    return !!(cfg && cfg.url && cfg.anonKey &&
      !String(cfg.url).startsWith("PASTE_SUPABASE") &&
      !String(cfg.anonKey).startsWith("PASTE_SUPABASE"));
  }

  async function waitForSupabase(ms = 6000){
    const start = Date.now();
    while(Date.now() - start < ms){
      if(window.HPSupabase && window.HPSupabase.ready && window.HPSupabase.client) return true;
      await new Promise(r => setTimeout(r, 120));
    }
    return !!(window.HPSupabase && window.HPSupabase.ready && window.HPSupabase.client);
  }

  function mapCollectionToTable(name){
    return {
      contactLeads: "contact_leads",
      sellerLeads: "seller_leads",
      callbacks: "callback_requests"
    }[name] || name;
  }

  async function supabaseInsert(collectionName, payload){
    const ok = await waitForSupabase();
    if(!ok) throw new Error("Supabase not ready");
    const client = window.HPSupabase.client;
    const table = mapCollectionToTable(collectionName);

    const row = Object.assign({
      status: "new"
    }, payload);

    const { data, error } = await client.from(table).insert(row).select().single();
    if(error) throw error;
    return data;
  }

  async function supabaseList(collectionName){
    const ok = await waitForSupabase();
    if(!ok) throw new Error("Supabase not ready");
    const client = window.HPSupabase.client;
    const table = mapCollectionToTable(collectionName);

    const { data, error } = await client
      .from(table)
      .select("*")
      .order("created_at", { ascending: false });

    if(error) throw error;
    return (data || []).map(item => Object.assign({}, item, {
      id: item.id,
      createdAt: item.created_at || item.createdAt || ""
    }));
  }

  async function supabaseUpdate(collectionName, id, patch){
    const ok = await waitForSupabase();
    if(!ok) throw new Error("Supabase not ready");
    const client = window.HPSupabase.client;
    const table = mapCollectionToTable(collectionName);

    const { error } = await client.from(table).update(patch).eq("id", id);
    if(error) throw error;
    return true;
  }

  async function supabaseRemove(collectionName, id){
    const ok = await waitForSupabase();
    if(!ok) throw new Error("Supabase not ready");
    const client = window.HPSupabase.client;
    const table = mapCollectionToTable(collectionName);

    const { error } = await client.from(table).delete().eq("id", id);
    if(error) throw error;
    return true;
  }

  function useSupabase(){
    return (window.HP_BACKEND_CONFIG && window.HP_BACKEND_CONFIG.provider === "supabase" && supabaseConfigured());
  }

  window.HPBackend = {
    async insert(collection, payload){
      if(useSupabase()){
        try { return await supabaseInsert(collection, payload); }
        catch(err){ console.warn("Supabase insert failed, using local fallback.", err); }
      }
      return localInsert(collection, payload);
    },
    async list(collection){
      if(useSupabase()){
        try { return await supabaseList(collection); }
        catch(err){ console.warn("Supabase list failed, using local fallback.", err); }
      }
      return localList(collection);
    },
    async update(collection, id, patch){
      if(useSupabase()){
        try { return await supabaseUpdate(collection, id, patch); }
        catch(err){ console.warn("Supabase update failed, using local fallback.", err); }
      }
      return localUpdate(collection, id, patch);
    },
    async remove(collection, id){
      if(useSupabase()){
        try { return await supabaseRemove(collection, id); }
        catch(err){ console.warn("Supabase remove failed, using local fallback.", err); }
      }
      return localRemove(collection, id);
    },
    isSupabaseConfigured: supabaseConfigured
  };
})();
