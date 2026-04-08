
const SHOP = {
  name: "Harvester Parts",
  owner: "Jatinder Singh",
  tagline: "Powering Your Harvest with Trusted Parts",
  phonePrimary: "9216107700",
  phoneSecondary: "9217000077",
  whatsapp: "919216107700",
  email: "",
  address: "Patiala Road opposite reliance pump.",
  maps: "https://maps.app.goo.gl/j4wzYGk5VfW1pPvX8?g_st=ic"
};

const state = {
  cart: JSON.parse(localStorage.getItem("agrotitan_cart") || "[]"),
  wishlist: JSON.parse(localStorage.getItem("agrotitan_wishlist") || "[]")
};

function saveState(){
  localStorage.setItem("agrotitan_cart", JSON.stringify(state.cart));
  localStorage.setItem("agrotitan_wishlist", JSON.stringify(state.wishlist));
  updateBadges();
  updateHomepageStats();
}


function currentLang(){
  return localStorage.getItem("agrotitan_lang") || "en";
}
function tProduct(p, field){
  const lang = currentLang();
  if(lang === "hi" && p[field + "_hi"]) return p[field + "_hi"];
  if(lang === "pa" && p[field + "_pa"]) return p[field + "_pa"];
  return p[field];
}

function formatPrice(n){
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

function getProduct(id){
  return PRODUCTS.find(p => p.id === id);
}

function addToCart(id, qty=1){
  const item = state.cart.find(i => i.id === id);
  if(item){ item.qty += qty; }
  else state.cart.push({id, qty});
  saveState();
  toast("Added to cart");
}

function toggleWishlist(id){
  if(state.wishlist.includes(id)){
    state.wishlist = state.wishlist.filter(x => x !== id);
    toast("Removed from wishlist");
  }else{
    state.wishlist.push(id);
    toast("Saved to wishlist");
  }
  saveState();
}

function removeFromCart(id){
  state.cart = state.cart.filter(i => i.id !== id);
  saveState();
  renderCartPage?.();
}

function updateQty(id, delta){
  const item = state.cart.find(i => i.id === id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){
    removeFromCart(id);
    return;
  }
  saveState();
  renderCartPage?.();
}

function updateBadges(){
  const cartCount = state.cart.reduce((a,b)=>a+b.qty,0);
  const wishCount = state.wishlist.length;
  document.querySelectorAll("[data-cart-count]").forEach(el => el.textContent = cartCount);
  document.querySelectorAll("[data-wishlist-count]").forEach(el => el.textContent = wishCount);
}

function toast(msg){
  let el = document.getElementById("toast");
  if(!el){
    el = document.createElement("div");
    el.id = "toast";
    el.style.cssText = "position:fixed;left:50%;bottom:18px;transform:translateX(-50%);background:#111b2e;color:#fff;padding:14px 18px;border-radius:14px;border:1px solid rgba(255,255,255,.08);z-index:99;box-shadow:0 18px 35px rgba(0,0,0,.28)";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = "1";
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>{ el.style.opacity = "0"; }, 1700);
}

function fillSharedContent(){
  document.querySelectorAll("[data-shop-name]").forEach(el => el.textContent = SHOP.name);
  document.querySelectorAll("[data-tagline]").forEach(el => el.textContent = SHOP.tagline);
  document.querySelectorAll("[data-owner]").forEach(el => el.textContent = SHOP.owner);
  document.querySelectorAll("[data-phone-primary]").forEach(el => el.textContent = SHOP.phonePrimary);
  document.querySelectorAll("[data-phone-secondary]").forEach(el => el.textContent = SHOP.phoneSecondary);
  document.querySelectorAll("[data-address]").forEach(el => el.textContent = SHOP.address);
  document.querySelectorAll("[data-maps]").forEach(el => el.href = SHOP.maps);
  document.querySelectorAll("[data-call-link-primary]").forEach(el => el.href = "tel:" + SHOP.phonePrimary);
  document.querySelectorAll("[data-call-link-secondary]").forEach(el => el.href = "tel:" + SHOP.phoneSecondary);
  document.querySelectorAll("[data-whatsapp-link]").forEach(el => {
    el.href = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent("Hello Harvester Parts, I need combine spare parts information.")}`;
  });
}

function setActiveMenu(){
  const file = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".menu a").forEach(a => {
    const href = a.getAttribute("href");
    if(href === file) a.classList.add("active");
  });
}



function animateCounterElement(el, startVal, target){
  const start = performance.now();
  const duration = 1000;
  function step(now){
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(startVal + (target - startVal) * progress);
    el.textContent = value.toLocaleString("en-IN");
    if(progress < 1) requestAnimationFrame(step);
    else {
      el.dataset.done = "1";
      el.setAttribute("data-prev", String(target));
    }
  }
  requestAnimationFrame(step);
}

function animateCounters(){
  const items = document.querySelectorAll("[data-count-key]");
  if(!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        el.dataset.visible = "true";
        const target = Number(el.getAttribute("data-count-to") || "0");
        const prev = Number(el.getAttribute("data-prev") || "0");
        if(el.dataset.done !== "1"){
          animateCounterElement(el, prev, target);
        }
        observer.unobserve(el);
      }
    });
  }, {threshold:0.35});
  items.forEach(el => observer.observe(el));
}


function uniqueValues(key){
  return [...new Set(PRODUCTS.map(p => p[key]))].sort();
}

function populateSelectors(){
  document.querySelectorAll("[data-filter='brand']").forEach(sel => fillSelect(sel, ["All Brands", ...uniqueValues("brand")]));
  document.querySelectorAll("[data-filter='machineType']").forEach(sel => fillSelect(sel, ["All Machine Types", ...uniqueValues("machineType")]));
  document.querySelectorAll("[data-filter='model']").forEach(sel => fillSelect(sel, ["All Models", ...uniqueValues("model")]));
  document.querySelectorAll("[data-filter='category']").forEach(sel => fillSelect(sel, ["All Categories", ...uniqueValues("category")]));
}

function fillSelect(select, options){
  if(!select) return;
  const current = select.dataset.current || "";
  select.innerHTML = options.map(v => `<option value="${v}">${v}</option>`).join("");
  if(current) select.value = current;
}

function productCard(p){
  const wished = state.wishlist.includes(p.id);
  return `
    <article class="product-card">
      <div class="thumb"><img src="${p.image}" alt="${tProduct(p, "name")}" loading="lazy" referrerpolicy="no-referrer"></div>
      <div class="product-body">
        <div class="product-topline">
          <span class="ribbon">${p.brand}</span>
          <span style="color:#ffd88f;font-weight:800">★ ${p.rating}</span>
        </div>
        <h4>${tProduct(p, "name")}</h4>
        <div class="meta">
          <span>${p.model}</span>
          <span>${p.machineType}</span>
          <span>${p.partNo}</span>
        </div>
        <div class="price-row">
          <div class="price">${formatPrice(p.price)}</div>
          <div class="old-price">${formatPrice(p.oldPrice)}</div>
        </div>
        <div style="color:#a8b4cf;line-height:1.5">${tProduct(p, "description")}</div>
        <div class="actions">
          <button class="small-btn primary" onclick="addToCart('${p.id}')">Add to Cart</button>
          <button class="small-btn secondary" onclick="location.href='product.html?id=${p.id}'">View Details</button>
          <button class="small-btn secondary" onclick="toggleWishlist('${p.id}')">${wished ? 'Saved' : 'Wishlist'}</button>
        </div>
      </div>
    </article>
  `;
}

function renderFeatured(containerId, count=6){
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = PRODUCTS.slice(0, count).map(productCard).join("");
}

function renderProductsPage(){
  const grid = document.getElementById("productsGrid");
  if(!grid) return;
  const brand = document.getElementById("brandFilter")?.value || "All Brands";
  const machineType = document.getElementById("machineTypeFilter")?.value || "All Machine Types";
  const model = document.getElementById("modelFilter")?.value || "All Models";
  const category = document.getElementById("categoryFilter")?.value || "All Categories";
  const search = (document.getElementById("searchFilter")?.value || "").trim().toLowerCase();

  let list = PRODUCTS.filter(p =>
    (brand === "All Brands" || p.brand === brand) &&
    (machineType === "All Machine Types" || p.machineType === machineType) &&
    (model === "All Models" || p.model === model) &&
    (category === "All Categories" || p.category === category) &&
    (
      !search ||
      p.name.toLowerCase().includes(search) ||
      p.partNo.toLowerCase().includes(search) ||
      p.compatibility.join(" ").toLowerCase().includes(search)
    )
  );

  document.getElementById("resultsCount").textContent = `${list.length} parts found`;
  grid.innerHTML = list.length ? list.map(productCard).join("") : `<div class="card empty">No spare parts match your filters.</div>`;
}

function resetFilters(){
  ["brandFilter","machineTypeFilter","modelFilter","categoryFilter","searchFilter"].forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    if(el.tagName === "SELECT") el.selectedIndex = 0;
    else el.value = "";
  });
  renderProductsPage();
}

function machineSearchFromHome(){
  const brand = document.getElementById("homeBrand")?.value || "";
  const machineType = document.getElementById("homeMachineType")?.value || "";
  const model = document.getElementById("homeModel")?.value || "";
  const params = new URLSearchParams();
  if(brand && brand !== "All Brands") params.set("brand", brand);
  if(machineType && machineType !== "All Machine Types") params.set("machineType", machineType);
  if(model && model !== "All Models") params.set("model", model);
  location.href = "products.html?" + params.toString();
}

function applyQueryFilters(){
  const q = new URLSearchParams(location.search);
  const map = {
    brand: "brandFilter",
    machineType: "machineTypeFilter",
    model: "modelFilter",
    category: "categoryFilter"
  };
  Object.entries(map).forEach(([param,id])=>{
    const value = q.get(param);
    const el = document.getElementById(id);
    if(value && el) el.value = value;
  });
}

function renderProductDetail(){
  const wrap = document.getElementById("productDetail");
  if(!wrap) return;
  const id = new URLSearchParams(location.search).get("id");
  const p = getProduct(id) || PRODUCTS[0];
  wrap.innerHTML = `
      <button class="lang-top-btn" id="languageButton" type="button" aria-haspopup="dialog" aria-expanded="false">🌐 Language</button>
    `;
  renderRelated(p.id);
}

function renderRelated(currentId){
  const el = document.getElementById("relatedProducts");
  if(!el) return;
  el.innerHTML = PRODUCTS.filter(p => p.id !== currentId).slice(0,3).map(productCard).join("");
}

function cartDetailedItems(){
  return state.cart.map(item => {
    const p = getProduct(item.id);
    return p ? {...p, qty: item.qty, total: p.price * item.qty} : null;
  }).filter(Boolean);
}

function renderCartPage(){
  const list = document.getElementById("cartItems");
  const summary = document.getElementById("cartSummary");
  if(!list || !summary) return;
  const items = cartDetailedItems();
  if(!items.length){
    list.innerHTML = `<div class="card empty">Your cart is empty. <br><br><a class="primary-btn" href="products.html">Browse Spare Parts</a></div>`;
    summary.innerHTML = `<div class="summary-card"><h3>Order Summary</h3><p class="helper">Add products to continue checkout.</p></div>`;
    return;
  }
  list.innerHTML = items.map(p => `
    <div class="cart-item">
      <img src="${p.image}" alt="${tProduct(p, "name")}" referrerpolicy="no-referrer">
      <div>
        <div class="ribbon">${p.brand}</div>
        <h3 style="margin:10px 0 6px">${tProduct(p, "name")}</h3>
        <div style="color:#a8b4cf">${p.model} • ${p.machineType} • ${p.partNo}</div>
        <div class="qty-row">
          <button onclick="updateQty('${p.id}',-1)">−</button>
          <strong>${p.qty}</strong>
          <button onclick="updateQty('${p.id}',1)">+</button>
          <button class="small-btn secondary" style="max-width:140px" onclick="removeFromCart('${p.id}')">Remove</button>
        </div>
      </div>
      <div>
        <div class="price">${formatPrice(p.total)}</div>
        <div class="old-price">${formatPrice(p.oldPrice * p.qty)}</div>
      </div>
    </div>
  `).join("");

  const subtotal = items.reduce((a,b)=>a+b.total,0);
  const shipping = subtotal > 4999 ? 0 : 199;
  const total = subtotal + shipping;

  summary.innerHTML = `
    <div class="summary-card">
      <h3>Order Summary</h3>
      <div class="list">
        <div class="list-item"><span>Subtotal</span><strong>${formatPrice(subtotal)}</strong></div>
        <div class="list-item"><span>Shipping</span><strong>${shipping === 0 ? 'Free' : formatPrice(shipping)}</strong></div>
        <div class="list-item"><span>Total</span><strong>${formatPrice(total)}</strong></div>
      </div>
      <a href="checkout.html" class="primary-btn" style="display:block;text-align:center;margin-top:16px">Proceed to Checkout</a>
      <p class="helper">Demo checkout for GitHub Pages. Real online payments can be added later.</p>
    </div>
  `;
}

function renderCheckoutPage(){
  const order = document.getElementById("checkoutSummary");
  if(!order) return;
  const items = cartDetailedItems();
  const subtotal = items.reduce((a,b)=>a+b.total,0);
  const shipping = items.length ? (subtotal > 4999 ? 0 : 199) : 0;
  const total = subtotal + shipping;
  order.innerHTML = `
    <div class="summary-card">
      <h3>Checkout Summary</h3>
      ${items.length ? items.map(p => `<div class="list-item"><span>${tProduct(p, "name")} × ${p.qty}</span><strong>${formatPrice(p.total)}</strong></div>`).join("") : `<p class="helper">No items in cart.</p>`}
      <div class="list-item"><span>Shipping</span><strong>${shipping === 0 ? 'Free' : formatPrice(shipping)}</strong></div>
      <div class="list-item"><span>Total Payable</span><strong>${formatPrice(total)}</strong></div>
      <div class="notice">Demo payment modes: Cash on Delivery, UPI on WhatsApp, Bank Transfer confirmation.</div>
    </div>
  `;

  const form = document.getElementById("checkoutForm");
  if(form){
    form.addEventListener("submit", e => {
      e.preventDefault();
      if(!items.length){
        toast("Your cart is empty");
        return;
      }
      localStorage.setItem("agrotitan_last_order", JSON.stringify({
        when: new Date().toLocaleString(),
        items,
        total
      }));
      state.cart = [];
      saveState();
      form.reset();
      toast("Order placed successfully");
      setTimeout(()=> location.href = "thankyou.html", 900);
    });
  }
}

function renderThankyouPage(){
  const el = document.getElementById("lastOrder");
  if(!el) return;
  const order = JSON.parse(localStorage.getItem("agrotitan_last_order") || "null");
  if(!order){
    el.innerHTML = `<p class="helper">No recent order found.</p>`;
    return;
  }
  el.innerHTML = `
    <div class="summary-card">
      <h3>Recent Order</h3>
      <div class="helper">Placed on ${order.when}</div>
      ${order.items.map(p => `<div class="list-item"><span>${tProduct(p, "name")} × ${p.qty}</span><strong>${formatPrice(p.total)}</strong></div>`).join("")}
      <div class="list-item"><span>Total</span><strong>${formatPrice(order.total)}</strong></div>
    </div>
  `;
}



const PAGE_TRANSLATIONS = {
  en: {
    common: {
      topbar: "Premium combine harvester, cutter bar, and straw reaper spare parts support • Call ",
      home: "Home",
      products: "Products",
      about: "About",
      contact: "Contact",
      cart: "Cart",
      selector: "Selector",
      cartBtn: "Cart",
      footerText: "Premium combine harvester spare parts website for Harvester Parts.",
      aiAssistant: "AI Assistant",
      language: "Language"
    },
    pages: {
      "index.html": {
        ".kicker": "Harvester Parts • Premium Farm Parts Store",
        ".hero-copy h2": "Premium spare parts for combine harvesters, cutter bars, and straw reapers.",
        ".hero-copy p": "Genuine-looking premium online catalog for farmers, mechanics, and dealers. Search by brand, machine type, and model. Fast support on WhatsApp for matching the right part.",
        ".hero-cta .primary-btn": "Shop Spare Parts",
        ".hero-cta .ghost-btn": "Ask on WhatsApp"
      },
      "products.html": {
        ".breadcrumb": "Home / Products",
        ".section-title h3": "Spare parts catalog",
        ".filters h3": "Filter parts clearly",
        ".filters label:nth-of-type(1)": "Brand Selector",
        ".filters label:nth-of-type(2)": "Model Selector",
        ".filters label:nth-of-type(3)": "Machine Type Selector",
        ".filters label:nth-of-type(4)": "Search Part Name",
        ".filters .primary-btn": "Clear Filters"
      },
      "cart.html": {
        ".breadcrumb": "Home / Cart",
        ".section-title h3": "Your cart",
        ".section-title p": "Review selected spare parts before checkout."
      },
      "checkout.html": {
        ".breadcrumb": "Home / Checkout",
        ".section-title h3": "Secure checkout",
        ".section-title p": "Premium demo checkout page for GitHub-compatible hosting."
      },
      "about.html": {
        ".breadcrumb": "Home / About",
        ".ribbon": "About Harvester Parts",
        ".about-card h2": "Built for farmers who need the right part fast."
      },
      "contact.html": {
        ".breadcrumb": "Home / Contact",
        ".ribbon": "Contact Details",
        ".contact-card h2": "Get in touch for part matching and pricing"
      }
    }
  },
  hi: {
    common: {
      topbar: "प्रीमियम कंबाइन हार्वेस्टर, कटर बार और स्ट्रॉ रीपर स्पेयर पार्ट्स सहायता • कॉल करें ",
      home: "होम",
      products: "प्रोडक्ट्स",
      about: "हमारे बारे में",
      contact: "संपर्क",
      cart: "कार्ट",
      selector: "सेलेक्टर",
      cartBtn: "कार्ट",
      footerText: "Harvester Parts के लिए प्रीमियम कंबाइन स्पेयर पार्ट्स वेबसाइट।",
      aiAssistant: "AI सहायक",
      language: "भाषा"
    },
    pages: {
      "index.html": {
        ".kicker": "Harvester Parts • प्रीमियम फार्म पार्ट्स स्टोर",
        ".hero-copy h2": "कंबाइन हार्वेस्टर, कटर बार और स्ट्रॉ रीपर के लिए प्रीमियम स्पेयर पार्ट्स।",
        ".hero-copy p": "किसानों, मिस्त्रियों और डीलरों के लिए प्रीमियम ऑनलाइन कैटलॉग। ब्रांड, मशीन टाइप और मॉडल से खोजें। सही पार्ट मिलाने के लिए व्हाट्सऐप पर तेज सहायता।",
        ".hero-cta .primary-btn": "स्पेयर पार्ट्स देखें",
        ".hero-cta .ghost-btn": "व्हाट्सऐप पर पूछें"
      },
      "products.html": {
        ".breadcrumb": "होम / प्रोडक्ट्स",
        ".section-title h3": "स्पेयर पार्ट्स कैटलॉग",
        ".filters h3": "पार्ट्स को साफ़ तरीके से फ़िल्टर करें",
        ".filters label:nth-of-type(1)": "ब्रांड सेलेक्टर",
        ".filters label:nth-of-type(2)": "मॉडल सेलेक्टर",
        ".filters label:nth-of-type(3)": "मशीन टाइप सेलेक्टर",
        ".filters label:nth-of-type(4)": "पार्ट नाम खोजें",
        ".filters .primary-btn": "फ़िल्टर साफ करें"
      },
      "cart.html": {
        ".breadcrumb": "होम / कार्ट",
        ".section-title h3": "आपकी कार्ट",
        ".section-title p": "चेकआउट से पहले चुने गए पार्ट्स देखें।"
      },
      "checkout.html": {
        ".breadcrumb": "होम / चेकआउट",
        ".section-title h3": "सुरक्षित चेकआउट",
        ".section-title p": "GitHub-compatible hosting के लिए प्रीमियम डेमो चेकआउट पेज।"
      },
      "about.html": {
        ".breadcrumb": "होम / हमारे बारे में",
        ".ribbon": "Harvester Parts के बारे में",
        ".about-card h2": "उन किसानों के लिए बनाया गया जिन्हें सही पार्ट जल्दी चाहिए।"
      },
      "contact.html": {
        ".breadcrumb": "होम / संपर्क",
        ".ribbon": "संपर्क विवरण",
        ".contact-card h2": "पार्ट मिलान और कीमत के लिए संपर्क करें"
      }
    }
  },
  pa: {
    common: {
      topbar: "ਪ੍ਰੀਮਿਅਮ ਕੰਬਾਈਨ ਹਾਰਵੇਸਟਰ, ਕਟਰ ਬਾਰ ਅਤੇ ਸਟ੍ਰਾ ਰੀਪਰ ਸਪੇਅਰ ਪਾਰਟਸ ਸਹਾਇਤਾ • ਕਾਲ ਕਰੋ ",
      home: "ਹੋਮ",
      products: "ਪ੍ਰੋਡਕਟਸ",
      about: "ਸਾਡੇ ਬਾਰੇ",
      contact: "ਸੰਪਰਕ",
      cart: "ਕਾਰਟ",
      selector: "ਸਿਲੈਕਟਰ",
      cartBtn: "ਕਾਰਟ",
      footerText: "Harvester Parts ਲਈ ਪ੍ਰੀਮਿਅਮ ਕੰਬਾਈਨ ਸਪੇਅਰ ਪਾਰਟਸ ਵੈੱਬਸਾਈਟ।",
      aiAssistant: "AI ਸਹਾਇਕ",
      language: "ਭਾਸ਼ਾ"
    },
    pages: {
      "index.html": {
        ".kicker": "Harvester Parts • ਪ੍ਰੀਮਿਅਮ ਫਾਰਮ ਪਾਰਟਸ ਸਟੋਰ",
        ".hero-copy h2": "ਕੰਬਾਈਨ ਹਾਰਵੇਸਟਰ, ਕਟਰ ਬਾਰ ਅਤੇ ਸਟ੍ਰਾ ਰੀਪਰ ਲਈ ਪ੍ਰੀਮਿਅਮ ਸਪੇਅਰ ਪਾਰਟਸ।",
        ".hero-copy p": "ਕਿਸਾਨਾਂ, ਮਕੈਨਿਕਾਂ ਅਤੇ ਡੀਲਰਾਂ ਲਈ ਪ੍ਰੀਮਿਅਮ ਆਨਲਾਈਨ ਕੈਟਾਲਾਗ। ਬ੍ਰਾਂਡ, ਮਸ਼ੀਨ ਕਿਸਮ ਅਤੇ ਮਾਡਲ ਨਾਲ ਖੋਜੋ। ਸਹੀ ਪਾਰਟ ਮਿਲਾਉਣ ਲਈ ਵਟਸਐਪ ਤੇ ਤੇਜ਼ ਸਹਾਇਤਾ।",
        ".hero-cta .primary-btn": "ਸਪੇਅਰ ਪਾਰਟਸ ਵੇਖੋ",
        ".hero-cta .ghost-btn": "ਵਟਸਐਪ ਤੇ ਪੁੱਛੋ"
      },
      "products.html": {
        ".breadcrumb": "ਹੋਮ / ਪ੍ਰੋਡਕਟਸ",
        ".section-title h3": "ਸਪੇਅਰ ਪਾਰਟਸ ਕੈਟਾਲਾਗ",
        ".filters h3": "ਪਾਰਟਸ ਨੂੰ ਸਪੱਸ਼ਟ ਤਰੀਕੇ ਨਾਲ ਫਿਲਟਰ ਕਰੋ",
        ".filters label:nth-of-type(1)": "ਬ੍ਰਾਂਡ ਸਿਲੈਕਟਰ",
        ".filters label:nth-of-type(2)": "ਮਾਡਲ ਸਿਲੈਕਟਰ",
        ".filters label:nth-of-type(3)": "ਮਸ਼ੀਨ ਕਿਸਮ ਸਿਲੈਕਟਰ",
        ".filters label:nth-of-type(4)": "ਪਾਰਟ ਨਾਮ ਖੋਜੋ",
        ".filters .primary-btn": "ਫਿਲਟਰ ਸਾਫ ਕਰੋ"
      },
      "cart.html": {
        ".breadcrumb": "ਹੋਮ / ਕਾਰਟ",
        ".section-title h3": "ਤੁਹਾਡੀ ਕਾਰਟ",
        ".section-title p": "ਚੈਕਆਉਟ ਤੋਂ ਪਹਿਲਾਂ ਚੁਣੇ ਪਾਰਟਸ ਵੇਖੋ।"
      },
      "checkout.html": {
        ".breadcrumb": "ਹੋਮ / ਚੈਕਆਉਟ",
        ".section-title h3": "ਸੁਰੱਖਿਅਤ ਚੈਕਆਉਟ",
        ".section-title p": "GitHub-compatible hosting ਲਈ ਪ੍ਰੀਮਿਅਮ ਡੈਮੋ ਚੈਕਆਉਟ ਪੇਜ।"
      },
      "about.html": {
        ".breadcrumb": "ਹੋਮ / ਸਾਡੇ ਬਾਰੇ",
        ".ribbon": "Harvester Parts ਬਾਰੇ",
        ".about-card h2": "ਉਨ੍ਹਾਂ ਕਿਸਾਨਾਂ ਲਈ ਬਣਾਇਆ ਗਿਆ ਜਿਨ੍ਹਾਂ ਨੂੰ ਸਹੀ ਪਾਰਟ ਜਲਦੀ ਚਾਹੀਦਾ ਹੈ।"
      },
      "contact.html": {
        ".breadcrumb": "ਹੋਮ / ਸੰਪਰਕ",
        ".ribbon": "ਸੰਪਰਕ ਵੇਰਵੇ",
        ".contact-card h2": "ਪਾਰਟ ਮਿਲਾਣ ਅਤੇ ਕੀਮਤ ਲਈ ਸੰਪਰਕ ਕਰੋ"
      }
    }
  }
};

function setTextIfFound(selector, value, html=false){
  const el = document.querySelector(selector);
  if(!el || value == null) return;
  if(html) el.innerHTML = value; else el.textContent = value;
}
function applyPageTranslations(lang){
  const t = PAGE_TRANSLATIONS[lang] || PAGE_TRANSLATIONS.en;
  const file = (location.pathname.split("/").pop() || "index.html");

  setTextIfFound(".topbar", `${t.common.topbar}${SHOP.phonePrimary}`);
  setTextIfFound('.menu a[href="index.html"]', t.common.home);
  setTextIfFound('.menu a[href="products.html"]', t.common.products);
  setTextIfFound('.menu a[href="about.html"]', t.common.about);
  setTextIfFound('.menu a[href="contact.html"]', t.common.contact);
  setTextIfFound('.menu a[href="cart.html"]', t.common.cart);
  const selectorBtn = document.querySelector(".nav-actions a[href='products.html']");
  if(selectorBtn) selectorBtn.textContent = t.common.selector;
  const cartBtn = document.querySelector(".nav-actions a[href='cart.html']");
  if(cartBtn) cartBtn.innerHTML = `${t.common.cartBtn} <span data-cart-count>${state.cart.reduce((a,b)=>a+b.qty,0)}</span>`;
  const aiLink = document.querySelector('.drawer-contact a[href="assistant.html"]');
  if(aiLink) aiLink.innerHTML = `🤖 ${t.common.aiAssistant}`;

  const pageMap = t.pages[file] || {};
  Object.entries(pageMap).forEach(([selector, value]) => setTextIfFound(selector, value));

  document.querySelectorAll("[data-lang-choice='en'] strong").forEach(el=>el.textContent="English");
  document.querySelectorAll("[data-lang-choice='hi'] strong").forEach(el=>el.textContent="हिंदी");
  document.querySelectorAll("[data-lang-choice='pa'] strong").forEach(el=>el.textContent="ਪੰਜਾਬੀ");
}


const I18N = {
  en: {
    langTitle: "Choose your language",
    langSubtitle: "Select your preferred language for the website.",
    langEnglish: "English",
    langHindi: "Hindi",
    langPunjabi: "Punjabi",
    langHelp: "Choose your language here. You can change it anytime later from the website header.",
    selBrand: "Brand Selector",
    selModel: "Model Selector",
    selType: "Machine Type Selector",
    statParts: "Parts Listed",
    featuredTitle: "Featured spare parts",
    viewAll: "View All Parts",
    selAsk: "Ask on WhatsApp",
    changeLanguage: "Language"
  },
  hi: {
    langTitle: "अपनी भाषा चुनें",
    langSubtitle: "वेबसाइट के लिए अपनी पसंदीदा भाषा चुनें।",
    langEnglish: "English",
    langHindi: "हिंदी",
    langPunjabi: "पंजाबी",
    langHelp: "यहाँ भाषा चुनें। बाद में वेबसाइट हेडर से भी भाषा बदल सकते हैं।",
    selBrand: "ब्रांड चयन",
    selModel: "मॉडल चयन",
    selType: "मशीन प्रकार चयन",
    statParts: "लिस्टेड पार्ट्स",
    featuredTitle: "फीचर्ड स्पेयर पार्ट्स",
    viewAll: "सभी पार्ट्स देखें",
    selAsk: "व्हाट्सऐप पर पूछें",
    changeLanguage: "भाषा"
  },
  pa: {
    langTitle: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
    langSubtitle: "ਵੈੱਬਸਾਈਟ ਲਈ ਆਪਣੀ ਪਸੰਦ ਦੀ ਭਾਸ਼ਾ ਚੁਣੋ।",
    langEnglish: "English",
    langHindi: "ਹਿੰਦੀ",
    langPunjabi: "ਪੰਜਾਬੀ",
    langHelp: "ਇੱਥੇ ਭਾਸ਼ਾ ਚੁਣੋ। ਬਾਅਦ ਵਿੱਚ ਵੈੱਬਸਾਈਟ ਹੇਡਰ ਤੋਂ ਵੀ ਭਾਸ਼ਾ ਬਦਲ ਸਕਦੇ ਹੋ।",
    selBrand: "ਬ੍ਰਾਂਡ ਚੋਣ",
    selModel: "ਮਾਡਲ ਚੋਣ",
    selType: "ਮਸ਼ੀਨ ਕਿਸਮ ਚੋਣ",
    statParts: "ਲਿਸਟ ਕੀਤੇ ਪਾਰਟਸ",
    featuredTitle: "ਫੀਚਰਡ ਸਪੇਅਰ ਪਾਰਟਸ",
    viewAll: "ਸਾਰੇ ਪਾਰਟਸ ਵੇਖੋ",
    selAsk: "ਵਟਸਐਪ ਤੇ ਪੁੱਛੋ",
    changeLanguage: "ਭਾਸ਼ਾ"
  }
};

function createLanguagePopup() {
  if (document.getElementById("languageModal")) return;
  const modal = document.createElement("div");
  modal.id = "languageModal";
  modal.className = "lang-modal";
  modal.innerHTML = `
    <div class="lang-card">
      <div class="lang-head">
        <h2 data-i18n="langTitle">Choose your language</h2>
        <p data-i18n="langSubtitle">Select your preferred language for the website.</p>
      </div>
      <div class="lang-body">
        <div class="lang-grid">
          <button class="lang-btn" data-lang-choice="en"><span class="flag">🇬🇧</span><span data-i18n="langEnglish">English</span></button>
          <button class="lang-btn" data-lang-choice="hi"><span class="flag">🇮🇳</span><span data-i18n="langHindi">Hindi</span></button>
          <button class="lang-btn" data-lang-choice="pa"><span class="flag">🇮🇳</span><span data-i18n="langPunjabi">Punjabi</span></button>
          <button class="lang-btn" data-lang-choice="world"><span class="flag">🌐</span><span>Other languages</span></button>
        </div>
        <div class="lang-helper" data-i18n="langHelp">You can change language anytime from the header Language button.</div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}
function applyLanguage(lang) {
  const dict = I18N[lang] || I18N.en;
  localStorage.setItem("agrotitan_lang", lang);
  document.documentElement.lang = lang === "pa" ? "pa" : lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  applyPageTranslations(lang);
  const btn = document.getElementById("languageButton");
  const flag = lang === "hi" ? "🇮🇳" : lang === "pa" ? "🇮🇳" : "🇬🇧";
  if (btn) btn.innerHTML = `${flag} ${dict.changeLanguage} ▾`;
}
function openLanguageModal() {
  const m = document.getElementById("languageModal");
  if (m) m.classList.add("show");
}
function closeLanguageModal() {
  const m = document.getElementById("languageModal");
  if (m) m.classList.remove("show");
}
function closeLanguageDropdown() {
  const dd = document.getElementById("languageDropdown");
  const btn = document.getElementById("languageButton");
  if (dd) dd.classList.remove("show");
  if (btn) btn.setAttribute("aria-expanded", "false");
}

function createWorldLanguagesModal(){
  let modal = document.getElementById("worldLanguagesModal");
  if(modal) return modal;
  const languages = [
    ["en","English","Built-in website language"],
    ["hi","Hindi","Built-in website language"],
    ["pa","Punjabi","Built-in website language"],
    ["ar","Arabic","Browser translation"],
    ["nl","Dutch","Browser translation"],
    ["fr","French","Browser translation"],
    ["de","German","Browser translation"],
    ["it","Italian","Browser translation"],
    ["ja","Japanese","Browser translation"],
    ["ko","Korean","Browser translation"],
    ["pt","Portuguese","Browser translation"],
    ["ru","Russian","Browser translation"],
    ["es","Spanish","Browser translation"],
    ["tr","Turkish","Browser translation"],
    ["zh-CN","Chinese","Browser translation"]
  ];
  modal = document.createElement("div");
  modal.id = "worldLanguagesModal";
  modal.className = "world-lang-modal";
  modal.innerHTML = `
    <div class="world-lang-card">
      <div class="world-lang-head">
        <h3>Choose your language</h3>
        <p>Select a built-in language or search more world languages for browser translation.</p>
      </div>
      <div class="world-lang-search-wrap">
        <input class="world-lang-search" id="worldLangSearch" type="text" placeholder="Search language">
      </div>
      <div class="world-lang-list" id="worldLangList">
        ${languages.map(([code,name,note]) => `
          <button class="world-lang-item" type="button" data-world-lang="${code}">
            <span><strong>${name}</strong><small>${note}</small></span>
            <span>›</span>
          </button>`).join("")}
      </div>
      <button class="world-lang-close" type="button">Close</button>
    </div>
  `;
  document.body.appendChild(modal);

  const search = modal.querySelector("#worldLangSearch");
  search.addEventListener("input", () => {
    const term = search.value.trim().toLowerCase();
    modal.querySelectorAll(".world-lang-item").forEach(btn => {
      btn.style.display = btn.innerText.toLowerCase().includes(term) ? "" : "none";
    });
  });

  modal.querySelectorAll(".world-lang-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.getAttribute("data-world-lang");
      if (["en","hi","pa"].includes(code)) {
        applyLanguage(code);
        sessionStorage.setItem("agrotitan_lang_popup_v3", "seen");
      } else {
        const target = encodeURIComponent(window.location.href);
        window.open(`https://translate.google.com/translate?sl=auto&tl=${code}&u=${target}`, "_blank");
      }
      closeWorldLanguagesModal();
      closeLanguageModal();
    });
  });

  modal.querySelector(".world-lang-close").addEventListener("click", closeWorldLanguagesModal);
  modal.addEventListener("click", e => {
    if(e.target === modal) closeWorldLanguagesModal();
  });
  return modal;
}
function openWorldLanguagesModal(){
  const modal = createWorldLanguagesModal();
  modal.classList.add("show");
  const input = modal.querySelector("#worldLangSearch");
  if(input) setTimeout(() => input.focus(), 60);
}
function closeWorldLanguagesModal(){
  const modal = document.getElementById("worldLanguagesModal");
  if(modal) modal.classList.remove("show");
}

