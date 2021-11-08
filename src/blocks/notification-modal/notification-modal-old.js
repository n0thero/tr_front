const headerNotification = document.querySelector('.header__notification');
const notificationModalBtns = document.querySelectorAll('.notification-modal__nav-btn');
const toggleBtn = document.querySelector('.notification-modal__dropdown-toggle');

let notificationState = {
  notification: false,
  news: false,
  chat: false,
};

function isNotification() {
  return Object.values(notificationState).reduce((a, e) => a + Number(e), 0);
}

function checkStatus() {
  if (!headerNotification) return;

  if (isNotification()) {
    headerNotification.classList.add('header__btn_alert');
  } else {
    headerNotification.classList.remove('header__btn_alert');
  }
}

function setCounter(type, counter) {
  const chatBtn = document.querySelector(
    `.notification-modal__nav-btn[data-bs-target="#pills-${type}"] .notification-modal__nav-btn-counter`
  );

  if (!chatBtn) return;

  if (counter) {
    chatBtn.classList.add('notification-modal__nav-btn-counter_alert');
    chatBtn.textContent = counter;
  } else {
    chatBtn.classList.remove('notification-modal__nav-btn-counter_alert');
  }
}

function handleNotification(event) {
  if (!event.detail && !headerNotification) return;

  if (event.type === 'notification-came') {
    notificationState[event.detail.type] = event.type.counter || 1;
  }
  if (event.type === 'notification-read') {
    notificationState[event.detail.type] = false;
  }

  checkStatus();
  setCounter(event.detail.type, event.detail.counter);
}

function getBtnType(btn) {
  const dataType = btn.getAttribute('data-bs-target') || '';
  return dataType.split('-')[1];
}

function handleTabBtn(btn) {
  const type = getBtnType(btn);
  const notificationReadEvent = new CustomEvent(notificationRead, {detail: {type}});
  window.dispatchEvent(notificationReadEvent);

  if (toggleBtn) {
    toggleBtn.innerHTML = btn.innerHTML;
  }
}

notificationModalBtns.forEach(btn => {
  const type = getBtnType(btn);
  const counter = btn.querySelector('.notification-modal__nav-btn-counter_alert');

  if (notificationState[type] !== undefined && counter) {
    notificationState[type] = true;
  }

  if (toggleBtn && btn.classList.contains('active')) {
    toggleBtn.innerHTML = btn.innerHTML;
  }

  btn.addEventListener('show.bs.tab', () => handleTabBtn(btn));
});

checkStatus();

window.addEventListener('notification-came', handleNotification);
window.addEventListener('notification-read', handleNotification);

export const notificationCame = 'notification-came';
export const notificationRead = 'notification-read';
