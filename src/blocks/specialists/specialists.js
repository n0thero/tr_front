import Swiper, { Navigation } from 'swiper/core';

const className = '.specialists__slider';
const breakpoint = window.matchMedia('(min-width: 834px)');
const options = {
  spaceBetween: 12,
};

let swiper;

function breakpointChecker() {
  if (!document.querySelector(className)) return;

  if (breakpoint.matches) {
    if (swiper === undefined) return;

    if (swiper.length) {
      swiper.forEach(function(s) {s.destroy(true, true);});
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
