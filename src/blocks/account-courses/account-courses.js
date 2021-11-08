import Swiper, { Navigation } from 'swiper/core';

Swiper.use([Navigation]);

new Swiper('.account-courses__slider', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 24,
  observer: true,
  observeSlideChildren: true,
  navigation: {
    prevEl: '.account-courses__prev',
    nextEl: '.account-courses__next'
  },
  breakpoints: {
    834: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1440: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },
});
