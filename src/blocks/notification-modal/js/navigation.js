import { state } from './state';
import { eventTypes, trigger as triggerEvent } from './observer';
import { notificationState, getNotReadMessages } from './notification';
import { sendReadNotification } from './readNotification';

const modalNode = document.querySelector('.notification-modal');
const navButtonsNode = document.querySelectorAll('.notification-modal__nav-btn');

const appendContentToggleButton = (button) => {
  const toggleButtonNode = document.querySelector('.notification-modal__dropdown-toggle');

  if (!toggleButtonNode) return;

  toggleButtonNode.innerHTML = button.innerHTML;
};

const handleButton = (button) => {
  const target = button.getAttribute('data-bs-target');
  const type = target.split('-')[1];
  const newState = state[type].map(item => ({ ...item, is_opened: 1 }));
  const getIds = (obj) => obj.id;
  const notReadAllNotifications = {
    [eventTypes.messages]: getNotReadMessages(eventTypes.messages).map(getIds),
    [eventTypes.news]: getNotReadMessages(eventTypes.news).map(getIds),
    [eventTypes.notifications]: getNotReadMessages(eventTypes.notifications).map(getIds),
  };

  if (notificationState[type]) sendReadNotification(notReadAllNotifications, type);
  appendContentToggleButton(button);
  triggerEvent(type, newState);
};

if (modalNode) {
  modalNode.addEventListener('shown.bs.modal', () => {
    const navButtonActiveNode = document.querySelector('.notification-modal__nav-btn.active');

    if (navButtonActiveNode) {
      handleButton(navButtonActiveNode);
    }
  });
}

navButtonsNode.forEach((button) => 
  (button.addEventListener('shown.bs.tab', () => handleButton(button)))
);
