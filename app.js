/* ==========================================
   OK Varanasi - Core Application Logic
   ========================================== */


   // Theme mode: dark / light
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

// Apply saved theme on page load
function applySavedTheme() {
  const savedTheme = localStorage.getItem("okvaranasi-theme") || "dark";

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (themeIcon) themeIcon.className = "fa-solid fa-sun";
  } else {
    document.body.classList.remove("light-mode");
    if (themeIcon) themeIcon.className = "fa-solid fa-moon";
  }
}

applySavedTheme();

// Toggle theme
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const isLight = document.body.classList.contains("light-mode");
    localStorage.setItem("okvaranasi-theme", isLight ? "light" : "dark");

    if (themeIcon) {
      themeIcon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
  });
}

// 1. Data Store (Places, Listings, Food)
const PLACES_DATA = [
  {
    id: "dashashwamedh",
    name: "Dashashwamedh Ghat",
    category: "ghats",
    image: "assets/Dashashwamedh Ghat.png",
    rating: 4.9,
    reviews: 12450,
    time: "24 Hours (Aarti: 6:30 PM)",
    fee: "Free",
    location: "Dashashwamedh Ghat Rd, Varanasi",
    dressCode: "Modest and respectful clothing recommended. Keep shoulders and knees covered.",
    desc: "Dashashwamedh Ghat is the main and oldest ghat in Varanasi, located on the Ganges. It is famous for its spectacular Daily Ganga Aarti ceremony performed by young priests. According to Hindu mythology, Lord Brahma created it to welcome Lord Shiva.",
    guide: "Arrive at least 45 minutes before sunset to secure a good sitting spot on the steps or hire a shared boat to witness the Aarti from the river."
  },
  {
    id: "kashi-vishwanath",
    name: "Kashi Vishwanath Temple",
    category: "temples",
    image: "assets/kashi-vishwanath-temple.png",
    rating: 4.8,
    reviews: 24800,
    time: "4:00 AM - 11:00 PM",
    fee: "Free (VIP/Special darshan passes available)",
    location: "Lahori Tola, Varanasi",
    dressCode: "Traditional Indian attire required. Western clothes (shorts, sleeveless tops) are not allowed in the inner sanctum.",
    desc: "Kashi Vishwanath Temple is one of the most famous Hindu temples dedicated to Lord Shiva. It stands on the western bank of the holy river Ganges, and is one of the twelve Jyotirlingas, the holiest of Shiva temples. The temple's dome is plated with over 800 kg of pure gold.",
    guide: "Cell phones, cameras, leather items (belts, wallets), and large bags are strictly prohibited inside. Use the secure locker facilities available outside the temple entrance."
  },
  {
    id: "assi-ghat",
    name: "Assi Ghat",
    category: "ghats",
    image: "assets/varanasi_ghats.png",
    rating: 4.7,
    reviews: 8900,
    time: "24 Hours",
    fee: "Free",
    location: "Shivala, Varanasi",
    dressCode: "Casual, respectful attire.",
    desc: "Assi Ghat is the southernmost ghat in Varanasi, situated at the confluence of the Ganges and Assi rivers. It is the hub for pilgrims, students, and travelers. Famous for hosting the daily morning ceremony 'Subah-e-Banaras' which includes sunrise yoga, Vedic chants, and classical music.",
    guide: "Visit early at 5:00 AM to experience the serene morning rituals, and stay for a hot cup of lemon tea or local kachoris sold nearby."
  },
  {
    id: "sarnath",
    name: "Sarnath Buddhist Site",
    category: "historical",
    image: "assets/sarnath.png",
    rating: 4.8,
    reviews: 6200,
    time: "6:00 AM - 6:00 PM",
    fee: "₹20 (Indians), ₹300 (Foreigners)",
    location: "Sarnath, Varanasi (10 km from city center)",
    dressCode: "Casual",
    desc: "Sarnath is one of the four most sacred Buddhist pilgrimage sites in the world. It is where Gautama Buddha first taught the Dharma after attaining enlightenment under the Bodhi tree. It features the massive Dhamek Stupa, Ashoka Pillar, and a world-class archaeological museum.",
    guide: "The archaeological museum is closed on Fridays. Hire a local certified guide to understand the rich inscriptions and historical relics."
  },
  {
    id: "manikarnika-ghat",
    name: "Manikarnika Ghat",
    category: "ghats",
    image: "assets/manikanika.png",
    rating: 4.6,
    reviews: 4300,
    time: "24 Hours",
    fee: "Free",
    location: "Near Chowk, Varanasi",
    dressCode: "Strictly sober dress code. Photography is strictly forbidden.",
    desc: "Manikarnika is the primary cremation ghat in Varanasi. In Hinduism, it is believed that a soul cremated here achieves Moksha (salvation) and breaks the cycle of rebirth. The funeral pyres burn continuously 24/7.",
    guide: "Always maintain strict silence and respectful distance. Do not take photos or videos out of respect for grieving families. Beware of local touts claiming to collect 'wood donations'."
  },
  {
    id: "ramnagar-fort",
    name: "Ramnagar Fort & Museum",
    category: "historical",
    image: "assets/ramnagar_fort.png",
    rating: 4.3,
    reviews: 3100,
    time: "10:00 AM - 5:00 PM",
    fee: "₹50 (Adults), ₹150 (Foreigners)",
    location: "Ramnagar, Varanasi (Opposite Tulsi Ghat)",
    dressCode: "Casual",
    desc: "Located on the eastern bank of the Ganges, this 18th-century sandstone fortress is the ancestral home of the Maharaja of Banaras. It features an eccentric museum housing vintage American cars, gold-embroidered palanquins, ancient weapons, and a rare astrological clock.",
    guide: "Cross the bridge or take a scenic motorboat ride from Dashashwamedh Ghat to reach the fort. The sunset views of the ghats from the fort ramparts are outstanding."
  }
];

