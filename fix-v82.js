
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

  async function renderAuthHeader(){
    const slot = q('#hpHeaderAuthSlot');
    if(!slot) return;

    const { user, profile } = await getUserProfile();
    const firstName = (profile?.full_name || user?.user_metadata?.full_name || user?.email || 'User').split(' ')[0];

    if(user){
      slot.innerHTML = `
        <a class="hp-v82-chip" href="account.html">${firstName}</a>
        <a class="hp-v82-btn" href="account.html">Account</a>
        <button class="hp-v82-logout" id="hpHeaderLogoutBtn" type="button">Logout</button>
      `;
      const logoutBtn = q('#hpHeaderLogoutBtn');
      if(logoutBtn){
        logoutBtn.onclick = async function(){
          await window.HPAuth.logout();
          window.location.href = 'index.html';
        };
      }
    } else {
      slot.innerHTML = `
        <a class="hp-v82-btn" href="login.html">Login</a>
        <a class="hp-v82-btn" href="signup.html">Sign Up</a>
      `;
    }

    qa('[data-auth-state="guest"]').forEach(el => {
      el.style.display = user ? 'none' : '';
    });
    qa('[data-auth-state="user"]').forEach(el => {
      el.style.display = user ? '' : 'none';
    });

    const drawerLogout = q('#hpDrawerLogoutLink');
    if(drawerLogout){
      drawerLogout.onclick = async function(e){
        e.preventDefault();
        if(window.HPAuth){
          await window.HPAuth.logout();
        }
        window.location.href = 'index.html';
      };
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(renderAuthHeader, 80);
  });
  document.addEventListener('hp-auth-ready', function(){
    setTimeout(renderAuthHeader, 80);
  });

  window.HPV82 = { renderAuthHeader };
})();
