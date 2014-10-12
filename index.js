var EventEmitter = require('events').EventEmitter;

function EventListener(emitter, event) {
  if (!(this instanceof EventListener)){
    return new EventListener(emitter, event);
  }

  if(!(emitter instanceof EventEmitter)) {
    throw new Error('emitter must be an instance of EventEmitter');
  }

  if(!event || typeof event !== 'string') {
    throw new Error('invalid event');
  }

  this.emitter = emitter;
  this.event = event;
  this.cb = null;
};

EventListener.prototype.on = function(cb) {
  this.cb = cb;
  this.emitter.on(this.event, cb);
  return this;
};

EventListener.prototype.once = function(cb) {
  this.cb = cb;
  this.emitter.once(this.event, cb);
  return this;
};

EventListener.prototype.off = function() {
  this.emitter.removeListener(this.event, this.cb);
  return this;
};

module.exports = EventListener;
module.exports.EventListener = EventListener;