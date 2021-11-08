import { state, setState } from './state';

const eventTypes = {
  messages: 'messages',
  news: 'news',
  notifications: 'notifications',
};

const subscribers = {};

function add(type, fn) {
  if (!subscribers[type]) subscribers[type] = [];
  subscribers[type].push(fn);
}

function remove(type, fn) {
  if (!subscribers[type]) return;
  subscribers[type] = subscribers[type].filter(subscriber !== fn);
}

function trigger(type, newState) {
  if (!subscribers[type]) return;
  const prevState = JSON.parse(JSON.stringify(state[type]));

  setState({ ...state, [type]: newState });
  subscribers[type].forEach(subscriber => subscriber(prevState, newState));
}

function triggerAll(newState) {
  const prevState = JSON.parse(JSON.stringify(state));
  setState(newState);

  Object.entries(subscribers).forEach((arr) => {
    const [type, stateValues] = arr;
    stateValues.forEach(subscriber => subscriber(prevState[type], newState[type]))
  });
}

export {
  eventTypes,
  add,
  remove,
  trigger,
  triggerAll,
};
