window.HPAuthReady = false;

(async function(){
  try{
    const cfg = window.HP_BACKEND_CONFIG?.supabase;
    if(!cfg || !cfg.url || !cfg.anonKey || String(cfg.url).includes('PASTE_SUPABASE') || String(cfg.anonKey).includes('PASTE_SUPABASE')){
      console.warn('Supabase keys missing in backend-config.js');
      document.dispatchEvent(new CustomEvent('hp-auth-missing-config'));
      return;
    }

    const mod = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = mod.createClient(cfg.url, cfg.anonKey);

    async function getUser(){
      const { data } = await supabase.auth.getUser();
      return data?.user || null;
    }

    async function getSession(){
      const { data } = await supabase.auth.getSession();
      return data?.session || null;
    }

    async function getProfile(){
      const user = await getUser();
      if(!user) return null;
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
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
      signup: (email,password,full_name)=>supabase.auth.signUp({ email, password, options:{ data:{ full_name } } }),
      login: (email,password)=>supabase.auth.signInWithPassword({ email, password }),
      logout: ()=>supabase.auth.signOut(),
      resetPassword: (email)=>supabase.auth.resetPasswordForEmail(email,{ redirectTo: window.location.origin + window.location.pathname.replace(/[^/]*$/, 'login.html') }),
      getUser,
      getSession,
      getProfile,
      requireAdmin,
      onAuthChange: (cb)=>supabase.auth.onAuthStateChange((_e,s)=>cb(s))
    };

    window.HPAuthReady = true;
    document.dispatchEvent(new CustomEvent('hp-auth-ready'));

    if(window.HPAuth.onAuthChange){
      window.HPAuth.onAuthChange(() => {
        document.dispatchEvent(new CustomEvent('hp-auth-ready'));
      });
    }
  }catch(err){
    console.error('Auth init failed:', err);
  }
})();