const INITIAL_DIRECTORY = [
  {
    id: "heritage-hospitals",
    name: "Heritage Hospitals",
    category: "hospitals",
    tag: "Multi Speciality Hospital",
    rating: 4.6,
    reviewsCount: 8241,
    phone: "+91 542 7181911",
    email: "info@heritagehospitals.com",
    address: "Lanka, Varanasi, Uttar Pradesh 221005",
    desc: "One of the leading NABH accredited multi-speciality hospitals in Varanasi offering advanced healthcare, emergency care, diagnostics and super speciality services."
},
{
    id: "sir-sunderlal-hospital",
    name: "Sir Sunderlal Hospital (BHU)",
    category: "hospitals",
    tag: "Government Teaching Hospital",
    rating: 4.5,
    reviewsCount: 5000,
    phone: "+91 542 2368547",
    email: "",
    address: "Banaras Hindu University (BHU), Lanka, Varanasi, Uttar Pradesh 221005",
    desc: "Premier government teaching hospital under Banaras Hindu University providing affordable tertiary healthcare and trauma services."
},
{
    id: "popular-hospital",
    name: "Popular Hospital",
    category: "hospitals",
    tag: "Multi Speciality Hospital",
    rating: 4.4,
    reviewsCount: 4229,
    phone: "+91 7800001896",
    email: "",
    address: "A-2, N-10/60, DLW Road, Near Flyover, Bajardiha, Varanasi, Uttar Pradesh 221004",
    desc: "Well-known private multi-speciality hospital providing emergency, ICU, diagnostics, surgery and specialist medical services."
},
// {
//     id: "galaxy-hospital",
//     name: "Galaxy Hospital",
//     category: "hospitals",
//     tag: "Private Multi Speciality Hospital",
//     rating: 3.9,
//     reviewsCount: 1240,
//     phone: "+91 8874205817",
//     email: "",
//     address: "4,5,6,7 Dayal Enclave, Mahmoorganj Road, Near Railway Station, Mahmoorganj, Varanasi, Uttar Pradesh 221010",
//     desc: "Modern multi-speciality hospital offering emergency care, surgery, diagnostics and specialist consultations."
// },

];

