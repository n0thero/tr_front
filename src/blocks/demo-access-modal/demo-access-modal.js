import Modal from 'bootstrap/js/dist/modal';

const parent = document.getElementById('demo-access-modal');

if (window.pageData?.show_usa_trial_start && parent) {
  const modal = new Modal(parent);

  modal.show();
}
