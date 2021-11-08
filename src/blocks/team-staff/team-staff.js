import Swiper, { Navigation, Pagination } from 'swiper/core';

const className = '.team-staff-slider';
const breakpoint = window.matchMedia('(min-width: 834px)');
const options = {
  slidesPerView: 1.01,
  spaceBetween: 8,
  observeParents: true,
  observer: true,
  pagination: {
    el: '.team-staff-slider__pagination',
    type: 'fraction',
  },
  navigation: {
    prevEl: '.team-staff-slider__prev',
    nextEl: '.team-staff-slider__next',
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

Swiper.use([Navigation, Pagination]);

breakpoint.addEventListener('change', breakpointChecker);
breakpointChecker();