function initLanguageSelector() {
  createLanguagePopup();
  const saved = localStorage.getItem("agrotitan_lang") || "en";
  applyLanguage(saved);

  if (!sessionStorage.getItem("agrotitan_lang_popup_v3")) {
    openLanguageModal();
  }

  document.querySelectorAll("[data-lang-choice]").forEach(btn => {
    btn.addEventListener("click", () => {
      const choice = btn.getAttribute("data-lang-choice");
      if (["en","hi","pa"].includes(choice)) {
        applyLanguage(choice);
        sessionStorage.setItem("agrotitan_lang_popup_v3", "seen");
        closeLanguageModal();
      } else if (choice === "world") {
        openWorldLanguagesModal();
      } else {
        const target = encodeURIComponent(window.location.href);
        window.open(`https://translate.google.com/translate?sl=auto&tl=${choice.replace("other-","")}&u=${target}`, "_blank");
      }
    });
  });

  const topButton = document.getElementById("languageButton");
  const dropdown = document.getElementById("languageDropdown");
  if (topButton && dropdown) {
    topButton.addEventListener("click", e => {
      e.stopPropagation();
      dropdown.classList.toggle("show");
      topButton.setAttribute("aria-expanded", dropdown.classList.contains("show") ? "true" : "false");
    });
  }

  document.addEventListener("click", e => {
    if (!e.target.closest(".lang-menu-wrap")) closeLanguageDropdown();
  });
}
function enhanceHeader() {
  const nav = document.querySelector(".nav");
  const menu = document.querySelector(".menu");
  const actions = document.querySelector(".nav-actions");
  if (!nav || !menu || !actions) return;

  if (!document.getElementById("languageButtonWrap")) {
    const wrap = document.createElement("div");
    wrap.className = "lang-menu-wrap";
    wrap.id = "languageButtonWrap";
    wrap.innerHTML = `
      <button class="lang-top-btn" id="languageButton" type="button" aria-haspopup="true" aria-expanded="false">🇬🇧 Language ▾</button>
      <div class="lang-dropdown" id="languageDropdown">
        <button class="lang-option" type="button" data-lang-choice="en"><span class="flag">🇬🇧</span><span class="lang-option-text"><strong>English</strong><small>Default website language</small></span></button>
        <button class="lang-option" type="button" data-lang-choice="hi"><span class="flag">🇮🇳</span><span class="lang-option-text"><strong>हिंदी</strong><small>Hindi language view</small></span></button>
        <button class="lang-option" type="button" data-lang-choice="pa"><span class="flag">🇮🇳</span><span class="lang-option-text"><strong>ਪੰਜਾਬੀ</strong><small>Punjabi language view</small></span></button>
      </div>
    `;
    actions.prepend(wrap);
  }

  if (!document.getElementById("menuToggleBtn")) {
    const toggle = document.createElement("button");
    toggle.id = "menuToggleBtn";
    toggle.className = "menu-toggle-btn";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Open menu");
    toggle.innerHTML = "☰";
    nav.appendChild(toggle);
    toggle.addEventListener("click", openMobileDrawer);
  }

  if (!document.getElementById("mobileDrawerOverlay")) {
    const overlay = document.createElement("div");
    overlay.id = "mobileDrawerOverlay";
    overlay.className = "mobile-drawer-overlay";
    overlay.addEventListener("click", closeMobileDrawer);
    document.body.appendChild(overlay);
  }

  if (!document.getElementById("mobileDrawer")) {
    const drawer = document.createElement("aside");
    drawer.id = "mobileDrawer";
    drawer.className = "mobile-drawer";
    drawer.innerHTML = `
      <div class="drawer-head">
        <div class="drawer-brand">
          <img src="logo.svg" alt="${SHOP.name} logo">
          <div>
            <strong>${SHOP.name}</strong>
            <span>${SHOP.tagline}</span>
          </div>
        </div>
        <button class="drawer-close" id="drawerCloseBtn" type="button" aria-label="Close menu">✕</button>
      </div>
      <div class="drawer-links" id="drawerLinks"></div>
      <div class="drawer-contact">
        <a href="tel:${SHOP.phonePrimary}">📞 ${SHOP.phonePrimary}</a>
        <a href="https://wa.me/${SHOP.whatsapp}" target="_blank" rel="noopener">💬 WhatsApp Quick Order</a>
        <a href="assistant.html">🤖 AI Assistant</a>
      </div>
    `;
    document.body.appendChild(drawer);
  }

  const drawerLinks = document.getElementById("drawerLinks");
  if (drawerLinks && !drawerLinks.children.length) {
    drawerLinks.innerHTML = `
      <a class="drawer-link" href="index.html">Home</a>
      <a class="drawer-link" href="new-combines.html">New Combines</a>
      <a class="drawer-link" href="used-combines.html">Used Combines</a>
      <a class="drawer-link" href="products.html">Spare Parts</a>
      <a class="drawer-link" href="seller-center.html">Sell Used</a>
      <a class="drawer-link" href="rewards.html">Rewards</a>
      <a class="drawer-link" href="ai-help.html">AI Help</a>
      <a class="drawer-link" href="contact.html">Contact</a>
      <a class="drawer-link" href="cart.html">Cart</a>
    `;
    drawerLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMobileDrawer);
    });
  }

  const closeBtn = document.getElementById("drawerCloseBtn");
  if (closeBtn && !closeBtn.dataset.bound) {
    closeBtn.dataset.bound = "1";
    closeBtn.addEventListener("click", closeMobileDrawer);
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeLanguageDropdown();
      closeLanguageModal();
      closeMobileDrawer();
    }
  });
}
function openMobileDrawer() {
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("mobileDrawerOverlay");
  const toggle = document.getElementById("menuToggleBtn");
  if (drawer) drawer.classList.add("open");
  if (overlay) overlay.classList.add("show");
  if (toggle) toggle.innerHTML = "✕";
  document.body.classList.add("drawer-open");
}
function closeMobileDrawer() {
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("mobileDrawerOverlay");
  const toggle = document.getElementById("menuToggleBtn");
  if (drawer) drawer.classList.remove("open");
  if (overlay) overlay.classList.remove("show");
  if (toggle) toggle.innerHTML = "☰";
  document.body.classList.remove("drawer-open");
}



