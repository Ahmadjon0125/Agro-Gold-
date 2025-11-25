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
  //  var swiper = new Swiper(".mySwiper", {
  //     spaceBetween: 30,
  //     pagination: {
  //       el: ".swiper-pagination",
  //       clickable: true,
  //     },
  //   });

  const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  // autoplay: {
  //   delay: 15000,
  // },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  effect: "slide",
  speed: 500,
  
});