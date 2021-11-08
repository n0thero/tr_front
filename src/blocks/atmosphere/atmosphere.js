import Swiper, { Navigation, Pagination } from 'swiper/core';

Swiper.use([Navigation, Pagination]);

new Swiper('.atmosphere__slider', {
  loop: true,
  roundLengths: true,
  slidesPerView: 1.01,
  spaceBetween: 8,
  pagination: {
    el: '.atmosphere__slide-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.atmosphere__slide-buttons-next',
    prevEl: '.atmosphere__slide-buttons-prev',
  },
  breakpoints: {
    1920: {
      spaceBetween: 24,
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 3,
    },
    834: {
      slidesPerView: 2,
    },
    500: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    414: {
      spaceBetween: 16,
    },
  },
});
