import { interval } from '../../notification-modal/notification-modal';

const headerNotificationNode = document.querySelector('.header-admin__notification');
const modalNode = document.querySelector('.notification-modal');

const shownModal = () => {
  const backdrop = document.querySelector('.modal-backdrop');

  if (backdrop) {
    backdrop.style.opacity = '0';
  }

  if (headerNotificationNode) {
    headerNotificationNode.classList.add('header-admin__btn_active');
  }
};

const hiddenModal = () => {
  if (headerNotificationNode) {
    headerNotificationNode.classList.remove('header-admin__btn_active');
  }

  interval.value.current = interval.value.long;
};

if (headerNotificationNode && modalNode) {
  modalNode.addEventListener('shown.bs.modal', shownModal);
  modalNode.addEventListener('hide.bs.modal', hiddenModal);
}
