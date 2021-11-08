import './js/modal';
import './js/navigation';
import './js/notification';

import { triggerAll as triggerAllEvent } from './js/observer';

const URL_READ = '/wp-json/tech-chat/read/';
// const URL_UPDATE = '/wp-json/account-updates/get/';
const URL_UPDATE = 'data.json';
const FETCH_HEAD = {
  'X-WP-Nonce': window.rest_auth?.nonce,
};

let intervalId;
const interval = {
  counter: 0,
  value: {
    short: 30000,
    long: 60000,
    increase: 180000,
    current: 60000,
  },
};

const isUpdate = (prev = [], current = []) => {
  return current.every((item) => prev.some((prevItem) => item.id === prevItem.id))
};

const fetchUpdate = () => {
  const done = (data) => {
    if (!data) return;
    triggerAllEvent(data);
  };

  const fail = (error) => {console.error(error);};

  const always = () => {
    interval.counter += 1;

    if (interval.counter >= 4) {
      interval.value.current = interval.value.long;
    } else {
      interval.value.current = interval.value.short;
    }
  };

  fetch(URL_UPDATE, {
    headers: FETCH_HEAD,
  })
    .then(response => response.json())
    .then(done)
    .catch(fail)
    .finally(always);
};

if (window.pageData?.increase_tech_chat_interval) {
  interval.value.current = interval.value.increase;
}

intervalId = setInterval(fetchUpdate, interval.value.current);
fetchUpdate();

export {
  FETCH_HEAD,
  URL_READ,
  URL_UPDATE,
  intervalId,
  interval,
  fetchUpdate,
  isUpdate,
};
