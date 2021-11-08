import Swiper, { Navigation } from 'swiper/core';
import lightGallery from 'lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';

const className = '.webinar-gallery';
const breakpoint = window.matchMedia('(min-width: 1024px)');
const options = {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    prevEl: '.webinar-gallery__prev',
    nextEl: '.webinar-gallery__next',
  },
  breakpoints: {
    414: {
      slidesPerView: 2,
    },
    834: {
      slidesPerView: 3,
    },
  },
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

lightGallery(document.querySelector('.webinar-gallery .swiper-wrapper'), {
  plugins: [lgZoom],
  speed: 300,
  mobileSettings: {
    download: false,
  },
});

Swiper.use([Navigation]);

breakpoint.addEventListener('change', breakpointChecker);
breakpointChecker();
