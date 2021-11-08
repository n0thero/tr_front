const state = {
  messages: [],
  news: [],
  notifications: [],
};

const setState = (newState) => {
  Object.assign(state, newState);
};

export {
  state,
  setState,
};
