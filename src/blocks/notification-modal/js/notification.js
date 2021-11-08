import { state } from './state';
import {
  eventTypes,
  add as addEvent,
} from './observer';

const notificationState = Object.fromEntries(
  Object.values(eventTypes).map(value => [value, 0])
);

const getNotReadMessages = (type) => {
  if (!state[type]) return [];

  return state[type].filter(mess => mess.is_opened == '0');
};

const isActiveNotification = () => {
  return Object.values(notificationState).reduce((a, e) => a + e, 0);
};

const toggleHeaderNotificationNode = () => {
  const headerNotificationNode = document.querySelector('.header-admin__notification');

  if (!headerNotificationNode) return;

  if (isActiveNotification()) {
    headerNotificationNode.classList.add('header-admin__btn_alert');
  } else {
    headerNotificationNode.classList.remove('header-admin__btn_alert');
  }
};

const setCounter = (type) => {
  const buttonNode = document.querySelector(`[data-bs-target="#pills-${type}"]`);

  if (!buttonNode?.querySelector('.notification-modal__nav-btn-counter')) return;

  const counterNode = buttonNode.querySelector('.notification-modal__nav-btn-counter');

  counterNode.textContent = notificationState[type];

  if (notificationState[type]) {
    counterNode.classList.add('notification-modal__nav-btn-counter_alert');
  } else {
    counterNode.classList.remove('notification-modal__nav-btn-counter_alert');
  }
};

const handleUpdate = (type) => {
  const notReadMessages = getNotReadMessages(type);
  notificationState[type] = notReadMessages.length;

  setCounter(type);
  toggleHeaderNotificationNode();
};

Object.values(eventTypes).forEach((type) => {
  addEvent(type, () => handleUpdate(type));
});

export {
  notificationState,
  isActiveNotification,
  getNotReadMessages,
};
