import Offcanvas from 'bootstrap/js/dist/offcanvas';

const breakpoint = window.matchMedia('(min-width: 1024px)');
const sidebar = document.getElementById('sidebar');
let bsOffcanvas;

function breakpointChecker() {
  if (breakpoint.matches) {
    const backdrop = document.querySelector('.offcanvas-backdrop');
    if (backdrop) backdrop.remove();
    sidebar.removeAttribute('style');
    sidebar.removeAttribute('aria-hidden');
    sidebar.removeAttribute('aria-modal');
    sidebar.removeAttribute('role');
  } else {
    bsOffcanvas.hide();
  }
}

if (sidebar) {
  bsOffcanvas = new Offcanvas(sidebar);

  breakpoint.addEventListener('change', breakpointChecker);
  breakpointChecker();
}
