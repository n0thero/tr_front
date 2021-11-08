import Swiper, { Navigation } from 'swiper/core';

Swiper.use([Navigation]);

new Swiper('.courses__slider', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    prevEl: '.courses__prev',
    nextEl: '.courses__next'
  },
  breakpoints: {
    834: {
      slidesPerView: 2,
    },
  },
});