const FOOD_SHOWCASE_DATA = {
  lassi: {
    title: "Banarasi Makkhani Lassi",
    desc: "Creamy yogurt whisked to perfection, served in eco-friendly clay pots (kulhads), loaded with malai (cream), dry fruits, and aromatic saffron syrup.",
    img: "assets/varanasi_food.png"
  },
  chaat: {
    title: "Kashi Tamatar Chaat",
    desc: "Varanasi's custom creation: Spicy mashed tomatoes, boiled potatoes, loaded with local spices, ghee, lemon juice, and topped with crispy sev and sugar syrup.",
    img: "assets/varanasi_chaat.png"
  },
  kachori: {
    title: "Kachori Sabzi & Jalebi",
    desc: "Crispy lentil-stuffed kachoris served with a spicy potato curry (aaloo ki sabzi) seasoned with asafoetida, paired with hot, crispy, syrup-loaded jalebis.",
    img: "assets/varanasi_kachori.png"
  },
  paan: {
    title: "Banarasi Paan",
    desc: "Betel leaf folded with gulkand (rose petal preserve), sweet fennel, grated coconut, dates, and select herbs. An iconic post-meal custom celebrated in songs.",
    img: "assets/varanasi_paan.png"
  }
};

// 2. Application State & Elements
let currentPlaces = [...PLACES_DATA];
let currentDirectory = [];

/* ==========================================
   DIRECTORY DATA INITIALIZATION
   ========================================== */

// Always load the latest data from app.js
currentDirectory = [...INITIAL_DIRECTORY];

// Optional: keep a copy in LocalStorage (for debugging)
localStorage.setItem(
  "okvaranasi_listings",
  JSON.stringify(currentDirectory)
);

// Dom Elements
const header = document.getElementById("main-header");
const navMenu = document.getElementById("nav-menu");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const quickSearchTrigger = document.getElementById("quick-search-trigger");

const placesGrid = document.getElementById("places-grid");
const placesFilterBtns = document.querySelectorAll(".places-filters .filter-btn");

const foodItems = document.querySelectorAll(".food-item");
const foodShowcaseImg = document.getElementById("food-showcase-img");
const foodShowcaseTitle = document.getElementById("food-showcase-title");
const foodShowcaseDesc = document.getElementById("food-showcase-desc");

const directoryGrid = document.getElementById("directory-grid");
const dirSearchInput = document.getElementById("dir-search-input");
const dirFilterBtns = document.querySelectorAll(".dir-filter-btn");
const listBusinessBtnNav = document.getElementById("list-business-btn-nav");
const listBusinessBtnMobile = document.getElementById("list-business-btn-mobile");

const mainSearchInput = document.getElementById("main-search-input");
const mainSearchBtn = document.getElementById("main-search-btn");

// Modals
const placeDetailModal = document.getElementById("place-detail-modal");
const placeModalClose = document.getElementById("place-modal-close");
const placeModalTitle = document.getElementById("place-modal-title");
const placeModalBody = document.getElementById("place-modal-body");

const addBusinessModal = document.getElementById("add-business-modal");
const businessModalClose = document.getElementById("business-modal-close");
const addBusinessForm = document.getElementById("add-business-form");

// Counter & Toast
const activeBusinessesCounter = document.getElementById("active-businesses-counter");
const toastNotify = document.getElementById("toast-notify");
const toastText = document.getElementById("toast-text");

// Contact Us & Newsletter Form
const contactForm = document.getElementById("contact-us-form");
const newsletterForm = document.getElementById("newsletter-form");

// 3. Event Listeners & Core Initialization
window.addEventListener("DOMContentLoaded", () => {
  renderPlaces("all");
  renderDirectory("all");
  updateCounters();
});

// Window Scroll effect for Header
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  const icon = mobileMenuToggle.querySelector("i");
  if (navMenu.classList.contains("active")) {
    icon.className = "fa-solid fa-xmark";
  } else {
    icon.className = "fa-solid fa-bars";
  }
});

// Close mobile menu on link click
document.querySelectorAll(".nav-item a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileMenuToggle.querySelector("i").className = "fa-solid fa-bars";
  });
});

// Quick Search and Hero Search mechanics
quickSearchTrigger.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  mainSearchInput.focus();
});

mainSearchBtn.addEventListener("click", performGlobalSearch);
mainSearchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") performGlobalSearch();
});

// Food Trail Click events
foodItems.forEach(item => {
  item.addEventListener("click", () => {
    foodItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    
    const foodKey = item.getAttribute("data-food");
    const data = FOOD_SHOWCASE_DATA[foodKey];
    if (data) {
      foodShowcaseImg.src = data.img;
      foodShowcaseTitle.textContent = data.title;
      foodShowcaseDesc.textContent = data.desc;
    }
  });
});

