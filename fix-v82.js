
(function(){
  function q(s,root=document){ return root.querySelector(s); }
  function qa(s,root=document){ return Array.from(root.querySelectorAll(s)); }

  async function waitForAuth(){
    let tries = 0;
    while (!window.HPAuthReady && tries < 40) {
      await new Promise(r => setTimeout(r, 150));
      tries++;
    }
    return !!window.HPAuthReady;
  }

  async function getState(){
    await waitForAuth();
    if(!window.HPAuth) return { user:null, profile:null };
    try{
      const user = await window.HPAuth.getUser();
      const profile = user && window.HPAuth.getProfile ? await window.HPAuth.getProfile() : null;
      return { user, profile };
    }catch(e){
      console.error(e);
      return { user:null, profile:null };
    }
  }

  async function logoutNow(e){
    if(e) e.preventDefault();
    try{
      if(window.HPAuth && window.HPAuth.logout) await window.HPAuth.logout();
    }catch(err){
      console.error(err);
    }
    window.location.href = 'index.html';
  }

  function ensureDrawerState(user){
    const drawer = q('#hpDrawerLinks');
    if(!drawer) return;

    qa('a', drawer).forEach(a => {
      const label = (a.textContent || '').trim().toLowerCase();
      if(label === 'login' || label === 'sign up'){
        a.style.display = user ? 'none' : '';
      }
      if(label === 'logout'){
        a.style.display = user ? '' : 'none';
        a.onclick = logoutNow;
      }
    });

    qa('[data-auth-state="guest"]', drawer).forEach(el => el.style.display = user ? 'none' : '');
    qa('[data-auth-state="user"]', drawer).forEach(el => {
      el.style.display = user ? '' : 'none';
      if((el.textContent || '').trim().toLowerCase() === 'logout') el.onclick = logoutNow;
    });
  }

  function renderHomeActions(user){
    const box = q('#hpHomeAuthActions');
    if(!box) return;
    if(user){
      box.innerHTML = `
        <a class="ghost-btn" href="account.html">My Account</a>
        <button class="primary-btn" id="hpHomeLogoutBtn" type="button">Logout</button>
      `;
      const b = q('#hpHomeLogoutBtn');
      if(b) b.onclick = logoutNow;
    } else {
      box.innerHTML = `
        <a class="ghost-btn" href="login.html">Login</a>
        <a class="primary-btn" href="signup.html">Sign Up</a>
      `;
    }
  }

  function renderHeader(user, profile){
    const slot = q('#hpHeaderAuthSlot');
    if(!slot) return;
    const firstName = (profile?.full_name || user?.user_metadata?.full_name || user?.email || 'User').split(' ')[0];

    if(user){
      slot.innerHTML = `
        <span class="hp-v82-chip">${firstName}</span>
        <a class="hp-v82-btn" href="account.html">Account</a>
        <button class="hp-v82-logout" id="hpHeaderLogoutBtn" type="button">Logout</button>
      `;
      const btn = q('#hpHeaderLogoutBtn');
      if(btn) btn.onclick = logoutNow;
    } else {
      slot.innerHTML = `
        <a class="hp-v82-btn" href="login.html">Login</a>
        <a class="hp-v82-btn" href="signup.html">Sign Up</a>
      `;
    }
  }

  async function syncAuthUI(){
    const { user, profile } = await getState();
    renderHeader(user, profile);
    renderHomeActions(user);
    ensureDrawerState(user);
  }

  function toggleMenu(){
    const drawer = q('#hpV80Drawer') || q('#hpDrawer') || q('#hpMobileDrawer');
    if(drawer) drawer.classList.toggle('open');
  }

  window.HPV80 = window.HPV80 || {};
  window.HPV80.toggleMenu = toggleMenu;
  window.HPV82 = { syncAuthUI, toggleMenu };

  document.addEventListener('DOMContentLoaded', function(){ setTimeout(syncAuthUI, 120); });
  document.addEventListener('hp-auth-ready', function(){ setTimeout(syncAuthUI, 120); });
})();
