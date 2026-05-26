/* =========================================================
   SAURASHTRA DAIRY
   SLIDER + DOTS + SWIPE + NAVBAR
========================================================= */

/* =========================================================
   SLIDER ELEMENTS
========================================================= */

const slides = document.querySelectorAll(".sd-slide");

const dotsContainer = document.querySelector(".sd-dots");

const prevBtn = document.querySelector(".sd-prev");

const nextBtn = document.querySelector(".sd-next");

const slider = document.querySelector(".sd-slider");

/* =========================================================
   NAVBAR ELEMENTS
========================================================= */

const sdMenuBtn = document.getElementById("sdMenuBtn");

const sdCurtainMenu = document.getElementById("sdCurtainMenu");

/* =========================================================
   VARIABLES
========================================================= */

let currentSlide = 0;

let autoSlide;

let startX = 0;

let endX = 0;

/* =========================================================
   CREATE DOTS
========================================================= */

slides.forEach((slide, index) => {

  const dot = document.createElement("div");

  dot.classList.add("sd-dot");

  if(index === 0){

    dot.classList.add("active");

  }

  /* DOT CLICK */

  dot.addEventListener("click", () => {

    goToSlide(index);

    resetAutoSlide();

  });

  dotsContainer.appendChild(dot);

});

/* GET ALL DOTS */

const dots = document.querySelectorAll(".sd-dot");

/* =========================================================
   GO TO SLIDE
========================================================= */

function goToSlide(index){

  /* REMOVE ACTIVE */

  slides.forEach((slide) => {

    slide.classList.remove("active");

  });

  dots.forEach((dot) => {

    dot.classList.remove("active");

  });

  /* ADD ACTIVE */

  slides[index].classList.add("active");

  dots[index].classList.add("active");

  /* UPDATE CURRENT */

  currentSlide = index;

}

/* =========================================================
   NEXT SLIDE
========================================================= */

function nextSlide(){

  currentSlide++;

  if(currentSlide >= slides.length){

    currentSlide = 0;

  }

  goToSlide(currentSlide);

}

/* =========================================================
   PREVIOUS SLIDE
========================================================= */

function prevSlide(){

  currentSlide--;

  if(currentSlide < 0){

    currentSlide = slides.length - 1;

  }

  goToSlide(currentSlide);

}

/* =========================================================
   BUTTON EVENTS
========================================================= */

if(nextBtn){

  nextBtn.addEventListener("click", () => {

    nextSlide();

    resetAutoSlide();

  });

}

if(prevBtn){

  prevBtn.addEventListener("click", () => {

    prevSlide();

    resetAutoSlide();

  });

}

/* =========================================================
   AUTO SLIDE
========================================================= */

function startAutoSlide(){

  autoSlide = setInterval(() => {

    nextSlide();

  }, 4000);

}

function resetAutoSlide(){

  clearInterval(autoSlide);

  startAutoSlide();

}

/* START */

if(slides.length > 0){

  startAutoSlide();

}

/* =========================================================
   SWIPE SUPPORT
========================================================= */

if(slider){

  slider.addEventListener("touchstart", (e) => {

    startX = e.touches[0].clientX;

  });

  slider.addEventListener("touchmove", (e) => {

    endX = e.touches[0].clientX;

  });

  slider.addEventListener("touchend", () => {

    /* SWIPE LEFT */

    if(startX - endX > 50){

      nextSlide();

      resetAutoSlide();

    }

    /* SWIPE RIGHT */

    if(endX - startX > 50){

      prevSlide();

      resetAutoSlide();

    }

  });

}

/* =========================================================
   NAVBAR CURTAIN MENU
========================================================= */

if(sdMenuBtn && sdCurtainMenu){

  sdMenuBtn.addEventListener("click", () => {

    /* TOGGLE ACTIVE */

    sdMenuBtn.classList.toggle("active");

    sdCurtainMenu.classList.toggle("active");

  });

}

/* =========================================================
   CLOSE MENU ON LINK CLICK
========================================================= */

const menuLinks = document.querySelectorAll(".sd-menu-links a");

menuLinks.forEach((link) => {

  link.addEventListener("click", () => {

    sdMenuBtn.classList.remove("active");

    sdCurtainMenu.classList.remove("active");

  });

});