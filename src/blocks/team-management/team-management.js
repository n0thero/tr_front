import Swiper, { Navigation } from 'swiper/core';

const className = '.team-management__slider';
const breakpoint = window.matchMedia('(min-width: 834px)');
const options = {
  loop: true,
  slidesPerView: 1.01,
  spaceBetween: 8,
  navigation: {
    prevEl: '.team-management__prev',
    nextEl: '.team-management__next',
  },
  breakpoints: {
    414: {
      spaceBetween: 16,
    },
    500: {
      slidesPerView: 1.24,
      spaceBetween: 20,
    },
  },
};

let swiper;

function breakpointChecker() {
  if (!document.querySelector(className)) return;

  if (breakpoint.matches) {
    if (swiper === undefined) return;

    if (swiper.length) {
      swiper.forEach(function (s) {
        s.destroy(true, true);
      });
    } else {
      swiper.destroy(true, true);
    }
  } else {
    swiper = new Swiper(className, options);
  }
}

Swiper.use([Navigation]);

breakpoint.addEventListener('change', breakpointChecker);
breakpointChecker();
