import Swiper, { Navigation } from 'swiper/core';

Swiper.use([Navigation]);

const breakpoint = window.matchMedia('(min-width: 834px)');
let swiper;

function breakpointChecker() {
  if (breakpoint.matches) {
    enableSwiper();
    return;
  }

  if (swiper && swiper.length) {
    swiper.forEach(function(s) {
      s.destroy(true, true)
    });
  }
}

function enableSwiper() {
  swiper = new Swiper('.webinars__slider', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      prevEl: '.webinars__prev',
      nextEl: '.webinars__next'
    },
    breakpoints: {
      1024: {
        slidesPerView: 2,
      }
    },
    observeParents: true,
    observer: true,
  });
}

breakpoint.addEventListener('change', breakpointChecker);
breakpointChecker();
