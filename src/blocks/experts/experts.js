import Swiper, { Navigation, Pagination } from 'swiper/core';
import MoveTo from 'moveto';

const className = '.experts__slider';
const breakpoint = window.matchMedia('(min-width: 834px)');
const options = {
  loop: true,
  slidesPerView: 1.08,
  spaceBetween: 20,
  pagination: {
    el: '.experts__pagination',
    type: 'fraction',
  },
  navigation: {
    prevEl: '.experts__prev',
    nextEl: '.experts__next',
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

    swiper.on('slideChangeTransitionStart', function () {
      const moveTo = new MoveTo({
        tolerance: 68,
        duration: 200,
      });

      const target = document.querySelector(className);

      if (window.scrollY > target.offsetTop) moveTo.move(target);
    });
  }
}

Swiper.use([Navigation, Pagination]);

breakpoint.addEventListener('change', breakpointChecker);
breakpointChecker();