// Places Filter Button Event Listeners
placesFilterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    placesFilterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderPlaces(btn.getAttribute("data-filter"));
  });
});

// Directory Filter Button Event Listeners
dirFilterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    dirFilterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderDirectory(btn.getAttribute("data-category"), dirSearchInput.value);
  });
});

dirSearchInput.addEventListener("input", () => {
  const activeCategoryBtn = document.querySelector(".dir-filter-btn.active");
  const cat = activeCategoryBtn ? activeCategoryBtn.getAttribute("data-category") : "all";
  renderDirectory(cat, dirSearchInput.value);
});

// Modals Triggers
listBusinessBtnNav.addEventListener("click", () => openModal(addBusinessModal));
if (listBusinessBtnMobile) {
  listBusinessBtnMobile.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileMenuToggle.querySelector("i").className = "fa-solid fa-bars";
    openModal(addBusinessModal);
  });
}
businessModalClose.addEventListener("click", () => closeModal(addBusinessModal));
placeModalClose.addEventListener("click", () => closeModal(placeDetailModal));

// Close Modals on Outer Overlay click
window.addEventListener("click", (e) => {
  if (e.target === addBusinessModal) closeModal(addBusinessModal);
  if (e.target === placeDetailModal) closeModal(placeDetailModal);
});

// Form Submissions
addBusinessForm.addEventListener("submit", handleAddBusiness);
contactForm.addEventListener("submit", handleContactSubmit);
newsletterForm.addEventListener("submit", handleNewsletterSubmit);

