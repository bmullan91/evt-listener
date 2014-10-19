[![Build Status](https://travis-ci.org/bmullan91/evt-listener.svg?branch=master)](https://travis-ci.org/bmullan91/evt-listener) [![Coverage Status](https://img.shields.io/coveralls/bmullan91/evt-listener.svg)](https://coveralls.io/r/bmullan91/evt-listener)

#evt-listener

###What is it?

A class encapsulating an event and it's listener together.

###Why would you use it?

Whenever you create an event listener and need to eventually turn it off, you would pass the same function passed to emitter.**on** to emitter.**removeListener** to do so.

Creating an EventListener (the class behind evt-listener) allows you to just call listener.**off** (where *listener* would be an instance of EventListener) without having to worry about saving and passing the event name and function. See below for a comparison.

##Prerequisites

Install it using npm, saving it as a dependency.

    npm i evt-listener --save

Both examples share the same event emitter boilerplate code.

```js
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
```

#Comparison

####Without EventListener

```js
//we have to save the event name and the listener
var eventName = 'eventName';
var listener = function(payload) {
  console.log('Event ' + eventName + ' triggered with: ' + playload);
};

emitter.on(eventName, listener);

//sometime later...
emitter.removeListener(eventName, listener);
``` 

####With EventListener

```js
var EventListener = require('evt-listener');

//create a listener
var eventNameListener = new EventListener(emitter, 'eventName');

eventNameListener.on(function(payload) {
  console.log('Event ' + eventNameListener.event + ' triggered with: ' + playload);
});

//sometime later...
eventNameListener.off();
``` 

##Tips

__1.__ Name your listeners appropriately!

__2.__ You can chain your listener function after you create an EventListener instance.

```js
//create a listener, giving it a handler
var eventNameListener = new EventListener(emitter, 'eventName').on(function(payload) {
  console.log('Event ' + listener.event + ' triggered with: ' + playload);
});

//same goes for once
var eventNameListener = new EventListener(emitter, 'eventName').once(function(payload) {
  console.log('Event ' + listener.event + ' triggered with: ' + playload);
});
```

__3.__ Don't like using the *new* keyword in javascript? No worries.

```js
var EventListener = require('evt-listener');
var listener = EventListener(emitter, 'eventName');
```

__4.__ Prefer the revealing module pattern?

```js
var EventListener = require('evt-listener').EventListener;
```

##PS

Check out [evt-emitter](https://www.npmjs.org/package/evt-emitter) which adds a __createListener__ factory method on the EventEmitter prototype. This allows you to create instances of EventListener without having to pass an emitter.
