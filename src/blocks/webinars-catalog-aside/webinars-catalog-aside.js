import Modal from 'bootstrap/js/dist/modal';

const modalNode = document.querySelector('.webinars-catalog-aside');
const breakpoint = window.matchMedia('(max-width: 1023px)');
const options = {};
let modal;

function breakpointChecker() {
  if (breakpoint.matches) {
    modal = new Modal(modalNode, options);
  } else {
    if (modal) {
      modal.dispose();
    }
  }
}

if (modalNode) {
  breakpoint.addEventListener('change', breakpointChecker);
  breakpointChecker();
}