// Custom Event cards modal view
document.querySelectorAll(".event-card").forEach(card => {
  card.addEventListener("click", () => {
    const eventType = card.getAttribute("data-event");
    let content = "";
    
    if (eventType === "ganga-aarti") {
      content = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <img src="assets/varanasi_hero.png" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px;" alt="Ganga Aarti">
        </div>
        <p style="margin-bottom: 1rem;"><strong>Daily Timing:</strong> 6:30 PM - 7:30 PM (Sunset)</p>
        <p style="margin-bottom: 1rem;"><strong>Venue:</strong> Dashashwamedh Ghat, Varanasi</p>
        <p style="margin-bottom: 1rem;">The daily Aarti starts with the blowing of a conch shell (shankha), followed by the waving of multi-tiered brass lamps in synchronized motions by young priests clad in traditional dhotis and kurtas.</p>
        <p><strong>Travel Tip:</strong> For the best viewing angle, hire a wooden rowboat (negotiate rates around ₹200-₹300 per person) or occupy a spot on the ghat steps by 5:30 PM.</p>
      `;
      openPlaceModal("Maha Ganga Aarti Guide", content);
    } else if (eventType === "dev-deepawali") {
      content = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <img src="assets/varanasi_ghats.png" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px;" alt="Dev Deepawali">
        </div>
        <p style="margin-bottom: 1rem;"><strong>Upcoming Date:</strong> November 15, 2026</p>
        <p style="margin-bottom: 1rem;"><strong>Venue:</strong> All 84 Ghats of Varanasi</p>
        <p style="margin-bottom: 1rem;">Dev Deepawali is a festival celebrated on Kartik Poornima. The steps of all the ghats are illuminated with more than a million clay lamps (diyas). It is believed that gods descend to earth to bathe in the Ganga on this day.</p>
        <p><strong>Note:</strong> Hotels book out 6-8 months in advance for this event. Streets are closed for vehicular traffic, and boating bookings are strictly regulated.</p>
      `;
      openPlaceModal("Dev Deepawali Festival Guide", content);
    } else if (eventType === "mahashivratri") {
      content = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <img src="assets/varanasi_hero.png" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px;" alt="Mahashivratri">
        </div>
        <p style="margin-bottom: 1rem;"><strong>Timing:</strong> Late Winter / Early Spring (Feb/Mar)</p>
        <p style="margin-bottom: 1rem;"><strong>Venue:</strong> Kashi Vishwanath Temple and old lanes</p>
        <p style="margin-bottom: 1rem;">Maha Shivratri celebrates the wedding anniversary of Lord Shiva and Goddess Parvati. A grand carnival procession ('Shiv Baraat') featuring devotees dressed as spirits, ascetics, and deities moves through the town.</p>
        <p><strong>Travel Tip:</strong> Expect dense crowds around the old city. It is the best day to experience the spiritual frenzy of local Shiva devotees.</p>
      `;
      openPlaceModal("Maha Shivratri Carnival Guide", content);
    }
  });
});

// Guide actions
document.getElementById("read-guide-spiritual").addEventListener("click", () => {
  const content = `
    <h3 style="color: var(--color-marigold); margin-bottom: 1rem;">24-Hour Spiritual Trail Blueprint</h3>
    <p style="margin-bottom: 1rem;">Follow this structured route to witness the complete spiritual pulse of the ancient city:</p>
    <div style="display: flex; flex-direction: column; gap: 1rem; border-left: 2px solid var(--color-cyan-glow); padding-left: 1.5rem; margin-bottom: 1.5rem;">
      <div>
        <h4 style="color: var(--color-white);">05:00 AM - Sunrise and Vedic Chanting</h4>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">Head to Assi Ghat for Subah-e-Banaras. Witness prayers, morning yajna, and live sitar performance as the sun rises over the river.</p>
      </div>
      <div>
        <h4 style="color: var(--color-white);">08:30 AM - The Golden Temple Walk</h4>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">Navigate the narrow chowk lanes to seek blessings at Kashi Vishwanath Temple. Grab a classic breakfast of Kachori Sabzi nearby.</p>
      </div>
      <div>
        <h4 style="color: var(--color-white);">01:30 PM - Sarnath Sanctuary</h4>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">Take an auto-rickshaw to Sarnath. Quietly meditate near Dhamek Stupa where Lord Buddha delivered his first sermon.</p>
      </div>
      <div>
        <h4 style="color: var(--color-white);">05:30 PM - Evening Aarti Boat Ride</h4>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">Board a wooden boat from Assi Ghat or Dashashwamedh Ghat to view the glorious sunset and the dramatic fires of Ganga Aarti from the river.</p>
      </div>
    </div>
    <p><em>Need a custom tour guide? Check out certified local guides listed under the Directory section.</em></p>
  `;
  openPlaceModal("Spiritual Itinerary Details", content);
});

document.getElementById("read-guide-culinary").addEventListener("click", () => {
  const content = `
    <h3 style="color: var(--color-marigold); margin-bottom: 1rem;">Banaras Foodie's Pilgrimage Checklist</h3>
    <p style="margin-bottom: 1rem;">Savor these quintessential delicacies that make Banaras a street-food paradise:</p>
    <div style="display: flex; flex-direction: column; gap: 1.2rem; border-left: 2px solid var(--color-marigold); padding-left: 1.5rem; margin-bottom: 1.5rem;">
      <div>
        <h4 style="color: var(--color-white);">1. Ram Bhandar, Kachori Gali</h4>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">Order: Badi Kachori (spicy potato curry) & freshly fried, dripping jalebis. Serving stops by 11:30 AM.</p>
      </div>
      <div>
        <h4 style="color: var(--color-white);">2. Blue Lassi Shop, Chowk</h4>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">Order: Pomegranate-Coconut Lassi or Mango-Malai Lassi served in clay cups with historical photographs on the shop walls.</p>
      </div>
      <div>
        <h4 style="color: var(--color-white);">3. Deena Chat Bhandar, Dashashwamedh</h4>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">Order: Tamatar Chaat and Palak Patta Chaat. Ask for mild spice if you're not used to fiery chili!</p>
      </div>
      <div>
        <h4 style="color: var(--color-white);">4. Keshav Tambul, Ravidas Gate</h4>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">Order: Meetha (Sweet) Banarasi Paan to close the foodie day in Kashi style.</p>
      </div>
    </div>
  `;
  openPlaceModal("Culinary Route Details", content);
});


// 4. Utility Functions

// Dynamic Places Render
function renderPlaces(filter = "all") {
  placesGrid.innerHTML = "";
  
  const filtered = filter === "all" 
    ? PLACES_DATA 
    : PLACES_DATA.filter(p => p.category === filter);
    
  if (filtered.length === 0) {
    placesGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted);">No locations found matching this filter.</div>`;
    return;
  }
  
  filtered.forEach(place => {
    const card = document.createElement("div");
    card.className = "place-card";
    card.innerHTML = `
      <div class="place-image-wrapper">
        <img src="${place.image}" alt="${place.name}">
        <span class="place-category-badge">${place.category.toUpperCase()}</span>
      </div>
      <div class="place-info">
        <h3>${place.name}</h3>
        <p class="place-description">${place.desc}</p>
        <div class="place-meta">
          <span><i class="fa-regular fa-clock"></i> ${place.time}</span>
          <span><i class="fa-solid fa-star" style="color: var(--color-gold);"></i> ${place.rating}</span>
        </div>
      </div>
    `;
    
    // Clicking card opens detailed Modal
    card.addEventListener("click", () => {
      const modalHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <img src="${place.image}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 12px;" alt="${place.name}">
        </div>
        <p style="margin-bottom: 1.2rem; line-height: 1.7; font-size: 1.05rem; color: var(--color-text-light);">${place.desc}</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; background: rgba(255,255,255,0.02); padding: 1.2rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
          <p style="margin: 0;"><strong>Timings:</strong><br>${place.time}</p>
          <p style="margin: 0;"><strong>Entry Fee:</strong><br>${place.fee}</p>
          <p style="margin: 0; grid-column: 1 / -1; margin-top: 0.5rem;"><strong>Location:</strong><br><i class="fa-solid fa-location-dot" style="color: var(--color-cyan-glow);"></i> ${place.location}</p>
        </div>
        
        <div style="background: rgba(255,107,8,0.05); border-left: 3px solid var(--color-saffron); padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <h4 style="color: var(--color-white); margin-bottom: 0.3rem;"><i class="fa-solid fa-shirt"></i> Dress Code & Guidelines</h4>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); margin: 0;">${place.dressCode}</p>
        </div>
        
        <div style="background: rgba(0,242,254,0.05); border-left: 3px solid var(--color-cyan-glow); padding: 1rem; border-radius: 0 8px 8px 0;">
          <h4 style="color: var(--color-white); margin-bottom: 0.3rem;"><i class="fa-regular fa-lightbulb"></i> Insiders Guide</h4>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); margin: 0;">${place.guide}</p>
        </div>
      `;
      openPlaceModal(place.name, modalHTML);
    });
    
    placesGrid.appendChild(card);
  });
}

// Dynamic Directory Render
function renderDirectory(category = "all", searchQuery = "") {
  directoryGrid.innerHTML = "";
  
  let filtered = category === "all"
    ? currentDirectory
    : currentDirectory.filter(item => item.category === category);
    
  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.tag.toLowerCase().includes(q) || 
      item.desc.toLowerCase().includes(q) ||
      item.address.toLowerCase().includes(q)
    );
  }
  
  if (filtered.length === 0) {
    directoryGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 3rem 0;">
        <i class="fa-regular fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem; display: block; color: var(--color-cyan-glow);"></i>
        No registered businesses found matching your criteria. Be the first to list yours!
      </div>
      <div class="directory-cta-card">
        <h3>Promote Your Local Business</h3>
        <p>Register your hotel, restaurant, guide service, or shop on OK Varanasi. Connect with global travelers visiting Kashi.</p>
        <button class="btn btn-primary" id="list-business-btn-inside">
          <i class="fa-solid fa-plus"></i> List Your Business Now
        </button>
      </div>
    `;
    
    // Add event listener to the dynamically created inner CTA button
    document.getElementById("list-business-btn-inside").addEventListener("click", () => openModal(addBusinessModal));
    return;
  }
  
  filtered.forEach(biz => {
    const card = document.createElement("div");
    card.className = "directory-card";
    
    // Assign category icons
    let categoryIcon = "fa-store";
    if (biz.category === "hotels") categoryIcon = "fa-hotel";
    if (biz.category === "food") categoryIcon = "fa-utensils";
    if (biz.category === "handlooms") categoryIcon = "fa-shirt";
    if (biz.category === "guides") categoryIcon = "fa-route";
    if (biz.category === "wellness") categoryIcon = "fa-hands-praying";
    
    card.innerHTML = `
      <div class="directory-card-header">
        <div class="directory-icon">
          <i class="fa-solid ${categoryIcon}"></i>
        </div>
        <div class="directory-rating">
          <i class="fa-solid fa-star"></i> ${biz.rating.toFixed(1)}
        </div>
      </div>
      <h3>${biz.name}</h3>
      <span class="directory-tag">${biz.tag}</span>
      <p>${biz.desc}</p>
      
      <div class="directory-contact-info">
        <span><i class="fa-solid fa-location-dot"></i> ${biz.address}</span>
        <span><i class="fa-solid fa-phone"></i> ${biz.phone}</span>
        ${biz.email ? `<span><i class="fa-solid fa-envelope"></i> ${biz.email}</span>` : ""}
      </div>
    `;
    directoryGrid.appendChild(card);
  });
  
  // Append listing CTA box at the bottom of the grid
  const ctaCard = document.createElement("div");
  ctaCard.className = "directory-cta-card";
  ctaCard.innerHTML = `
    <h3>Promote Your Local Business</h3>
    <p>Register your hotel, restaurant, guide service, or shop on OK Varanasi. Connect with global travelers visiting Kashi.</p>
    <button class="btn btn-primary" id="list-business-btn-bottom">
      <i class="fa-solid fa-plus"></i> List Your Business Now
    </button>
  `;
  directoryGrid.appendChild(ctaCard);
  
  document.getElementById("list-business-btn-bottom").addEventListener("click", () => openModal(addBusinessModal));
}

// Global search handling
function performGlobalSearch() {
  const query = mainSearchInput.value.trim().toLowerCase();
  if (query === "") return;
  
  // 1. Scroll to the most relevant section based on search query
  if (query.includes("hotel") || query.includes("stay") || query.includes("restaurant") || query.includes("weaver") || query.includes("saree") || query.includes("shop") || query.includes("tour")) {
    document.getElementById("directory").scrollIntoView({ behavior: "smooth" });
    dirSearchInput.value = mainSearchInput.value;
    renderDirectory("all", mainSearchInput.value);
    showToast("Displaying matching business listings");
  } else if (query.includes("food") || query.includes("lassi") || query.includes("chaat") || query.includes("kachori") || query.includes("paan")) {
    document.getElementById("food").scrollIntoView({ behavior: "smooth" });
    showToast("Displaying street food options");
    // Trigger relevant food item click
    let foodKey = "lassi";
    if (query.includes("chaat")) foodKey = "chaat";
    if (query.includes("kachori")) foodKey = "kachori";
    if (query.includes("paan")) foodKey = "paan";
    document.querySelector(`.food-item[data-food="${foodKey}"]`).click();
  } else {
    // Default search targets Places
    document.getElementById("places").scrollIntoView({ behavior: "smooth" });
    
    // Filter places dynamically
    placesGrid.innerHTML = "";
    const matches = PLACES_DATA.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.desc.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    );
    
    if (matches.length > 0) {
      matches.forEach(place => {
        // Create place card (same template as renderPlaces)
        const card = document.createElement("div");
        card.className = "place-card";
        card.innerHTML = `
          <div class="place-image-wrapper">
            <img src="${place.image}" alt="${place.name}">
            <span class="place-category-badge">${place.category.toUpperCase()}</span>
          </div>
          <div class="place-info">
            <h3>${place.name}</h3>
            <p class="place-description">${place.desc}</p>
            <div class="place-meta">
              <span><i class="fa-regular fa-clock"></i> ${place.time}</span>
              <span><i class="fa-solid fa-star" style="color: var(--color-gold);"></i> ${place.rating}</span>
            </div>
          </div>
        `;
        card.addEventListener("click", () => {
          // Open Modal (same template)
          const modalHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
              <img src="${place.image}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 12px;" alt="${place.name}">
            </div>
            <p style="margin-bottom: 1.2rem; line-height: 1.7; font-size: 1.05rem;">${place.desc}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; background: rgba(255,255,255,0.02); padding: 1.2rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
              <p style="margin: 0;"><strong>Timings:</strong><br>${place.time}</p>
              <p style="margin: 0;"><strong>Entry Fee:</strong><br>${place.fee}</p>
              <p style="margin: 0; grid-column: 1 / -1; margin-top: 0.5rem;"><strong>Location:</strong><br><i class="fa-solid fa-location-dot" style="color: var(--color-cyan-glow);"></i> ${place.location}</p>
            </div>
            <div style="background: rgba(255,107,8,0.05); border-left: 3px solid var(--color-saffron); padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
              <h4 style="color: var(--color-white); margin-bottom: 0.3rem;"><i class="fa-solid fa-shirt"></i> Dress Code & Guidelines</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted); margin: 0;">${place.dressCode}</p>
            </div>
            <div style="background: rgba(0,242,254,0.05); border-left: 3px solid var(--color-cyan-glow); padding: 1rem; border-radius: 0 8px 8px 0;">
              <h4 style="color: var(--color-white); margin-bottom: 0.3rem;"><i class="fa-regular fa-lightbulb"></i> Insiders Guide</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted); margin: 0;">${place.guide}</p>
            </div>
          `;
          openPlaceModal(place.name, modalHTML);
        });
        placesGrid.appendChild(card);
      });
      showToast(`Found ${matches.length} matching places!`);
    } else {
      placesGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 3rem 0;">
          No direct matches found in tourist spots. Try resetting filters.
        </div>
      `;
      showToast("No matches found in attractions.");
    }
  }
}

// Modal Toggle helpers
function openModal(modal) {
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // disable scroll
}

function closeModal(modal) {
  modal.classList.remove("active");
  document.body.style.overflow = ""; // enable scroll
}

function openPlaceModal(title, bodyHTML) {
  placeModalTitle.textContent = title;
  placeModalBody.innerHTML = bodyHTML;
  openModal(placeDetailModal);
}

// Add Business Form handler
function handleAddBusiness(e) {
  e.preventDefault();
  
  const bizName = document.getElementById("biz-name").value.trim();
  const bizCat = document.getElementById("biz-category").value;
  const bizTag = document.getElementById("biz-tag").value.trim();
  const bizPhone = document.getElementById("biz-phone").value.trim();
  const bizEmail = document.getElementById("biz-email").value.trim();
  const bizAddress = document.getElementById("biz-address").value.trim();
  const bizDesc = document.getElementById("biz-desc").value.trim();
  
  if (!bizName || !bizCat || !bizTag || !bizPhone || !bizAddress || !bizDesc) {
    showToast("Please fill in all required fields marked with *");
    return;
  }
  
  const newListing = {
    id: "biz-" + Date.now(),
    name: bizName,
    category: bizCat,
    tag: bizTag,
    rating: 5.0, // default new listing rating
    reviewsCount: 1,
    phone: bizPhone,
    email: bizEmail || "not provided",
    address: bizAddress,
    desc: bizDesc
  };
  
  currentDirectory.unshift(newListing);

currentDirectory.unshift(newListing);

// Temporary (Development Mode)
// After integrating PHP, send this data to your PHP API instead.
renderDirectory(currentCategory, dirSearchInput.value);
updateCounters();
  
  // Reset Form and close modal
  addBusinessForm.reset();
  closeModal(addBusinessModal);
  
  // Refresh rendering
  const activeCategoryBtn = document.querySelector(".dir-filter-btn.active");
  const currentCategory = activeCategoryBtn ? activeCategoryBtn.getAttribute("data-category") : "all";
  renderDirectory(currentCategory, dirSearchInput.value);
  updateCounters();
  
  showToast(`Congratulations! "${bizName}" was listed successfully.`);
}

// Contact Us Form submit
function handleContactSubmit(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    fetch("api/contact.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {

        if (data.trim() === "success") {

            contactForm.reset();

            showToast("Thank you! Your message has been sent successfully.");

        } else {

            showToast(data);

        }

    })
    .catch(error => {

        console.error(error);

        showToast("Something went wrong. Please try again.");

    });
}
// Newsletter submit
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = newsletterForm.querySelector("input[type='email']").value;
  console.log("Newsletter subscription:", email);
  newsletterForm.reset();
  showToast("Subscribed! Thank you for joining our news list.");
}

// Counters helper
function updateCounters() {
  const count = currentDirectory.length;
  // Dynamic counter update
  if (activeBusinessesCounter) {
    activeBusinessesCounter.querySelector(".stat-number").textContent = `${count}`;
  }
}

// Toast notification trigger
function showToast(message) {
  toastText.textContent = message;
  toastNotify.classList.add("active");
  
  setTimeout(() => {
    toastNotify.classList.remove("active");
  }, 4500);
}