function initAssistantPage(){
  const messagesEl = document.getElementById("chatMessages");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  if(!messagesEl || !form || !input) return;

  const chats = [
    {role:"bot", text:"Hello, I am the Harvester Parts AI Assistant."},
    {role:"bot", text:"Ask me about New Hira 985 Standard, 985 Deluxe, product pricing, compatibility, or contact details."}
  ];

  function renderChat(list){
    messagesEl.innerHTML = list.map(item => `
      <div class="chat-row ${item.role}">
        <div class="bubble">${item.text}</div>
      </div>
    `).join("");
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function reply(q){
    const t = q.toLowerCase();
    if(t.includes("new hira") || t.includes("985")) return "We support New Hira 985 Standard and 985 Deluxe machines. Open Products and use the selector to find matching parts quickly.";
    if(t.includes("contact") || t.includes("phone") || t.includes("call")) return "Call 9216107700 or 9217000077. Address: Patiala Road opposite reliance pump.";
    if(t.includes("price")) return "Prices depend on part type. Open the Products page to see current prices and details.";
    if(t.includes("whatsapp")) return "For the fastest reply, use the Ask on WhatsApp button or message 9216107700.";
    if(t.includes("cutter") || t.includes("straw") || t.includes("combine")) return "We provide parts for combine harvesters, cutter bars, and straw reapers. Tell me the machine brand and model.";
    return "I can help with machine models, part suggestions, contact details, pricing guidance, and WhatsApp ordering.";
  }

  renderChat(chats);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if(!q) return;
    chats.push({role:"user", text:q});
    chats.push({role:"bot", text:reply(q)});
    input.value = "";
    renderChat(chats);
  });
}



