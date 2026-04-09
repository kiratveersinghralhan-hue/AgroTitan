
(function(){
  function q(s,root=document){ return root.querySelector(s); }
  function qa(s,root=document){ return Array.from(root.querySelectorAll(s)); }

  async function getUserProfile(){
    try{
      if(!window.HPAuth) return { user:null, profile:null };
      const user = await window.HPAuth.getUser();
      const profile = user && window.HPAuth.getProfile ? await window.HPAuth.getProfile() : null;
      return { user, profile };
    }catch(e){
      return { user:null, profile:null };
    }
  }

  function wireLogout(el){
    if(!el) return;
    el.onclick = async function(e){
      e.preventDefault();
      if(window.HPAuth) await window.HPAuth.logout();
      window.location.href = 'index.html';
    };
  }

  async function syncAuthUI(){
    const { user, profile } = await getUserProfile();
    const firstName = (profile?.full_name || user?.user_metadata?.full_name || user?.email || 'User').split(' ')[0];

    // header
    const slot = q('#hpHeaderAuthSlot');
    if(slot){
      if(user){
        slot.innerHTML = `
          <span class="hp-v82-chip">${firstName}</span>
          <a class="hp-v82-btn" href="account.html">Account</a>
          <button class="hp-v82-logout" id="hpHeaderLogoutBtn" type="button">Logout</button>
        `;
        wireLogout(q('#hpHeaderLogoutBtn'));
      } else {
        slot.innerHTML = `
          <a class="hp-v82-btn" href="login.html">Login</a>
          <a class="hp-v82-btn" href="signup.html">Sign Up</a>
        `;
      }
    }

    // drawer hide/show
    qa('[data-auth-state="guest"]').forEach(el => el.style.display = user ? 'none' : '');
    qa('[data-auth-state="user"]').forEach(el => {
      el.style.display = user ? '' : 'none';
      if(el.id === 'hpDrawerLogoutLink') wireLogout(el);
    });

    // remove duplicate guest auth links in drawer when logged in
    const drawer = q('#hpDrawerLinks');
    if(drawer){
      qa('a', drawer).forEach(a => {
        const label = (a.textContent || '').trim().toLowerCase();
        if(user && (label === 'login' || label === 'sign up')) a.style.display = 'none';
        if(!user && label === 'logout') a.style.display = 'none';
      });
    }

    // homepage quick auth buttons
    const homeActions = q('#hpHomeAuthActions');
    if(homeActions){
      if(user){
        homeActions.innerHTML = `
          <a class="ghost-btn" href="account.html">My Account</a>
          <button class="primary-btn" id="hpHomeLogoutBtn" type="button">Logout</button>
        `;
        wireLogout(q('#hpHomeLogoutBtn'));
      } else {
        homeActions.innerHTML = `
          <a class="ghost-btn" href="login.html">Login</a>
          <a class="primary-btn" href="signup.html">Sign Up</a>
        `;
      }
    }
  }

  function toggleMenu(){
    const drawer = q('#hpV80Drawer');
    if(drawer) drawer.classList.toggle('open');
  }

  window.HPV80 = window.HPV80 || {};
  window.HPV80.toggleMenu = toggleMenu;
  window.HPV82 = { syncAuthUI };

  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(syncAuthUI, 100);
  });
  document.addEventListener('hp-auth-ready', function(){
    setTimeout(syncAuthUI, 100);
  });
})();
