
(function(){
  function q(s,root=document){ return root.querySelector(s); }
  function qa(s,root=document){ return Array.from(root.querySelectorAll(s)); }

  async function waitForAuthReady(){
    if (window.HPAuthReady) return true;
    let tries = 0;
    while (!window.HPAuthReady && tries < 30){
      await new Promise(r => setTimeout(r, 200));
      tries++;
    }
    return !!window.HPAuthReady;
  }

  async function getUserProfile(){
    const ready = await waitForAuthReady();
    if(!ready || !window.HPAuth) return { user:null, profile:null };
    try{
      const user = await window.HPAuth.getUser();
      const profile = user && window.HPAuth.getProfile ? await window.HPAuth.getProfile() : null;
      return { user:null || user, profile:null || profile };
    }catch(e){
      console.error(e);
      return { user:null, profile:null };
    }
  }

  async function doLogout(e){
    if(e) e.preventDefault();
    try{
      if(window.HPAuth && window.HPAuth.logout) await window.HPAuth.logout();
    }catch(err){
      console.error(err);
    }
    window.location.href = 'index.html';
  }

  function toggleMenu(){
    const drawer = q('#hpV80Drawer') || q('#hpDrawer') || q('#hpMobileDrawer');
    if(drawer) drawer.classList.toggle('open');
  }

  function fixMenu(user){
    const drawer = q('#hpDrawerLinks');
    if(!drawer) return;

    qa('[data-auth-state="guest"]', drawer).forEach(el => el.style.display = user ? 'none' : '');
    qa('[data-auth-state="user"]', drawer).forEach(el => el.style.display = user ? '' : 'none');

    qa('a', drawer).forEach(a => {
      const label = (a.textContent || '').trim().toLowerCase();
      if(user && (label === 'login' || label === 'sign up')) a.style.display = 'none';
      if(!user && label === 'logout') a.style.display = 'none';
    });

    const logoutLink = q('#hpDrawerLogoutLink', drawer);
    if(logoutLink){
      logoutLink.onclick = doLogout;
      logoutLink.style.display = user ? '' : 'none';
    }
  }

  async function syncAuthUI() {
    const info = await getUserProfile();
    const user = info.user;
    const profile = info.profile;
    const firstName = (profile?.full_name || user?.user_metadata?.full_name || user?.email || "User").split(" ")[0];

    const slot = q('#hpHeaderAuthSlot');
    if (slot) {
      if (user) {
        slot.innerHTML = `
          <span class="hp-v82-chip">${firstName}</span>
          <a class="hp-v82-btn" href="account.html">Account</a>
          <button class="hp-v82-logout" id="logoutBtn" type="button">Logout</button>
        `;
        const btn = q('#logoutBtn');
        if (btn) btn.onclick = doLogout;
      } else {
        slot.innerHTML = `
          <a class="hp-v82-btn" href="login.html">Login</a>
          <a class="hp-v82-btn" href="signup.html">Sign Up</a>
        `;
      }
    }

    const homeActions = q('#hpHomeAuthActions');
    if(homeActions){
      if(user){
        homeActions.innerHTML = `
          <a class="ghost-btn" href="account.html">My Account</a>
          <button class="primary-btn" id="hpHomeLogoutBtn" type="button">Logout</button>
        `;
        const b = q('#hpHomeLogoutBtn');
        if(b) b.onclick = doLogout;
      } else {
        homeActions.innerHTML = `
          <a class="ghost-btn" href="login.html">Login</a>
          <a class="primary-btn" href="signup.html">Sign Up</a>
        `;
      }
    }

    fixMenu(user);
  }

  window.HPV80 = window.HPV80 || {};
  window.HPV80.toggleMenu = toggleMenu;
  window.HPV82 = { syncAuthUI, toggleMenu };

  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(syncAuthUI, 120);
  });
  document.addEventListener('hp-auth-ready', function(){
    setTimeout(syncAuthUI, 120);
  });
})();