function initGlassHeader(){
  const header = document.querySelector(".header");
  if(!header) return;
  const onScroll = () => {
    if(window.scrollY > 10) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, {passive:true});
}


function initIntroLogo(){
  const hideIntro = () => {
    document.body.classList.add("intro-finished");
    const intro = document.getElementById("introLogo");
    if(intro){
      intro.style.opacity = "0";
      intro.style.visibility = "hidden";
      intro.style.pointerEvents = "none";
      setTimeout(() => {
        if(intro && intro.parentNode) intro.remove();
      }, 420);
    }
  };
  window.addEventListener("load", () => setTimeout(hideIntro, 1650));
  setTimeout(hideIntro, 2400);
}


function initScrollTopButton(){
  if(document.getElementById("scrollTopBtn")) return;
  const btn = document.createElement("button");
  btn.id = "scrollTopBtn";
  btn.type = "button";
  btn.setAttribute("aria-label","Scroll to top");
  btn.innerHTML = "↑";
  document.body.appendChild(btn);
  const toggle = () => {
    if(window.scrollY > 280) btn.classList.add("show");
    else btn.classList.remove("show");
  };
  window.addEventListener("scroll", toggle, {passive:true});
  toggle();
  btn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
}

function updateHomepageStats(){
  const parts = Array.isArray(PRODUCTS) ? PRODUCTS.length : 0;
  const stock = Array.isArray(PRODUCTS) ? PRODUCTS.reduce((n,p)=>n + (Number(p.stock)||0),0) : 0;
  const cart = state.cart.reduce((a,b)=>a + b.qty, 0);
  const brands = Array.isArray(PRODUCTS) ? new Set(PRODUCTS.map(p=>p.brand)).size : 0;
  const stats = {parts, stock, cart, brands};
  document.querySelectorAll("[data-count-key]").forEach(el => {
    const key = el.getAttribute("data-count-key");
    const val = Number(stats[key] || 0);
    const prev = Number(el.getAttribute("data-prev") || "0");
    el.setAttribute("data-count-to", String(val));
    el.setAttribute("data-prev", String(prev));
    el.dataset.done = "0";
    if(el.dataset.visible === "true"){
      animateCounterElement(el, prev, val);
      el.setAttribute("data-prev", String(val));
    } else {
      el.textContent = "0";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("showroom-ready");
  fillSharedContent();
  initScrollTopButton();
  initIntroLogo();
  initGlassHeader();
  enhanceHeader();
  initLanguageSelector();
  updateBadges();
  updateHomepageStats();
  setActiveMenu();
  populateSelectors();
  animateCounters();
  renderFeatured("featuredGrid", 6);
  applyQueryFilters();
  renderProductsPage();
  renderProductDetail();
  renderCartPage();
  renderCheckoutPage();
  renderThankyouPage();
  initAssistantPage();
});


function sendWhatsAppOrder(productName){
  const number = "919216107700";
  const message = encodeURIComponent("Hello, I want to order: " + productName);
  window.open("https://wa.me/" + number + "?text=" + message, "_blank");
}


function createOtherLanguagesModal(){
  let modal = document.getElementById("otherLanguagesModal");
  if(modal) return modal;
  modal = document.createElement("div");
  modal.id = "otherLanguagesModal";
  modal.className = "other-lang-modal";
  modal.innerHTML = `
    <div class="other-lang-card">
      <div class="other-lang-head">
        <h3>More languages</h3>
        <p>These options currently guide users to broader translation choices.</p>
      </div>
      <div class="other-lang-list">
        <button class="other-lang-item">Arabic</button>
        <button class="other-lang-item">Spanish</button>
        <button class="other-lang-item">French</button>
        <button class="other-lang-item">German</button>
        <button class="other-lang-item">Italian</button>
        <button class="other-lang-item">Portuguese</button>
      </div>
      <button class="other-lang-close" type="button">Back</button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector(".other-lang-close").addEventListener("click", closeOtherLanguagesModal);
  modal.querySelectorAll(".other-lang-item").forEach(btn => {
    btn.addEventListener("click", () => {
      alert("For now, English remains the default site language. You can add more languages later in the catalog translations.");
      closeOtherLanguagesModal();
    });
  });
  modal.addEventListener("click", (e) => {
    if(e.target === modal) closeOtherLanguagesModal();
  });
  return modal;
}

function openOtherLanguagesModal(){
  createOtherLanguagesModal().classList.add("show");
}

function closeOtherLanguagesModal(){
  const modal = document.getElementById("otherLanguagesModal");
  if(modal) modal.classList.remove("show");
}


/* ===== v39 robust language/header fixes ===== */
function createWorldLanguagesModalV39(){
  let modal = document.getElementById("worldLanguagesModalV39");
  if(modal) return modal;
  const languages = [
    ["en","English","Built-in website language"],
    ["hi","Hindi","Built-in website language"],
    ["pa","Punjabi","Built-in website language"],
    ["ar","Arabic","Browser translation"],
    ["nl","Dutch","Browser translation"],
    ["fr","French","Browser translation"],
    ["de","German","Browser translation"],
    ["it","Italian","Browser translation"],
    ["ja","Japanese","Browser translation"],
    ["ko","Korean","Browser translation"],
    ["pt","Portuguese","Browser translation"],
    ["ru","Russian","Browser translation"],
    ["es","Spanish","Browser translation"],
    ["tr","Turkish","Browser translation"],
    ["zh-CN","Chinese","Browser translation"]
  ];
  modal = document.createElement("div");
  modal.id = "worldLanguagesModalV39";
  modal.className = "world-lang-modal";
  modal.innerHTML = `
    <div class="world-lang-card">
      <div class="world-lang-head">
        <h3>Choose your language</h3>
        <p>Select a built-in language or search more world languages.</p>
      </div>
      <div class="world-lang-search-wrap">
        <input class="world-lang-search" id="worldLangSearchV39" type="text" placeholder="Search language">
      </div>
      <div class="world-lang-list" id="worldLangListV39">
        ${languages.map(([code,name,note]) => `
          <button class="world-lang-item" type="button" data-world-lang-v39="${code}">
            <span><strong>${name}</strong><small>${note}</small></span><span>›</span>
          </button>`).join("")}
      </div>
      <button class="world-lang-close" type="button">Close</button>
    </div>`;
  document.body.appendChild(modal);

  modal.querySelector("#worldLangSearchV39").addEventListener("input", e => {
    const term = e.target.value.trim().toLowerCase();
    modal.querySelectorAll("[data-world-lang-v39]").forEach(btn => {
      btn.style.display = btn.innerText.toLowerCase().includes(term) ? "" : "none";
    });
  });

  modal.querySelectorAll("[data-world-lang-v39]").forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.getAttribute("data-world-lang-v39");
      if (["en","hi","pa"].includes(code)) {
        applyLanguage(code);
        sessionStorage.setItem("agrotitan_lang_popup_v3", "seen");
      } else {
        const target = encodeURIComponent(window.location.href);
        window.open(`https://translate.google.com/translate?sl=auto&tl=${code}&u=${target}`, "_blank");
      }
      modal.classList.remove("show");
      closeLanguageModal();
    });
  });
  modal.querySelector(".world-lang-close").addEventListener("click", ()=>modal.classList.remove("show"));
  modal.addEventListener("click", e => { if(e.target === modal) modal.classList.remove("show"); });
  return modal;
}
function openWorldLanguagesModalV39(){
  const modal = createWorldLanguagesModalV39();
  modal.classList.add("show");
  const input = modal.querySelector("#worldLangSearchV39");
  if(input) setTimeout(()=>input.focus(),60);
}

