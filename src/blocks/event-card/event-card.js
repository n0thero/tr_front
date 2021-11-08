import { URL_WEBINAR_NOTIFICATIONS, FETCH_HEADER } from '../../js/global/api';

const handleNotice = event => {
  const button = event.target.closest('.event-card__notice');

  if (!button) return;

  button.disabled = true;

  const id = button.dataset.id;
  let value = !Boolean(button.classList.contains('event-card__notice_active'));

  fetch(URL_WEBINAR_NOTIFICATIONS, {
    headers: FETCH_HEADER,
    method: 'post',
    body: JSON.stringify({
      id,
      value,
    }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      button.classList.toggle('event-card__notice_active');

      if (button.classList.contains('event-card__notice_active')) {
        button.setAttribute('aria-label', 'Уведомление включено');
      } else {
        button.setAttribute('aria-label', 'Уведомление выключено');
      }
    } else {
      alert('Что-то пошло не так, попробуйте отправить позднее');
    }
  })
  .catch(error => {console.error(error);})
  .finally(() => {button.disabled = false;});
};

document.addEventListener('click', handleNotice);

export const noticeOn = 'Уведомление включено';
export const noticeOff = 'Уведомление выключено';
