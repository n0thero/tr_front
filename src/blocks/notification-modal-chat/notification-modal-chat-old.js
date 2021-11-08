import { notificationCame } from '../notification-modal/notification-modal';
import { pictures, clearPictures } from './js/loadPictures';

const notificationHeader = document.querySelector('.header__notification');
const modal = document.querySelector('.notification-modal');
const messages = document.querySelector('.notification-modal-chat__messages');
const form = document.querySelector('.notification-modal-chat__form');

let intervalCounter = 0;
let intervalId;
const intervalShort = 30000;
const intervalLong = 60000;
const intervalIncrease = 180000;
let intervalTime = intervalLong;

const urlRead = '/wp-json/tech-chat/read/';
const urlGet = '/wp-json/tech-chat/get/';
const fetchHead = {
  'X-WP-Nonce': window.rest_auth?.nonce,
};

function templatePicture(src) {
  return (
    `
      <img
        class="notification-modal-chat__message-picture"
        src="${src}"
        alt=""
        width="86"
        height="86"
      >
    `
  );
}

function templateMessage({author, created_at, text, images_urls = []}) {
  let picturesHtml = '';
  const pictures = images_urls.map(templatePicture).join('');

  if (pictures) {
    picturesHtml = `<div class="notification-modal-chat__message-pictures">${pictures}</div>`;
  }

  return (
    `
      <div class="notification-modal-chat__message">
        <picture class="notification-modal-chat__message-avatar">
          <img
            class="notification-modal-chat__message-avatar-img"
            src="img/webinar-card.jpg"
            alt=""
            width="29"
            height="29"
          >
        </picture>
        <div class="notification-modal-chat__message-right">
          <div class="notification-modal-chat__message-header">
            <p class="notification-modal-chat__message-name">${author}</p>
            <p class="notification-modal-chat__message-time">${created_at}</p>
          </div>
          <p class="notification-modal-chat__message-body">${text}</p>
          ${picturesHtml}
        </div>
      </div>
    `
  );
}

function sendReadMessages(messages) {
  if (modal.classList.contains('show')) {
    fetch(urlRead, {
      method: 'post',
      headers: fetchHead,
      body: JSON.stringify({
        messages_ids: messages.map(mess => mess.id),
      }),
    });
  }
}

function updateMessages() {
  fetch(urlGet, {
    headers: fetchHead,
  })
    .then(response => response.json())
    .then(data => {
      if (!data.messages.length) return;

      const htmlMessages = data.messages.map(templateMessage).join('');

      messages.innerHTML = '';
      messages.insertAdjacentHTML('beforeend', htmlMessages);
      messages.parentElement.scrollTop = messages.scrollHeight;

      const notReadMessages = data.messages.filter(mess => mess.is_opened == '0');

      if (notReadMessages.length) {
        const notificationCameEvent = new CustomEvent(
          notificationCame,
          {detail: {
            type: 'chat',
            counter: notReadMessages.length,
          }}
        );
        window.dispatchEvent(notificationCameEvent);

        sendReadMessages(notReadMessages);
      }
    })
    .catch(() => {})
    .finally(() => {
      intervalCounter += 1;

      if (intervalCounter >= 4) {
        intervalTime = intervalLong;
      } else {
        intervalTime = intervalShort;
      }
    });
}

function sendMessage(event) {
  event.preventDefault();

  if (!form.querySelector('.notification-modal-chat__form-text')) return;

  const text = form.querySelector('.notification-modal-chat__form-text').value;

  if (!text) return;

  const formData = new FormData(form);
  formData.set('files', pictures);

  fetch(form.action, {
    method: form.method,
    headers: fetchHead,
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      updateMessages();
      clearPictures();
      form.reset();
      intervalCounter = 0;
    } else {
      alert('Что-то пошло не так, попробуйте отправить позднее');
    }
  })
  .catch(() => {});
}

function shownModal() {
  const backdrop = document.querySelector('.modal-backdrop');

  if (backdrop) {
    backdrop.style.opacity = '0';
  }

  if (notificationHeader) {
    notificationHeader.classList.add('header__btn_active');
  }

  updateMessages();
  clearInterval(intervalId);
  intervalId = setInterval(updateMessages, intervalTime);
}

function hiddenModal() {
  if (notificationHeader) {
    notificationHeader.classList.remove('header__btn_active');
  }

  intervalTime = intervalLong;
}

if (modal && messages && form) {
  if (window.pageData?.increase_tech_chat_interval) intervalTime = intervalIncrease;
  intervalId = setInterval(updateMessages, intervalTime);

  form.addEventListener('submit', sendMessage);

  modal.addEventListener('shown.bs.modal', shownModal);
  modal.addEventListener('hide.bs.modal', hiddenModal);
}
