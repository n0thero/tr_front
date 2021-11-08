import Swiper, { Navigation } from 'swiper/core';
import lightGallery from 'lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';

lightGallery(document.querySelector('.certificates__slider .swiper-wrapper'), {
  plugins: [lgZoom],
  speed: 300,
  mobileSettings: {
    download: false,
  },
});

Swiper.use([Navigation]);

new Swiper('.certificates__slider', {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    prevEl: '.certificates__prev',
    nextEl: '.certificates__next',
    hideOnClick: true,
    hiddenClass: 'h',
    lockClass: 'look',
  },
  breakpoints: {
    834: {
      slidesPerView: 2.5,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
