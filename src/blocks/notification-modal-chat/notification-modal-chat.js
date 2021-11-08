import { state } from '../notification-modal/js/state';
import { eventTypes, add as addEvent } from '../notification-modal/js/observer';
import { pictures, clearPictures } from './js/loadPictures';
import { updateGallery } from './js/gallery';
import {
  FETCH_HEAD,
  interval,
  fetchUpdate,
  isUpdate,
} from '../notification-modal/notification-modal';

const messagesNode = document.querySelector('.notification-modal-chat__messages');
const formNode = document.querySelector('.notification-modal-chat__form');

const  templatePicture = (src) => {
  return (
    `
      <a href="${src}" target="_blank">
        <img
          class="notification-modal-chat__message-picture"
          src="${src}"
          alt=""
          width="86"
          height="86"
        >
      </a>
    `
  );
};

const templateMessage = ({author, created_at, text, images_urls = []}) => {
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
};

const scrollToBottom = () => {
  if (!messagesNode?.parentElement) return;
  messagesNode.parentElement.scrollTop = messagesNode.parentElement.scrollHeight;
};

const sendMessage = (event) => {
  event.preventDefault();

  const textNode = formNode.querySelector('.notification-modal-chat__form-text');

  if (!textNode?.value) return;

  const formData = new FormData(formNode);
  formData.set('files', pictures);

  const done = (data) => {
    if (data.status === 'success') {
      updateMessages();
      clearPictures();
      formNode.reset();
      interval.counter = 0;
      fetchUpdate();
    } else {
      alert('Что-то пошло не так, попробуйте отправить позднее');
    }
  };

  const fail = (error) => {console.error(error);};

  fetch(formNode.action, {
    method: formNode.method,
    headers: FETCH_HEAD,
    body: formData,
  })
  .then(response => response.json())
  .then(done)
  .catch(fail);
};

const handleUpdateMessages = (prevState, newState) => {
  const data = state[eventTypes.messages];

  if (!data || isUpdate(prevState, newState)) return;

  const htmlMessages = data.map(templateMessage).join('');
  const notReadMessages = data.filter(mess => mess.is_opened == '0');

  messagesNode.innerHTML = '';
  messagesNode.insertAdjacentHTML('beforeend', htmlMessages);
  updateGallery();

  if (notReadMessages) {
    scrollToBottom();
  }
};

if (messagesNode && formNode) {
  formNode.addEventListener('submit', sendMessage);
  addEvent(eventTypes.messages, handleUpdateMessages);
}
