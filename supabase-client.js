window.HPSupabase = {
  client: null,
  ready: false,
  error: null
};

(async function(){
  try{
    const cfg = window.HP_BACKEND_CONFIG && window.HP_BACKEND_CONFIG.supabase;
    const valid = cfg && cfg.url && cfg.anonKey &&
      !String(cfg.url).startsWith("PASTE_SUPABASE") &&
      !String(cfg.anonKey).startsWith("PASTE_SUPABASE");

    if(!valid) return;

    const mod = await import('https://esm.sh/@supabase/supabase-js@2');
    const client = mod.createClient(cfg.url, cfg.anonKey);

    window.HPSupabase = {
      client,
      ready: true,
      error: null
    };

    document.dispatchEvent(new CustomEvent('hp-supabase-ready'));
  } catch (err){
    window.HPSupabase.error = err;
    console.error('Supabase init failed:', err);
  }
})();
