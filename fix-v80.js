
(function(){
  function q(s,root=document){ return root.querySelector(s); }
  function qa(s,root=document){ return Array.from(root.querySelectorAll(s)); }

  async function getUserProfile(){
    try{
      if(!window.HPAuth) return {user:null, profile:null};
      const user = await window.HPAuth.getUser();
      const profile = user && window.HPAuth.getProfile ? await window.HPAuth.getProfile() : null;
      return {user, profile};
    }catch(e){
      return {user:null, profile:null};
    }
  }

  function toggleMenu(){
    const drawer = q('#hpV80Drawer');
    if(drawer) drawer.classList.toggle('open');
  }

  async function updateHeader(){
    const slot = q('#hpAuthSlot');
    if(!slot) return;
    const {user, profile} = await getUserProfile();
    const accBtn = q('.hp-v80-account-btn');
    const avatar = q('.hp-v80-avatar');
    if(accBtn){
      accBtn.textContent = user ? 'Account' : 'Login';
      accBtn.href = user ? 'account.html' : 'login.html';
    }
    if(avatar){
      avatar.textContent = user ? '👤' : '→';
      avatar.href = user ? 'account.html' : 'login.html';
    }
    slot.innerHTML = '';
    if(user){
      const pill = document.createElement('span');
      pill.className = 'hp-account-chip';
      pill.textContent = profile && profile.full_name ? profile.full_name.split(' ')[0] : 'Signed In';
      slot.appendChild(pill);
    }
  }

  function setCounters(){
    const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
    const parts = products.length;
    const stock = products.reduce((s,p)=> s + Number(p.stock || p.stockUnits || 0), 0);
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))].length;
    let cart = 0;
    try{
      const c = JSON.parse(localStorage.getItem('hp_cart') || '[]');
      cart = Array.isArray(c) ? c.reduce((s,i)=> s + Number(i.qty || 1), 0) : 0;
    }catch(e){}
    const map = {parts, stock, brands, cart};
    qa('[data-count-key]').forEach(el => {
      const key = el.getAttribute('data-count-key');
      el.textContent = String(map[key] || 0);
      el.setAttribute('data-count-to', String(map[key] || 0));
      el.setAttribute('data-prev', String(map[key] || 0));
      el.dataset.done = '1';
    });
    qa('[data-cart-count], .cart-count').forEach(el => el.textContent = String(cart));
    qa('a,button,div').forEach(el => {
      const t = (el.textContent || '').trim();
      if(/^Cart\d+$/i.test(t)) el.textContent = 'Cart' + cart;
    });
  }

  function initCarousels(){
    qa('.hp-carousel').forEach((carousel, idx) => {
      if(carousel.dataset.bound === '1') return;
      carousel.dataset.bound = '1';
      const slides = qa('.hp-slide', carousel);
      if(!slides.length) return;
      let current = Math.max(0, slides.findIndex(s => s.classList.contains('active')));
      if(current < 0) current = 0;

      function show(i){
        current = (i + slides.length) % slides.length;
        slides.forEach((slide, n) => slide.classList.toggle('active', n === current));
      }
      show(current);

      const prev = q('.hp-carousel-btn.prev', carousel);
      const next = q('.hp-carousel-btn.next', carousel);
      if(prev) prev.onclick = () => show(current - 1);
      if(next) next.onclick = () => show(current + 1);

      let timer = setInterval(() => show(current + 1), 4000);
      carousel.addEventListener('mouseenter', () => clearInterval(timer));
      carousel.addEventListener('mouseleave', () => timer = setInterval(() => show(current + 1), 4000));
    });
  }

  function bindAuth(){
    const loginBtn = q('#loginSubmitBtn');
    const resetBtn = q('#resetPasswordBtn');
    const signupBtn = q('#signupSubmitBtn');

    if(loginBtn){
      loginBtn.onclick = async function(){
        const email = (q('#loginEmail')?.value || '').trim();
        const password = (q('#loginPassword')?.value || '').trim();
        const msg = q('#authLoginMessage');
        if(msg) msg.textContent = 'Logging in...';
        if(!window.HPAuth){ if(msg) msg.textContent = 'Auth not ready.'; return; }
        const res = await window.HPAuth.login(email, password);
        if(res.error){ if(msg) msg.textContent = res.error.message || 'Login failed.'; return; }
        window.location.href = 'account.html';
      };
    }

    if(resetBtn){
      resetBtn.onclick = async function(){
        const email = (q('#loginEmail')?.value || '').trim();
        const msg = q('#authLoginMessage');
        if(!email){ if(msg) msg.textContent = 'Enter your email first.'; return; }
        if(!window.HPAuth){ if(msg) msg.textContent = 'Auth not ready.'; return; }
        const res = await window.HPAuth.resetPassword(email);
        if(msg) msg.textContent = res.error ? (res.error.message || 'Reset failed.') : 'Password reset email sent.';
      };
    }

    if(signupBtn){
      signupBtn.onclick = async function(){
        const name = (q('#signupName')?.value || '').trim();
        const email = (q('#signupEmail')?.value || '').trim();
        const password = (q('#signupPassword')?.value || '').trim();
        const msg = q('#authSignupMessage');
        if(msg) msg.textContent = 'Creating account...';
        if(!window.HPAuth){ if(msg) msg.textContent = 'Auth not ready.'; return; }
        const res = await window.HPAuth.signup(email, password, name);
        if(res.error){ if(msg) msg.textContent = res.error.message || 'Signup failed.'; return; }
        if(msg) msg.textContent = 'Account created. Redirecting to login...';
        setTimeout(() => { window.location.href = 'login.html'; }, 1200);
      };
    }
  }

  async function fillAccount(){
    if(!document.body.classList.contains('account-page')) return;
    if(!window.HPAuth) return;
    const user = await window.HPAuth.getUser();
    const profile = user && window.HPAuth.getProfile ? await window.HPAuth.getProfile() : null;
    if(!user) return;
    const set = (id,val) => { const el=q('#'+id); if(el) el.textContent = val || '—'; };
    set('accountName', profile?.full_name || user.user_metadata?.full_name || '—');
    set('accountEmail', user.email || '—');
    set('accountRole', profile?.role || 'user');
    set('accountId', user.id || '—');

    const m = q('#accountMessage');
    if(m) m.textContent = profile?.role === 'admin' ? 'Admin account detected.' : 'Signed in successfully.';
  }

  async function fillSellerProfile(){
    if(!document.body.classList.contains('account-page')) return;
    if(!window.HPAuth) return;
    const saveBtn = q('#saveSellerProfileBtn');
    const viewBtn = q('#viewPublicSellerProfileBtn');
    const msg = q('#sellerProfileMessage');
    const user = await window.HPAuth.getUser();
    const profile = user && window.HPAuth.getProfile ? await window.HPAuth.getProfile() : null;
    if(!user || !profile) return;

    const setv = (id, val) => { const el=q('#'+id); if(el) el.value = val || ''; };
    setv('profilePublicName', profile.public_name || profile.full_name || '');
    setv('profilePhone', profile.phone || '');
    setv('profileDistrict', profile.district || '');
    setv('profileAvatarUrl', profile.avatar_url || '');
    setv('profileBio', profile.bio || '');
    const cb = q('#profileIsPublicSeller'); if(cb) cb.checked = !!profile.is_public_seller;
    if(viewBtn) viewBtn.href = 'seller-profile.html?id=' + encodeURIComponent(user.id);

    if(saveBtn){
      saveBtn.onclick = async function(){
        if(!window.HPSupabase?.client){ if(msg) msg.textContent = 'Supabase not ready.'; return; }
        if(msg) msg.textContent = 'Saving seller profile...';
        const payload = {
          public_name: q('#profilePublicName')?.value || '',
          phone: q('#profilePhone')?.value || '',
          district: q('#profileDistrict')?.value || '',
          avatar_url: q('#profileAvatarUrl')?.value || '',
          bio: q('#profileBio')?.value || '',
          is_public_seller: !!q('#profileIsPublicSeller')?.checked
        };
        const { error } = await window.HPSupabase.client.from('profiles').update(payload).eq('id', user.id);
        if(msg) msg.textContent = error ? (error.message || 'Could not save.') : 'Seller profile saved.';
      };
    }
  }

  async function boot(){
    bindAuth();
    setCounters();
    initCarousels();
    await updateHeader();
    await fillAccount();
    await fillSellerProfile();
  }

  window.HPV80 = { toggleMenu, boot };

  document.addEventListener('DOMContentLoaded', function(){ setTimeout(boot, 100); });
  document.addEventListener('hp-auth-ready', function(){ setTimeout(boot, 100); });
})();
