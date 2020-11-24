'use strict';
// Adapted from https://gist.github.com/howardr/118668/ecd43be756079494f85d303ef69e9e04ef72031e#file-eventmanager-js

export default class EventManager {
  constructor() {
    this.listeners = {};
  }

  xaddListener(name, fn) {
    (this.listeners[name] = this.listeners[name] || []).push(fn);
    return this;
  }

  dispatch(name, target = window) {
    const listeners = this.listeners[name];
    if (listeners !== undefined) {
      for (let i = 0, len = listeners.length; i < len; i++) {
        listeners[i].apply(target);
      }
    }
    return this;
  }
}

if (window.EventManager === undefined) {
  window.EventManager = new EventManager();
}