function enhanceHeaderV39(){
  const actions = document.querySelector(".nav-actions");
  const nav = document.querySelector(".nav");
  if (!actions || !nav) return;
  let wrap = document.getElementById("languageButtonWrapV39");
  if(!wrap){
    wrap = document.createElement("div");
    wrap.className = "lang-menu-wrap";
    wrap.id = "languageButtonWrapV39";
    wrap.innerHTML = `<button class="lang-top-btn" id="languageButtonV39" type="button" aria-haspopup="dialog">🌐 Language</button>`;
    // insert after selector button if possible
    const selectorBtn = actions.querySelector("[data-static-selector-btn]");
    if (selectorBtn && selectorBtn.parentNode === actions) {
      selectorBtn.insertAdjacentElement("afterend", wrap);
    } else {
      actions.prepend(wrap);
    }
  }
  const btn = document.getElementById("languageButtonV39");
  if(btn && !btn.dataset.bound){
    btn.dataset.bound = "1";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openWorldLanguagesModalV39();
    });
  }
}

function fixPageAfterLoadV39(){
  enhanceHeaderV39();
  const oldWrap = document.getElementById("languageButtonWrap");
  if(oldWrap) oldWrap.remove();
  // ensure selector form spacing on products page
  document.querySelectorAll(".filters.card .field").forEach(el => {
    el.style.display = "block";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(fixPageAfterLoadV39, 50);
  setTimeout(fixPageAfterLoadV39, 300);
});


/* ===== v41 selector UI safeguard ===== */
function fixSelectorLayoutsV41(){
  document.querySelectorAll('.selector-home-grid .field, .selector-products .field').forEach(el => {
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.minWidth = '0';
  });
  document.querySelectorAll('.selector-products .filter-actions').forEach(el => {
    el.style.display = window.innerWidth <= 720 ? 'grid' : 'grid';
  });
}
window.addEventListener('resize', fixSelectorLayoutsV41);
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(fixSelectorLayoutsV41, 80);
  setTimeout(fixSelectorLayoutsV41, 400);
});


