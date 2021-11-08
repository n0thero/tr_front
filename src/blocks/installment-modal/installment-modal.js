import Modal from 'bootstrap/js/dist/modal';

const parent = document.querySelector('.installment-modal');

function initCloseRecordingModal() {
  const recordingtModal = document.getElementById('recording-course-modal');

  if (!recordingtModal) return;

  const modal = new Modal(recordingtModal);

  if (modal) {
    parent.addEventListener('show.bs.modal', () => {
      modal.hide();
    });
  }

}

initCloseRecordingModal();
