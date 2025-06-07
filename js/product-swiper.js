import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";
console.log(window.matchMedia('(max-width: 768px)').matches);
 var swiper = new Swiper(".productsSwiper", {
      slidesPerView: 7,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
       breakpoints: {
          380: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
        },
    });