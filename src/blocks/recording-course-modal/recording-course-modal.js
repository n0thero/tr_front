import Modal from 'bootstrap/js/dist/modal';

const parent = document.querySelector('.recording-course-modal');

function initCloseInstallmentModal() {
  const installmentModal = document.getElementById('installment-modal');

  if (!installmentModal) return;

  const modal = new Modal(installmentModal);

  if (modal) {
    parent.addEventListener('show.bs.modal', () => {
      modal.hide();
    });
  }
}

if (parent) {
  const buttons = parent.querySelectorAll('.recording-course-modal__toggle-button');
  const prices = parent.querySelectorAll('.recording-course-modal__prices');
  const lists = parent.querySelectorAll('.recording-course-modal__list');
  const buttonPrev = parent.querySelector('.recording-course-modal__controls-prev');
  const buttonNext = parent.querySelector('.recording-course-modal__controls-next');
  const tariffInput = document.querySelector('.installment-modal__fields input[name="tariff"]');

  let index = 0;
  let currentIndex = 0;
  let currentTariff = parent
    .querySelector('.recording-course-modal__toggle-button_active')
    ?.getAttribute('data-value');

  function handleButton(button, i) {
    if (i) index = 1 - i;

    index++;

    currentIndex = index % 2;
  
    buttons.forEach((button) => {
      button.disabled = false;
      button.classList.remove('recording-course-modal__toggle-button_active');
    });
    buttons[currentIndex].disabled = true;
    buttons[currentIndex].classList.add('recording-course-modal__toggle-button_active');

    prices.forEach((price) => {
      price.classList.add('recording-course-modal__prices_hidden');
    });
    prices[currentIndex].classList.remove('recording-course-modal__prices_hidden');

    lists.forEach((list) => {
      list.classList.add('recording-course-modal__list_hidden');
    });
    lists[currentIndex].classList.remove('recording-course-modal__list_hidden');


    if (button) currentTariff = button.getAttribute('data-value');
    if (tariffInput) tariffInput.value = currentTariff;
  }

  if (buttons && prices && lists && buttonPrev && buttonNext) {
    buttons.forEach((button, i) => {
      button.addEventListener('click', () => handleButton(button, i));
    });

    buttonPrev.addEventListener('click', handleButton);
    buttonNext.addEventListener('click', handleButton);

    initCloseInstallmentModal();
  }
}
