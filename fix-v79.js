
(function(){
  function qs(s){ return document.querySelector(s); }
  function qsa(s){ return Array.from(document.querySelectorAll(s)); }

  async function getUserAndProfile(){
    try{
      if(!window.HPAuth) return { user:null, profile:null };
      const user = await window.HPAuth.getUser();
      const profile = user && window.HPAuth.getProfile ? await window.HPAuth.getProfile() : null;
      return { user, profile };
    }catch(e){
      return { user:null, profile:null };
    }
  }

  async function renderHeader(){
    const slot = document.getElementById('hpAuthSlot');
    if(!slot) return;
    const { user, profile } = await getUserAndProfile();
    slot.innerHTML = '';

    const account = document.createElement(user ? 'a' : 'a');
    account.className = 'hp-account-chip';
    account.href = user ? 'account.html' : 'login.html';
    account.textContent = user ? 'Account' : 'Login';
    slot.appendChild(account);

    if(!user){
      const signup = document.createElement('a');
      signup.className = 'badge-btn';
      signup.href = 'signup.html';
      signup.textContent = 'Sign Up';
      slot.appendChild(signup);
    } else if(profile && profile.role === 'admin'){
      const admin = document.createElement('a');
      admin.className = 'badge-btn';
      admin.href = 'admin-dashboard.html';
      admin.textContent = 'Admin';
      slot.appendChild(admin);
    }
  }

  function toggleMenu(){
    const drawer = document.getElementById('hpDrawer');
    if(drawer) drawer.classList.toggle('open');
  }

  function setCounters(){
    const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
    const counts = {
      parts: products.length,
      stock: products.reduce((s,p)=> s + Number(p.stock || p.stockUnits || 0), 0),
      brands: [...new Set(products.map(p => p.brand).filter(Boolean))].length,
      cart: (()=> {
        try{
          const c = JSON.parse(localStorage.getItem('hp_cart') || '[]');
          return Array.isArray(c) ? c.reduce((s,i)=> s + Number(i.qty || 1), 0) : 0;
        }catch(e){ return 0; }
      })()
    };
    qsa('[data-count-key]').forEach(el => {
      const key = el.getAttribute('data-count-key');
      const value = counts[key] || 0;
      el.textContent = String(value);
      el.setAttribute('data-count-to', String(value));
      el.setAttribute('data-prev', String(value));
      el.dataset.done = '1';
    });
    qsa('[data-cart-count], .cart-count').forEach(el => el.textContent = String(counts.cart));
  }

  function bindAuthButtons(){
    const loginBtn = document.getElementById('loginSubmitBtn');
    const resetBtn = document.getElementById('resetPasswordBtn');
    const signupBtn = document.getElementById('signupSubmitBtn');

    if(loginBtn){
      loginBtn.onclick = async function(){
        const email = (qs('#loginEmail')?.value || '').trim();
        const password = (qs('#loginPassword')?.value || '').trim();
        const msg = qs('#authLoginMessage');
        if(msg) msg.textContent = 'Logging in...';
        if(!window.HPAuth){ if(msg) msg.textContent = 'Auth not ready.'; return; }
        const res = await window.HPAuth.login(email, password);
        if(res.error){ if(msg) msg.textContent = res.error.message || 'Login failed.'; return; }
        window.location.href = 'account.html';
      };
    }

    if(resetBtn){
      resetBtn.onclick = async function(){
        const email = (qs('#loginEmail')?.value || '').trim();
        const msg = qs('#authLoginMessage');
        if(!email){ if(msg) msg.textContent = 'Enter email first.'; return; }
        if(!window.HPAuth){ if(msg) msg.textContent = 'Auth not ready.'; return; }
        const res = await window.HPAuth.resetPassword(email);
        if(msg) msg.textContent = res.error ? (res.error.message || 'Reset failed.') : 'Password reset email sent.';
      };
    }

    if(signupBtn){
      signupBtn.onclick = async function(){
        const name = (qs('#signupName')?.value || '').trim();
        const email = (qs('#signupEmail')?.value || '').trim();
        const password = (qs('#signupPassword')?.value || '').trim();
        const msg = qs('#authSignupMessage');
        if(msg) msg.textContent = 'Creating account...';
        if(!window.HPAuth){ if(msg) msg.textContent = 'Auth not ready.'; return; }
        const res = await window.HPAuth.signup(email, password, name);
        if(res.error){ if(msg) msg.textContent = res.error.message || 'Signup failed.'; return; }
        if(msg) msg.textContent = 'Account created. Redirecting to login...';
        setTimeout(function(){ window.location.href = 'login.html'; }, 1200);
      };
    }
  }

  async function boot(){
    bindAuthButtons();
    setCounters();
    await renderHeader();
  }

  window.HPFix = { toggleMenu, boot };

  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(boot, 80);
  });
  document.addEventListener('hp-auth-ready', function(){ setTimeout(boot, 80); });
})();
