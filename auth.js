(async function(){
  try{
    const mod = await import('https://esm.sh/@supabase/supabase-js@2');
    const cfg = window.HP_BACKEND_CONFIG?.supabase;
    if(!cfg || !cfg.url || !cfg.anonKey) return;

    const supabase = mod.createClient(cfg.url, cfg.anonKey);

    async function getUser(){
      const { data } = await supabase.auth.getUser();
      return data?.user || null;
    }

    async function getProfile(){
      const user = await getUser();
      if(!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('id,email,role,full_name')
        .eq('id', user.id)
        .single();
      if(error) return null;
      return data;
    }

    async function requireAdmin(){
      const user = await getUser();
      if(!user) return { ok:false, reason:'not_logged_in' };
      const profile = await getProfile();
      if(!profile || profile.role !== 'admin') return { ok:false, reason:'not_admin', user, profile };
      return { ok:true, user, profile };
    }

    window.HPAuth = {
      client: supabase,
      async login(email, password){
        return supabase.auth.signInWithPassword({ email, password });
      },
      async logout(){
        return supabase.auth.signOut();
      },
      getUser,
      getProfile,
      requireAdmin
    };

    document.dispatchEvent(new CustomEvent('hp-auth-ready'));
  }catch(err){
    console.error('Auth init failed:', err);
  }
})();
