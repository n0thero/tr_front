function Observer() {
  this.subscribers = {};
}

Observer.prototype.add = function(type, fn) {
  if (!this.subscribers[type]) this.subscribers[type] = [];

  this.subscribers[type].push(fn);
};

Observer.prototype.remove = function(type, fn) {
  if (!this.subscribers[type]) return;

  this.subscribers[type] = this.subscribers[type].filter((subscriber) !== fn);
};

Observer.prototype.trigger = function(type, data = {}) {
  if (!this.subscribers[type]) return;

  this.subscribers[type].forEach((subscriber) => subscriber(data));
};

export default Observer;
