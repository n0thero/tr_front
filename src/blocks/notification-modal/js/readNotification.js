import { eventTypes } from '../js/observer';
import {
  FETCH_HEAD,
  URL_READ,
} from '../notification-modal';

const sendReadNotification = (data, type) => {
  fetch(URL_READ, {
    method: 'post',
    headers: {
      ...FETCH_HEAD,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages_ids: type === eventTypes.messages ? data[eventTypes.messages] : [],
      notifications_ids: type === eventTypes.notifications ? data[eventTypes.notifications] : [],
      news_ids: type === eventTypes.news ? data[eventTypes.news] : [],
    }),
  });
};

export {
  sendReadNotification,
};
