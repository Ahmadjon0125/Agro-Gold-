const header = document.getElementById("mainHeader");
const toggle = document.getElementById("toggle");

function updateHeader() {

  const isLargeScreen = window.innerWidth >= 1024;

  const HEADER_CLASSES = [
    "backdrop-blur-xl",
    "backdrop-brightness-85",
    "shadow-lg",
    "bg-white/15" 
  ];

  if (window.scrollY > 0) {
    if(isLargeScreen){
      header.classList.add(...HEADER_CLASSES);
      toggle.classList.add('hidden');
    }else{
       header.classList.add(...HEADER_CLASSES);
       toggle.classList.remove('hidden');
    }

  } else {
    header.classList.remove(...HEADER_CLASSES);
    toggle.classList.remove('hidden');
  }
}

// Sahifa scroll bo‘lganda ishlaydi
window.addEventListener("scroll", updateHeader);

// Sahifa to‘liq yuklanganda ham tekshiramiz
window.addEventListener("load", updateHeader);


// language
const langBtn = document.getElementById("langBtn");
const langMenu = document.getElementById("langMenu");
const lanBtnVal = document.getElementById("lanBtnVal");

langBtn.addEventListener("click", () => {
  langMenu.classList.toggle("show");
});

langMenu.addEventListener("click", (e) => {
  lanBtnVal.textContent = e.target.innerText;
  langMenu.classList.toggle("show");
});


// Burger Menu
const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobileNav");
const overlay = document.getElementById("overlay");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  mobileNav.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = burger.classList.contains("active")
    ? "hidden"
    : "";
});

overlay.addEventListener("click", () => {
  burger.classList.remove("active");
  mobileNav.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
});

const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    mobileNav.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// hero Swiper


  const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
 

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  effect: "slide",
  speed: 500,
  
});

// main page gallery fancybox

document.addEventListener('DOMContentLoaded', function () {
    // 1. ASOSIY SPLIDE SLAYDERINI INITSializatsiya qilish
    const mainSplide = new Splide('#gallery-main', {
        type: 'loop',
        pagination: false,
        arrows: true, 
        perPage: 1,
    });
    
    mainSplide.mount();

    // 2. THUMBS RO'YXATIDAN ELEMENTLARNI TANLAB OLISH (Unikal klass: .thumb-item)
    const thumbItems = document.querySelectorAll('.thumb-item');

    // 3. BOSISH HODISASINI ULASH
    thumbItems.forEach(item => {
        item.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-slide-index'));
            
            // Asosiy slayderni tanlangan rasmga o'tkazish
            mainSplide.go(index); 
        });
    });

    // 4. SPLIDE SILJIGANIDA THUMB STILINI YANGILASH
    mainSplide.on('moved', function (newIndex) {
        updateActiveThumb(newIndex);
    });
    
    // Faol rasmni yangilash funksiyasi
    function updateActiveThumb(index) {
    thumbItems.forEach(item => {
        // ✅ Yangi klassni o'chirish
        item.classList.remove('active-line'); 
    });

    const activeItem = thumbItems[index];
    if (activeItem) {
        // ✅ Yangi klassni qo'shish
        activeItem.classList.add('active-line');
    }
}
    
    // Boshlang'ich yuklashda faol rasmni belgilash
    updateActiveThumb(0); 
});


// show More Btn 



    document.addEventListener('DOMContentLoaded', () => {
        // Kerakli elementlarni ID va Klass bo'yicha olish
        const loadMoreBtn = document.getElementById('load-more-btn');
        const cards = document.querySelectorAll('.product-card');
        
        // --- Sozlamalar ---
        const initialVisibleCount = 8;  // Dastlabki ko'rinadigan elementlar soni (4 ta)
        const cardsPerLoad = 4;         // Har bosilganda qo'shiladigan elementlar soni (4 ta)
        let visibleCount = initialVisibleCount;
        // -------------------

        // 1. Dastlabki holatni sozlash: Faqat dastlabki 4 ta elementni ko'rsatish
        const initializeCards = () => {
            cards.forEach((card, index) => {
                // initialVisibleCount dan keyingilarni yashiramiz
                if (index >= initialVisibleCount) {
                    // hidden klassini qo'shamiz
                    card.classList.add('hidden'); 
                }
            });
            
            // Agar barcha elementlar ko'rinadigan bo'lsa (jami 4 ta bo'lsa), tugmani yashirish
            if (cards.length <= initialVisibleCount) {
                if(loadMoreBtn) {
                   loadMoreBtn.style.display = 'none';
                }
            }
        };

        // 2. Kartochkalarni qo'shish funksiyasi (tugma bosilganda)
        const loadMoreCards = (e) => {
            e.preventDefault();
            
            let cardsShown = 0;
            
            // visibleCount dan boshlab, keyingi 4 ta kartochkani ko'rsatamiz
            for (let i = visibleCount; i < cards.length && cardsShown < cardsPerLoad; i++) {
                // 'hidden' klassini olib tashlaymiz
                cards[i].classList.remove('hidden'); 
                cardsShown++;
            }
            
            visibleCount += cardsShown; // Ko'rinadigan elementlar sonini yangilaymiz

            // Agar barcha kartochkalar ko'rsatilgan bo'lsa, tugmani yashiramiz
            if (visibleCount >= cards.length) {
                if(loadMoreBtn) {
                    loadMoreBtn.style.display = 'none';
                }
            }
        };

        // Dasturni ishga tushirish
        initializeCards();

        // Tugma hodisasini ulash
        if(loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreCards);
        }
    });



    document.addEventListener('DOMContentLoaded', function() {
        const newsItems = document.querySelectorAll('.news-item');
        const loadMoreBtn = document.getElementById('load-more');
        const itemsPerLoad = 3; // Har bosilganda yuklanadigan elementlar soni
        let currentItemIndex = 0; // Yuklashni 0-elementdan boshlaymiz

        // Elementni ko'rinadigan qilish uchun funksiya
        function showItem(item) {
            // display: none ni bekor qilish. Grid itemlari odatda display: block bo'ladi
            item.style.display = 'block'; 
        }

        // Yuklash funksiyasi
        function loadMoreItems() {
            const endIndex = currentItemIndex + itemsPerLoad;
            let loadedCount = 0;

            for (let i = currentItemIndex; i < endIndex && i < newsItems.length; i++) {
                showItem(newsItems[i]);
                loadedCount++;
            }
            
            currentItemIndex = endIndex;
            updateButtonVisibility();
        }

        // Tugmani boshqarish funksiyasi
        function updateButtonVisibility() {
            if (currentItemIndex >= newsItems.length) {
                // Barcha yangiliklar yuklangan bo'lsa, tugmani yashiramiz
                loadMoreBtn.style.display = 'none'; 
            } else {
                loadMoreBtn.style.display = 'inline-block';
            }
        }

        // Sahifa yuklanganda:
        // 1. Dastlabki 3 ta elementni yuklash
        loadMoreItems();

        // 2. Tugmaga hodisa tinglovchisini qo'shish
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreItems);
        }
    });
