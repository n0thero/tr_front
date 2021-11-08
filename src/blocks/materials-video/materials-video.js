import Swiper, { Navigation } from 'swiper/core';
import lightGallery from 'lightgallery';
import lgVideo from 'lightgallery/plugins/video';

lightGallery(document.querySelector('.materials-video__slider .swiper-wrapper'), {
  plugins: [lgVideo],
  download: false,
});

Swiper.use([Navigation]);

new Swiper('.materials-video__slider', {
  // loop: true,
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    prevEl: '.materials-video__prev',
    nextEl: '.materials-video__next'
  },
  breakpoints: {
    834: {
      slidesPerView: 2,
    },
    1440: {
      slidesPerView: 3,
    },
  },
});
