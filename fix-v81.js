
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

  async function requestPlan(planCode, planName, billing, amount){
    const { user, profile } = await getUserProfile();
    if(!user || !window.HPBackend){ alert('Please login first.'); return; }
    await window.HPBackend.insert('subscriptionOrders', {
      user_id: user.id,
      email: user.email || '',
      plan_code: planCode,
      plan_name: planName,
      billing_cycle: billing,
      amount: amount,
      status: 'new',
      notes: 'Plan request submitted from subscriptions page'
    });
    alert('Plan request submitted. You can collect payment manually and approve it from admin dashboard.');
  }

  async function submitVerificationRequest(){
    const { user, profile } = await getUserProfile();
    const msg = q('#verificationRequestMessage');
    if(!user || !window.HPBackend){
      if(msg) msg.textContent = 'Please login first.';
      return;
    }
    if(msg) msg.textContent = 'Submitting verification request...';
    await window.HPBackend.insert('verificationRequests', {
      user_id: user.id,
      email: user.email || '',
      full_name: q('#verifyFullName')?.value || profile?.full_name || '',
      phone: q('#verifyPhone')?.value || profile?.phone || '',
      business_name: q('#verifyBusinessName')?.value || '',
      notes: q('#verifyNotes')?.value || '',
      status: 'new'
    });
    if(msg) msg.textContent = 'Verification request submitted.';
  }

  async function enhanceAccountSettings(){
    if(!document.body.classList.contains('account-page')) return;
    const { user, profile } = await getUserProfile();
    if(!user || !profile) return;

    const setv = (id, val) => { const el=q('#'+id); if(el) el.value = val || ''; };
    setv('profileGender', profile.gender || '');
    setv('profileCity', profile.city || '');
    setv('profileState', profile.state || '');
    setv('profileCountry', profile.country || '');
    setv('profilePhotoUrl', profile.profile_photo_url || '');
    const photo = q('#profilePhotoPreview');
    const photoUrl = profile.profile_photo_url || profile.avatar_url || '';
    if(photo){
      if(photoUrl){
        photo.innerHTML = '<img src="'+photoUrl+'" alt="Profile photo">';
      } else {
        photo.textContent = ((profile.full_name || 'U').trim().charAt(0) || 'U').toUpperCase();
      }
    }

    const badge = profile.account_badge || 'Member';
    const plan = profile.subscription_plan || 'free';
    const status = profile.subscription_status || 'inactive';
    const points = String(profile.reward_points || 0);
    const verified = profile.verified_seller ? 'Verified Seller' : 'Not Verified';

    const setText = (id, val) => { const el=q('#'+id); if(el) el.textContent = val; };
    setText('accountBadgePill', badge);
    setText('accountPlanPill', plan.charAt(0).toUpperCase()+plan.slice(1)+' Plan');
    setText('accountVerifiedPill', verified);
    setText('accountPlanStatus', plan);
    setText('accountSubscriptionStatus', status);
    setText('accountPoints', points);
    setText('accountVerificationStatus', profile.verified_seller ? 'Yes' : 'No');

    const saveBtn = q('#saveSellerProfileBtn');
    const msg = q('#sellerProfileMessage');
    if(saveBtn){
      saveBtn.onclick = async function(){
        if(!window.HPSupabase?.client){ if(msg) msg.textContent='Supabase not ready.'; return; }
        if(msg) msg.textContent = 'Saving profile settings...';
        const payload = {
          public_name: q('#profilePublicName')?.value || '',
          phone: q('#profilePhone')?.value || '',
          district: q('#profileDistrict')?.value || '',
          avatar_url: q('#profileAvatarUrl')?.value || '',
          bio: q('#profileBio')?.value || '',
          is_public_seller: !!q('#profileIsPublicSeller')?.checked,
          gender: q('#profileGender')?.value || '',
          city: q('#profileCity')?.value || '',
          state: q('#profileState')?.value || '',
          country: q('#profileCountry')?.value || '',
          profile_photo_url: q('#profilePhotoUrl')?.value || ''
        };
        const { error } = await window.HPSupabase.client.from('profiles').update(payload).eq('id', user.id);
        if(error){
          if(msg) msg.textContent = error.message || 'Could not save.';
          return;
        }
        if(msg) msg.textContent = 'Profile settings saved.';
        if(photo && payload.profile_photo_url){
          photo.innerHTML = '<img src="'+payload.profile_photo_url+'" alt="Profile photo">';
        }
      };
    }
  }

  async function renderAdminMonetization(){
    const subGrid = q('#adminSubscriptionGrid');
    const verGrid = q('#adminVerificationGrid');
    if((!subGrid && !verGrid) || !window.HPBackend) return;

    const subs = await window.HPBackend.list('subscriptionOrders').catch(() => []);
    const vers = await window.HPBackend.list('verificationRequests').catch(() => []);

    if(subGrid){
      subGrid.innerHTML = subs.length ? subs.map(item => `
        <article class="card admin-lead-card">
          <h4>${item.plan_name || 'Plan Request'}</h4>
          <div class="admin-lead-meta">
            ${item.email ? `<span>${item.email}</span>` : ''}
            ${item.amount ? `<span>₹${item.amount}</span>` : ''}
            ${item.status ? `<span>${item.status}</span>` : ''}
          </div>
          <p>${item.billing_cycle || 'monthly'} subscription request</p>
          <div class="admin-lead-actions">
            <button class="primary-btn" type="button" onclick="window.HPV81 && window.HPV81.approvePlan('${item.id}','${item.user_id}','${item.plan_code || 'pro'}')">Approve</button>
            <button class="ghost-btn" type="button" onclick="window.HPV81 && window.HPV81.rejectSubscription('${item.id}')">Reject</button>
          </div>
        </article>
      `).join('') : '<div class="card admin-empty">No subscription requests yet.</div>';
    }

    if(verGrid){
      verGrid.innerHTML = vers.length ? vers.map(item => `
        <article class="card admin-lead-card">
          <h4>${item.full_name || 'Verification Request'}</h4>
          <div class="admin-lead-meta">
            ${item.email ? `<span>${item.email}</span>` : ''}
            ${item.phone ? `<span>${item.phone}</span>` : ''}
            ${item.status ? `<span>${item.status}</span>` : ''}
          </div>
          <p>${item.business_name || 'No business name'} ${item.notes ? '• ' + item.notes : ''}</p>
          <div class="admin-lead-actions">
            <button class="primary-btn" type="button" onclick="window.HPV81 && window.HPV81.approveVerification('${item.id}','${item.user_id}')">Approve</button>
            <button class="ghost-btn" type="button" onclick="window.HPV81 && window.HPV81.rejectVerification('${item.id}')">Reject</button>
          </div>
        </article>
      `).join('') : '<div class="card admin-empty">No verification requests yet.</div>';
    }
  }

  async function approvePlan(id, userId, planCode){
    if(!window.HPBackend || !window.HPSupabase?.client) return;
    const profilePayload = {
      subscription_plan: planCode || 'pro',
      subscription_status: 'active',
      account_badge: planCode === 'elite' ? 'Elite Dealer' : (planCode === 'pro' ? 'Pro Seller' : 'Member'),
      reward_points: planCode === 'elite' ? 500 : 150
    };
    await window.HPSupabase.client.from('profiles').update(profilePayload).eq('id', userId);
    await window.HPBackend.update('subscriptionOrders', id, { status: 'approved' });
    renderAdminMonetization();
  }

  async function rejectSubscription(id){
    if(!window.HPBackend) return;
    await window.HPBackend.update('subscriptionOrders', id, { status: 'rejected' });
    renderAdminMonetization();
  }

  async function approveVerification(id, userId){
    if(!window.HPBackend || !window.HPSupabase?.client) return;
    await window.HPSupabase.client.from('profiles').update({
      verified_seller: true,
      account_badge: 'Verified Seller'
    }).eq('id', userId);
    await window.HPBackend.update('verificationRequests', id, { status: 'approved' });
    renderAdminMonetization();
  }

  async function rejectVerification(id){
    if(!window.HPBackend) return;
    await window.HPBackend.update('verificationRequests', id, { status: 'rejected' });
    renderAdminMonetization();
  }

  function addSubscriptionLinkToHome(){
    document.querySelectorAll('.quick-grid a,.quick-access a').forEach(a => {});
  }

  function boot(){
    const verifyBtn = q('#submitVerificationRequestBtn');
    if(verifyBtn) verifyBtn.onclick = submitVerificationRequest;
    enhanceAccountSettings();
    renderAdminMonetization();
  }

  window.HPV81 = {
    requestPlan,
    submitVerificationRequest,
    approvePlan,
    rejectSubscription,
    approveVerification,
    rejectVerification
  };

  document.addEventListener('DOMContentLoaded', boot);
  document.addEventListener('hp-auth-ready', boot);
})();