/* ===== v44 premium conversion upgrade ===== */
function runGlobalSearch(){
  const value = (document.getElementById("globalPartsSearch")?.value || "").trim();
  if(!value) { location.href = "products.html"; return; }
  location.href = "products.html?search=" + encodeURIComponent(value);
}
function runCatalogSearch(){
  const value = (document.getElementById("catalogSearchBar")?.value || "").trim();
  const sf = document.getElementById("searchFilter");
  if(sf) sf.value = value;
  renderProductsPage();
}

function createQuickViewModal(){
  let modal = document.getElementById("quickViewModal");
  if(modal) return modal;
  modal = document.createElement("div");
  modal.id = "quickViewModal";
  modal.className = "quickview-modal";
  modal.innerHTML = `
    <div class="quickview-card">
      <button class="quickview-close" type="button" aria-label="Close">×</button>
      <div id="quickViewContent"></div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector(".quickview-close").addEventListener("click", closeQuickView);
  modal.addEventListener("click", (e) => { if(e.target === modal) closeQuickView(); });
  return modal;
}
function openQuickView(id){
  const p = getProduct(id);
  if(!p) return;
  const modal = createQuickViewModal();
  const content = modal.querySelector("#quickViewContent");
  content.innerHTML = `
    <div class="quickview-grid">
      <div class="quickview-image"><img src="${p.image}" alt="${tProduct(p, "name")}" referrerpolicy="no-referrer"></div>
      <div class="quickview-content">
        <div class="ribbon">${p.brand}</div>
        <h3>${tProduct(p, "name")}</h3>
        <div class="quickview-price">${formatPrice(p.price)} <span class="old-price" style="margin-left:8px">${formatPrice(p.oldPrice)}</span></div>
        <div class="quickview-meta">
          <span>${p.model}</span>
          <span>${p.machineType}</span>
          <span>${p.partNo}</span>
          <span>${p.category}</span>
        </div>
        <p>${tProduct(p, "description")}</p>
        <div class="quickview-actions">
          <button class="primary-btn" onclick="addToCart('${p.id}');closeQuickView()">Add to Cart</button>
          <a class="ghost-btn" href="product.html?id=${p.id}">View Details</a>
          <a class="ghost-btn" data-whatsapp-link href="https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent('Hello, I want details for ' + p.name + ' (' + p.partNo + ')')}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </div>
  `;
  modal.classList.add("show");
}
function closeQuickView(){
  const modal = document.getElementById("quickViewModal");
  if(modal) modal.classList.remove("show");
}

function enhanceProductCardsV44(){
  document.querySelectorAll(".product-card .actions, .product-card .product-actions").forEach(actions => {
    if(actions.querySelector(".quick-view-btn")) return;
    const detailLink = actions.querySelector('a[href*="product.html"], button[onclick*="product.html"]');
    let id = null;
    const card = actions.closest(".product-card");
    if(card){
      const viewLink = card.querySelector('a[href*="product.html?id="]');
      if(viewLink){
        const m = viewLink.getAttribute("href").match(/id=([^&]+)/);
        if(m) id = m[1];
      }
      if(!id){
        const addBtn = actions.querySelector('[onclick*="addToCart"]');
        if(addBtn){
          const m = addBtn.getAttribute("onclick").match(/addToCart\('([^']+)'/);
          if(m) id = m[1];
        }
      }
    }
    if(!id) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "small-btn secondary quick-view-btn";
    btn.textContent = "Quick View";
    btn.addEventListener("click", () => openQuickView(id));
    actions.appendChild(btn);
  });
}

function applySearchQueryFromURLV44(){
  const q = new URLSearchParams(location.search);
  const s = q.get("search");
  const input = document.getElementById("searchFilter");
  const catalogInput = document.getElementById("catalogSearchBar");
  if(s){
    if(input) input.value = s;
    if(catalogInput) catalogInput.value = s;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(applySearchQueryFromURLV44, 80);
  setTimeout(enhanceProductCardsV44, 120);
  setTimeout(enhanceProductCardsV44, 500);
});


/* ===== v45 declutter button safeguard ===== */
document.addEventListener("DOMContentLoaded", () => {
  const sticky = document.querySelector(".mobile-sticky-bar");
  if (sticky) sticky.remove();
  const extraWhatsapp = document.getElementById("whatsappFloat");
  if (window.innerWidth <= 720 && extraWhatsapp) extraWhatsapp.style.display = "none";
});




/* ===== v47 mobile right-button safeguard ===== */
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth <= 720) {
    const extraWhatsapp = document.getElementById("whatsappFloat");
    if (extraWhatsapp) extraWhatsapp.style.display = "none";
    document.querySelectorAll(".floating .call-btn").forEach(el => el.style.display = "none");
    document.querySelectorAll(".floating .whatsapp-btn").forEach(el => el.style.display = "flex");
  }
});


/* ===== v50 unified mobile action rail safeguard ===== */
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth <= 720) {
    document.querySelectorAll(".floating, #whatsappFloat, .showroom-actions").forEach(el => {
      if (el) el.style.display = "none";
    });
    document.querySelectorAll('a[href^="tel:"][style*="position:fixed"]').forEach(el => el.remove());
  }
});


/* ===== v52 contact overlay safeguard ===== */
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth <= 720 && document.querySelector('.contact-page-v51')) {
    document.body.classList.add('contact-mobile-fix');
  }
});

/* ===== v54 marketplace logic ===== */
function getRewardProfile(){ try{return JSON.parse(localStorage.getItem("hp_rewards") || '{"points":0,"actions":0}');}catch(e){return {points:0,actions:0};} }
function saveRewardProfile(profile){ localStorage.setItem("hp_rewards", JSON.stringify(profile)); }
function addRewardPoints(points){ const p = getRewardProfile(); p.points += points; p.actions += 1; saveRewardProfile(p); }
function formatMoney(num){ return '₹' + Number(num || 0).toLocaleString('en-IN'); }

function marketplaceCardHTML(item, type){
  const isUsed = type === 'used';
  return `
    <article class="card market-card">
      <div class="thumb"><img src="${item.image}" alt="${item.brand} ${item.model}" referrerpolicy="no-referrer"></div>
      <div class="badge-ribbon">${item.badge || (isUsed ? 'Used Listing' : 'New Model')}</div>
      <h4>${item.brand} ${item.model}</h4>
      <div class="meta">
        <span>${item.machineType || 'Combine Harvester'}</span>
        <span>${isUsed ? item.year : item.hp}</span>
        <span>${isUsed ? item.location : item.deliveryTime}</span>
      </div>
      <p>${item.description}</p>
      <div class="price-row">
        <strong>${formatMoney(isUsed ? item.askingPrice : item.price)}</strong>
        <small>${isUsed ? (item.negotiable ? 'Negotiable' : 'Fixed price') : ('Booking: ' + formatMoney(item.bookingAmount))}</small>
      </div>
      <div class="meta">
        ${isUsed
          ? `<span>${item.hours}</span><span>${item.condition}</span><span>${item.ownership}</span><span>${item.age}</span>`
          : `<span>${item.finance}</span><span>${item.warranty}</span><span>${item.cuttingWidth}</span><span>${item.seasonOffer}</span>`
        }
      </div>
      <div class="action-row">
        <a class="primary-btn" href="https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent('Hello, I am interested in ' + item.brand + ' ' + item.model + (isUsed ? ' used listing' : ' new combine'))}" target="_blank" rel="noopener" onclick="addRewardPoints(${isUsed ? 20 : 25})">${isUsed ? 'Get Seller Details' : 'Request Price'}</a>
        <button class="ghost-btn" type="button" onclick="openMarketQuickView('${type}','${item.id}')">Quick View</button>
      </div>
    </article>
  `;
}

function openMarketQuickView(type,id){
  const source = type === 'used' ? (window.USED_COMBINES || []) : (window.NEW_COMBINES || []);
  const item = source.find(x => x.id === id);
  if(!item) return;
  let modal = document.getElementById('quickViewModal');
  if(!modal){
    modal = document.createElement('div');
    modal.id = 'quickViewModal';
    modal.className = 'quickview-modal';
    modal.innerHTML = '<div class="quickview-card"><button class="quickview-close" type="button">×</button><div id="quickViewContent"></div></div>';
    document.body.appendChild(modal);
    modal.querySelector('.quickview-close').addEventListener('click', ()=>modal.classList.remove('show'));
    modal.addEventListener('click', e => { if(e.target === modal) modal.classList.remove('show'); });
  }
  const content = document.getElementById('quickViewContent');
  content.innerHTML = `
    <div class="quickview-grid">
      <div class="quickview-image"><img src="${item.image}" alt="${item.brand} ${item.model}" referrerpolicy="no-referrer"></div>
      <div class="quickview-content">
        <div class="ribbon">${item.badge || (type === 'used' ? 'Used Listing' : 'New Model')}</div>
        <h3>${item.brand} ${item.model}</h3>
        <div class="quickview-price">${formatMoney(type === 'used' ? item.askingPrice : item.price)}</div>
        <div class="quickview-meta">
          ${(type === 'used'
            ? [item.year,item.hours,item.location,item.condition,item.ownership,item.age]
            : [item.hp,item.cuttingWidth,item.deliveryTime,item.finance,item.warranty,item.seasonOffer]
          ).filter(Boolean).map(v => `<span>${v}</span>`).join('')}
        </div>
        <p>${item.description}</p>
        <div class="quickview-actions">
          <a class="primary-btn" href="https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent('Hello, I am interested in ' + item.brand + ' ' + item.model)}" target="_blank" rel="noopener" onclick="addRewardPoints(${type === 'used' ? 20 : 25})">WhatsApp</a>
          <a class="ghost-btn" href="tel:${SHOP.phone_primary}">Call</a>
          <button class="ghost-btn" type="button" onclick="document.getElementById('quickViewModal').classList.remove('show')">Close</button>
        </div>
      </div>
    </div>`;
  modal.classList.add('show');
}

function fillSelectOptions(selectId, items, key){
  const el = document.getElementById(selectId);
  if(!el) return;
  const values = [...new Set(items.map(x => x[key]).filter(Boolean))];
  const first = el.querySelector('option')?.outerHTML || '<option value="">All</option>';
  el.innerHTML = first + values.map(v => `<option value="${v}">${v}</option>`).join('');
}

function renderNewCombinesPage(){
  const grid = document.getElementById('newCombinesGrid');
  if(!grid || !window.NEW_COMBINES) return;
  fillSelectOptions('newBrandFilter', NEW_COMBINES, 'brand');
  const search = (document.getElementById('newCombineSearch')?.value || '').trim().toLowerCase();
  const brand = document.getElementById('newBrandFilter')?.value || '';
  const finance = document.getElementById('newFinanceFilter')?.value || '';
  const budget = document.getElementById('newBudgetFilter')?.value || '';
  let items = NEW_COMBINES.filter(item => {
    const okSearch = !search || [item.brand,item.model,item.description].join(' ').toLowerCase().includes(search);
    const okBrand = !brand || item.brand === brand;
    const okFinance = !finance || item.finance === finance;
    let okBudget = true;
    if(budget){
      const b = Number(budget);
      okBudget = b === 99999999 ? item.price > 2800000 : item.price <= b;
    }
    return okSearch && okBrand && okFinance && okBudget;
  });
  const count = document.getElementById('newCombinesCount');
  if(count) count.textContent = items.length + ' models found';
  grid.innerHTML = items.map(item => marketplaceCardHTML(item,'new')).join('') || '<div class="card" style="padding:24px">No models found.</div>';
}
function resetNewCombinesFilters(){ ['newBrandFilter','newFinanceFilter','newBudgetFilter','newCombineSearch'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; }); renderNewCombinesPage(); }

function renderUsedCombinesPage(){
  const grid = document.getElementById('usedCombinesGrid');
  if(!grid || !window.USED_COMBINES) return;
  fillSelectOptions('usedBrandFilter', USED_COMBINES, 'brand');
  const search = (document.getElementById('usedCombineSearch')?.value || '').trim().toLowerCase();
  const brand = document.getElementById('usedBrandFilter')?.value || '';
  const condition = document.getElementById('usedConditionFilter')?.value || '';
  const location = (document.getElementById('usedLocationFilter')?.value || '').trim().toLowerCase();
  let items = USED_COMBINES.filter(item => {
    const okSearch = !search || [item.brand,item.model,item.description,item.location,item.year].join(' ').toLowerCase().includes(search);
    const okBrand = !brand || item.brand === brand;
    const okCondition = !condition || item.condition === condition;
    const okLocation = !location || (item.location || '').toLowerCase().includes(location);
    return okSearch && okBrand && okCondition && okLocation;
  });
  const count = document.getElementById('usedCombinesCount');
  if(count) count.textContent = items.length + ' listings found';
  grid.innerHTML = items.map(item => marketplaceCardHTML(item,'used')).join('') || '<div class="card" style="padding:24px">No used combine listings found.</div>';
}
function resetUsedCombinesFilters(){ ['usedBrandFilter','usedConditionFilter','usedLocationFilter','usedCombineSearch'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; }); renderUsedCombinesPage(); }

function renderRewardsPage(){
  const grid = document.getElementById('badgesGrid');
  if(!grid || !window.REWARD_BADGES) return;
  const profile = getRewardProfile();
  grid.innerHTML = REWARD_BADGES.map(item => `
    <article class="card badge-card">
      <div class="badge-points">${item.points}+ points</div>
      <h4>${item.name}</h4>
      <p>${item.desc}</p>
      <div class="helper">${profile.points >= item.points ? 'Unlocked or eligible soon' : ('Need ' + (item.points - profile.points) + ' more points')}</div>
    </article>`).join('');
}

function initSellerCenter(){
  const btn = document.getElementById('sellerWhatsAppBtn');
  if(!btn) return;
  btn.addEventListener('click', function(){
    const vals = {
      name: document.getElementById('sellerName')?.value || '',
      phone: document.getElementById('sellerPhone')?.value || '',
      brand: document.getElementById('sellerBrand')?.value || '',
      model: document.getElementById('sellerModel')?.value || '',
      year: document.getElementById('sellerYear')?.value || '',
      hours: document.getElementById('sellerHours')?.value || '',
      location: document.getElementById('sellerLocation')?.value || '',
      price: document.getElementById('sellerPrice')?.value || '',
      notes: document.getElementById('sellerNotes')?.value || ''
    };
    const lines = ['Hello Harvester Parts, I want to list my used combine.',
      vals.name ? 'Seller: ' + vals.name : '',
      vals.phone ? 'Phone: ' + vals.phone : '',
      vals.brand ? 'Brand: ' + vals.brand : '',
      vals.model ? 'Model: ' + vals.model : '',
      vals.year ? 'Year: ' + vals.year : '',
      vals.hours ? 'Hours: ' + vals.hours : '',
      vals.location ? 'Location: ' + vals.location : '',
      vals.price ? 'Expected Price: ' + vals.price : '',
      vals.notes ? 'Condition / Notes: ' + vals.notes : ''
    ].filter(Boolean);
    addRewardPoints(30);
    window.open('https://wa.me/' + SHOP.whatsapp + '?text=' + encodeURIComponent(lines.join('\n')), '_blank');
  });
}

document.addEventListener('DOMContentLoaded', function(){
  setTimeout(renderNewCombinesPage, 80);
  setTimeout(renderUsedCombinesPage, 80);
  setTimeout(renderRewardsPage, 80);
  setTimeout(initSellerCenter, 80);
});


/* ===== v56 local marketplace backend ===== */
function getMarketplaceState(){
  const defaults = { pendingSellerLeads: [], usedListingsExtra: [] };
  try{
    return Object.assign(defaults, JSON.parse(localStorage.getItem('hp_marketplace_state') || '{}'));
  }catch(e){
    return defaults;
  }
}
function saveMarketplaceState(state){
  localStorage.setItem('hp_marketplace_state', JSON.stringify(state));
}
function getAllUsedListings(){
  const state = getMarketplaceState();
  return [...(window.USED_COMBINES || []), ...(state.usedListingsExtra || [])];
}
function submitSellerLeadV56(lead){
  const state = getMarketplaceState();
  state.pendingSellerLeads.push({
    id: 'lead-' + Date.now(),
    createdAt: new Date().toISOString(),
    status: 'pending',
    ...lead
  });
  saveMarketplaceState(state);
}
function approveSellerLead(leadId){
  const state = getMarketplaceState();
  const lead = state.pendingSellerLeads.find(x => x.id === leadId);
  if(!lead) return;
  state.pendingSellerLeads = state.pendingSellerLeads.filter(x => x.id !== leadId);
  state.usedListingsExtra.push({
    id: 'ucl-' + Date.now(),
    brand: lead.brand || 'Used Combine',
    model: lead.model || 'Seller Listing',
    year: lead.year || '',
    hours: lead.hours || '',
    location: lead.location || '',
    ownership: 'Seller submitted',
    condition: 'Verified',
    askingPrice: Number(lead.price || 0),
    negotiable: true,
    age: lead.year ? ((new Date().getFullYear() - Number(lead.year)) + ' years') : '',
    badge: 'Verified Seller',
    image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1200&q=80',
    description: lead.notes || 'Seller-submitted used combine listing approved from dashboard.'
  });
  addRewardPoints(40);
  saveMarketplaceState(state);
  renderAdminDashboard();
  renderUsedCombinesPage();
}
function rejectSellerLead(leadId){
  const state = getMarketplaceState();
  state.pendingSellerLeads = state.pendingSellerLeads.filter(x => x.id !== leadId);
  saveMarketplaceState(state);
  renderAdminDashboard();
}
function toggleFeaturedUsedListing(listingId){
  const state = getMarketplaceState();
  state.usedListingsExtra = (state.usedListingsExtra || []).map(item => item.id === listingId ? {...item, badge: item.badge === 'Featured Seller' ? 'Verified Seller' : 'Featured Seller'} : item);
  saveMarketplaceState(state);
  renderAdminDashboard();
  renderUsedCombinesPage();
}

const HP_AI_BOTS = {
  buyer: {
    title: 'Buyer Bot',
    subtitle: 'Ask budget, brand, or combine questions.',
    reply: (q) => {
      const text = q.toLowerCase();
      if(text.includes('under 15') || text.includes('15 lakh')) return 'For around 15 lakh, a cleaner used combine listing is usually the better fit. Check the Used Market page and filter by condition and location.';
      if(text.includes('new hira')) return 'If you prefer New Hira, compare 985 Standard and 985 Deluxe on the New Combines page. Deluxe is better for buyers wanting premium output and comfort.';
      return 'For buying guidance, compare new combines by finance and booking amount, or used combines by year, hours, and condition.';
    }
  },
  parts: {
    title: 'Parts Bot',
    subtitle: 'Ask model, fitment, or spare parts questions.',
    reply: (q) => {
      const text = q.toLowerCase();
      if(text.includes('985')) return 'For New Hira 985 models, common parts include knife section, guards, belts, bearings, auger parts, filters, and work lights. Check the Spares page and use the selector.';
      if(text.includes('belt') || text.includes('bearing')) return 'Belts and bearings are repeat-purchase parts, so the site can upsell these with combine leads and maintenance flow.';
      return 'Use the spare parts selector by brand, machine type, and model for the best matching result.';
    }
  },
  seller: {
    title: 'Seller Bot',
    subtitle: 'Ask about listing your old combine.',
    reply: (q) => {
      const text = q.toLowerCase();
      if(text.includes('sell') || text.includes('list')) return 'To sell faster, enter brand, model, year, hours, location, expected amount, and machine condition. Premium or verified badges can improve enquiries.';
      if(text.includes('featured')) return 'Featured listing can be a paid upgrade so your combine appears first and gets more serious buyer leads.';
      return 'Go to Seller Center, submit your used combine details, then the admin side can approve or feature your listing.';
    }
  }
};

function renderAdminDashboard(){
  const pendingGrid = document.getElementById('pendingLeadsGrid');
  const liveGrid = document.getElementById('adminUsedListingsGrid');
  if(!pendingGrid && !liveGrid) return;
  const state = getMarketplaceState();
  const reward = getRewardProfile();
  const pendingCount = document.getElementById('pendingLeadsCount');
  const liveCount = document.getElementById('liveUsedCount');
  const rewardCount = document.getElementById('rewardPointsCount');
  if(pendingCount) pendingCount.textContent = String((state.pendingSellerLeads || []).length);
  if(liveCount) liveCount.textContent = String(getAllUsedListings().length);
  if(rewardCount) rewardCount.textContent = String(reward.points || 0);

  if(pendingGrid){
    pendingGrid.innerHTML = (state.pendingSellerLeads || []).map(lead => `
      <article class="card market-card">
        <div class="badge-ribbon">Pending Lead</div>
        <h4>${lead.brand || 'Used Combine'} ${lead.model || ''}</h4>
        <div class="meta">
          <span>${lead.year || 'Year N/A'}</span>
          <span>${lead.hours || 'Hours N/A'}</span>
          <span>${lead.location || 'Location N/A'}</span>
        </div>
        <p>${lead.notes || 'Seller lead waiting for admin review.'}</p>
        <div class="price-row"><strong>${lead.price ? formatMoney(lead.price) : 'Price N/A'}</strong><small>${lead.name || ''}</small></div>
        <div class="action-row">
          <button class="primary-btn" type="button" onclick="approveSellerLead('${lead.id}')">Approve</button>
          <button class="ghost-btn" type="button" onclick="rejectSellerLead('${lead.id}')">Reject</button>
        </div>
      </article>
    `).join('') || '<div class="card" style="padding:24px">No pending seller leads.</div>';
  }

  if(liveGrid){
    liveGrid.innerHTML = getAllUsedListings().map(item => `
      <article class="card market-card">
        <div class="badge-ribbon">${item.badge || 'Used Listing'}</div>
        <h4>${item.brand} ${item.model}</h4>
        <div class="meta"><span>${item.year || ''}</span><span>${item.location || ''}</span><span>${item.condition || ''}</span></div>
        <p>${item.description || ''}</p>
        <div class="price-row"><strong>${formatMoney(item.askingPrice || 0)}</strong><small>${item.hours || ''}</small></div>
        <div class="action-row">
          <button class="primary-btn" type="button" onclick="toggleFeaturedUsedListing('${item.id}')">Toggle Featured</button>
          <button class="ghost-btn" type="button" onclick="openMarketQuickView('used','${item.id}')">Quick View</button>
        </div>
      </article>
    `).join('');
  }
}

function initSellerCenterV56(){
  const btn = document.getElementById('sellerWhatsAppBtn');
  if(!btn || btn.dataset.v56bound) return;
  btn.dataset.v56bound = '1';
  btn.addEventListener('click', function(){
    const lead = {
      name: document.getElementById('sellerName')?.value || '',
      phone: document.getElementById('sellerPhone')?.value || '',
      brand: document.getElementById('sellerBrand')?.value || '',
      model: document.getElementById('sellerModel')?.value || '',
      year: document.getElementById('sellerYear')?.value || '',
      hours: document.getElementById('sellerHours')?.value || '',
      location: document.getElementById('sellerLocation')?.value || '',
      price: document.getElementById('sellerPrice')?.value || '',
      notes: document.getElementById('sellerNotes')?.value || ''
    };
    submitSellerLeadV56(lead);
    addRewardPoints(30);
  });
}

function initAIBotsPage(){
  const shell = document.getElementById('aiBotMessages');
  const form = document.getElementById('aiBotForm');
  const input = document.getElementById('aiBotInput');
  if(!shell || !form || !input) return;
  let currentBot = 'buyer';
  const title = document.getElementById('aiBotTitle');
  const subtitle = document.getElementById('aiBotSubtitle');

  function push(role, text){
    const row = document.createElement('div');
    row.className = 'chat-row ' + role;
    row.innerHTML = '<div class="bubble">' + text + '</div>';
    shell.appendChild(row);
    shell.scrollTop = shell.scrollHeight;
  }
  function setBot(name){
    currentBot = name;
    title.textContent = HP_AI_BOTS[name].title;
    subtitle.textContent = HP_AI_BOTS[name].subtitle;
    shell.innerHTML = '';
    push('bot', 'Hello, I am the ' + HP_AI_BOTS[name].title + '. ' + HP_AI_BOTS[name].subtitle);
  }
  document.querySelectorAll('.ai-bot-card').forEach(card => {
    card.addEventListener('click', ()=>setBot(card.dataset.bot || 'buyer'));
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = input.value.trim();
    if(!q) return;
    push('user', q);
    const answer = HP_AI_BOTS[currentBot].reply(q);
    setTimeout(()=>push('bot', answer), 250);
    input.value = '';
  });
  setBot('buyer');
}

document.addEventListener('DOMContentLoaded', function(){
  setTimeout(renderAdminDashboard, 100);
  setTimeout(initSellerCenterV56, 100);
  setTimeout(initAIBotsPage, 100);
});




/* ===== v59 carousel logic ===== */
function initCarousels(){
  document.querySelectorAll('.hp-carousel').forEach(carousel => {
    if (carousel.dataset.bound === '1') return;
    carousel.dataset.bound = '1';

    const slides = Array.from(carousel.querySelectorAll('.hp-slide'));
    const prev = carousel.querySelector('.hp-carousel-btn.prev');
    const next = carousel.querySelector('.hp-carousel-btn.next');
    const dotsWrap = carousel.querySelector('.hp-carousel-dots');
    let index = Math.max(0, slides.findIndex(s => s.classList.contains('active')));
    let timer = null;

    function renderDots(){
      if (!dotsWrap) return;
      dotsWrap.innerHTML = slides.map((_, i) =>
        `<button type="button" class="${i === index ? 'active' : ''}" aria-label="Go to slide ${i+1}"></button>`
      ).join('');
      Array.from(dotsWrap.querySelectorAll('button')).forEach((btn, i) => {
        btn.addEventListener('click', () => {
          index = i;
          update();
          restart();
        });
      });
    }

    function update(){
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        slide.style.display = i === index ? 'flex' : 'none';
      });
      if (dotsWrap){
        Array.from(dotsWrap.querySelectorAll('button')).forEach((btn, i) => {
          btn.classList.toggle('active', i === index);
        });
      }
    }

    function go(step){
      index = (index + step + slides.length) % slides.length;
      update();
    }

    function restart(){
      if (timer) clearInterval(timer);
      timer = setInterval(() => go(1), 4200);
    }

    prev && prev.addEventListener('click', () => { go(-1); restart(); });
    next && next.addEventListener('click', () => { go(1); restart(); });

    renderDots();
    update();
    restart();
  });
}

document.addEventListener('DOMContentLoaded', function(){
  setTimeout(initCarousels, 120);
});
