
const SHOP = {
  name: "AgroTitan Spares",
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
    el.href = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent("Hello AgroTitan Spares, I need combine spare parts information.")}`;
  });
}

function setActiveMenu(){
  const file = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".menu a").forEach(a => {
    const href = a.getAttribute("href");
    if(href === file) a.classList.add("active");
  });
}


function animateCounters(){
  const items = document.querySelectorAll("[data-count-to]");
  if(!items.length) return;

  items.forEach(el => {
    el.textContent = "0";
    el.dataset.done = "0";
  });

  const runCounter = (el) => {
    if(el.dataset.done === "1") return;
    el.dataset.done = "1";
    const targetRaw = el.getAttribute("data-count-to") || "0";
    const isPlus = targetRaw.includes("+");
    const clean = targetRaw.replace(/[+,]/g,"");
    const target = Number(clean) || 0;
    const start = performance.now();
    const duration = 1400;

    function step(now){
      const progress = Math.min((now - start) / duration, 1);
      let value = Math.floor(target * progress);
      let out = value.toLocaleString("en-IN");
      if(targetRaw.includes("/")) out = targetRaw;
      else if(isPlus && progress === 1) out += "+";
      else if(isPlus && progress < 1) out = value.toLocaleString("en-IN");
      el.textContent = out;
      if(progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        runCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.45});

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
    <div class="detail-media card"><img src="${p.image}" alt="${tProduct(p, "name")}" referrerpolicy="no-referrer"></div>
    <div class="detail-card">
      <div class="ribbon">${p.brand}</div>
      <h2 style="font-size:42px;margin:12px 0 8px">${tProduct(p, "name")}</h2>
      <p style="color:#a8b4cf;font-size:18px;line-height:1.7">${tProduct(p, "description")}</p>
      <div class="meta">
        <span>Model: ${p.model}</span>
        <span>Machine: ${p.machineType}</span>
        <span>Category: ${p.category}</span>
        <span>Part No: ${p.partNo}</span>
        <span>Stock: ${p.stock}</span>
        <span>Rating: ★ ${p.rating}</span>
      </div>
      <div class="price-row">
        <div class="price">${formatPrice(p.price)}</div>
        <div class="old-price">${formatPrice(p.oldPrice)}</div>
      </div>
      <div class="notice">Need matching help? Tap the WhatsApp button and send your machine brand, model, and part photo.</div>
      <div class="actions">
        <button class="small-btn primary" onclick="addToCart('${p.id}')">Add to Cart</button>
        <button class="small-btn secondary" onclick="toggleWishlist('${p.id}')">Save to Wishlist</button>
        <a class="small-btn secondary" style="text-align:center;display:inline-flex;justify-content:center;align-items:center" href="products.html">Back to Products</a>
      </div>
      <hr class="sep">
      <h3>Compatibility</h3>
      <div class="list">
        ${p.compatibility.map(c => `<div class="list-item"><strong>${c}</strong><span>Supported</span></div>`).join("")}
      </div>
    </div>
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
      footerText: "Premium combine harvester spare parts website for AgroTitan Spares.",
      aiAssistant: "AI Assistant",
      language: "Language"
    },
    pages: {
      "index.html": {
        ".kicker": "AgroTitan Spares • Premium Farm Parts Store",
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
        ".ribbon": "About AgroTitan Spares",
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
      footerText: "AgroTitan Spares के लिए प्रीमियम कंबाइन स्पेयर पार्ट्स वेबसाइट।",
      aiAssistant: "AI सहायक",
      language: "भाषा"
    },
    pages: {
      "index.html": {
        ".kicker": "AgroTitan Spares • प्रीमियम फार्म पार्ट्स स्टोर",
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
        ".ribbon": "AgroTitan Spares के बारे में",
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
      footerText: "AgroTitan Spares ਲਈ ਪ੍ਰੀਮਿਅਮ ਕੰਬਾਈਨ ਸਪੇਅਰ ਪਾਰਟਸ ਵੈੱਬਸਾਈਟ।",
      aiAssistant: "AI ਸਹਾਇਕ",
      language: "ਭਾਸ਼ਾ"
    },
    pages: {
      "index.html": {
        ".kicker": "AgroTitan Spares • ਪ੍ਰੀਮਿਅਮ ਫਾਰਮ ਪਾਰਟਸ ਸਟੋਰ",
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
        ".ribbon": "AgroTitan Spares ਬਾਰੇ",
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
    langHelp: "You can change language anytime from the header Language button.",
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
    langHelp: "Header के Language button से भाषा कभी भी बदल सकते हैं।",
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
    langHelp: "Header ਦੇ Language button ਤੋਂ ਭਾਸ਼ਾ ਕਿਸੇ ਵੀ ਵੇਲੇ ਬਦਲ ਸਕਦੇ ਹੋ।",
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
          <button class="lang-btn" data-lang-choice="en">🇬🇧 <span data-i18n="langEnglish">English</span></button>
          <button class="lang-btn" data-lang-choice="hi">🇮🇳 <span data-i18n="langHindi">Hindi</span></button>
          <button class="lang-btn" data-lang-choice="pa">🇮🇳 <span data-i18n="langPunjabi">Punjabi</span></button>
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
function initLanguageSelector() {
  createLanguagePopup();
  const saved = localStorage.getItem("agrotitan_lang") || "en";
  applyLanguage(saved);

  if (!sessionStorage.getItem("agrotitan_lang_popup_v3")) {
    openLanguageModal();
  }

  document.querySelectorAll("[data-lang-choice]").forEach(btn => {
    btn.addEventListener("click", () => {
      applyLanguage(btn.getAttribute("data-lang-choice"));
      sessionStorage.setItem("agrotitan_lang_popup_v3", "seen");
      closeLanguageModal();
      closeLanguageDropdown();
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
          <img src="agrotitan-logo.png" alt="${SHOP.name} logo">
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
    drawerLinks.innerHTML = "";
    Array.from(menu.querySelectorAll("a")).forEach(link => {
      const clone = link.cloneNode(true);
      clone.classList.add("drawer-link");
      clone.addEventListener("click", closeMobileDrawer);
      drawerLinks.appendChild(clone);
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
    {role:"bot", text:"Hello, I am the AgroTitan AI Assistant."},
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
  window.addEventListener("load", () => {
    setTimeout(() => {
      const intro = document.getElementById("introLogo");
      if(intro) intro.style.display = "none";
    }, 3400);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fillSharedContent();
  initIntroLogo();
  initGlassHeader();
  enhanceHeader();
  initLanguageSelector();
  updateBadges();
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
