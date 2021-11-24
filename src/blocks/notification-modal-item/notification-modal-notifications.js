import { state } from '../notification-modal/js/state';
import {
  eventTypes,
  add as addEvent,
} from '../notification-modal/js/observer';
import { isUpdate } from '../notification-modal/notification-modal';

const messagesNode = document.querySelector(
  '.notification-modal-notifications .notification-modal-item__messages'
);

const templateDefault = ({
  author = '',
  text = '',
  created_at = '',
}) => {
  return (
    `
      <div class="notification-modal-item__message">
        <picture class="notification-modal-item__message-picture">
          <img
            class="notification-modal-item__message-picture-img"
            src="/wp-content/themes/trading/august/img/webinar-card.jpg"
            alt=""
            width="29"
            height="29"
          >
        </picture>
        <div class="notification-modal-item__message-right">
          <div class="notification-modal-item__message-header">
            ${author ? `<p class="notification-modal-item__message-name">${author}</p>` : ''}
            <p class="notification-modal-item__message-time">${created_at}</p>
          </div>
          <p class="notification-modal-item__message-body">${text}</p>
        </div>
      </div>
    `
  );
};

const templateWebinar = ({
  webinar_info = {
    url: '',
    title: '',
    author: null,
  }
}) => {
  const authorDate = {...webinar_info.author};
  const avatarHtml = (
    `
      <img
        class="webinar-card__master-avatar"
        src="${authorDate.avatar_url}"
        alt="${authorDate.name}"
        width="79"
        height="79"
      >
    `
  );
  const authorHtml = (
    `
      <a
        class="webinar-card__master webinar-card__master_size_sm"
        href="${authorDate.url ? authorDate.url : '#'}"
        target="_blank"
      >
        ${authorDate.avatar_url ? avatarHtml : ''}
        <div class="webinar-card__master-info">
          <p class="webinar-card__master-name">${authorDate.name}</p>
          <p class="webinar-card__master-activity">${authorDate.subtitle}</p>
        </div>
      </a>
    `
  );
  return (
    `
      <div class="notification-modal-item__message">
        <article class="webinar-card">
          <div class="webinar-card__inner webinar-card__inner_type_notification">
            <ul class="webinar-card__tags webinar-card__tags_size_sm">
              <li class="webinar-card__tags-item">
                <span class="webinar-card__tag webinar-card__tag_text_sm">Вебинар</span>
              </li>
              <li class="webinar-card__tags-item">
                <span class="webinar-card__status">В эфире</span>
              </li>
            </ul>
            <h3 class="webinar-card__title webinar-card__title_size_sm">
              <a
                class="webinar-card__title-link"
                href="${webinar_info.url}"
                target="_blank"
              >
                ${webinar_info.title}
              </a>
            </h3>
            ${webinar_info.author ? authorHtml : ''}
          </div>
        </article>
      </div>
    `
  );
};

const templateNotification = (data = {}) => {
  switch (data.type) {
    case 'webinar':
      return templateWebinar(data);
    default:
      return templateDefault(data);
  }
};

const handleUpdateNotifications = (prevState, newState) => {
  const data = state[eventTypes.notifications];

  if (!data || isUpdate(prevState, newState)) return;

  const htmlMessages = data.map(templateNotification).join('');

  messagesNode.innerHTML = '';
  messagesNode.insertAdjacentHTML('beforeend', htmlMessages);
};

if (messagesNode) {
  addEvent(eventTypes.notifications, handleUpdateNotifications);
}
