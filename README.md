[![Build Status](https://travis-ci.org/bmullan91/evt-listener.svg?branch=master)](https://travis-ci.org/bmullan91/evt-listener)

#evt-listener

###What is it?

A class encapsulating an event and it's listener together.

###Why would you use it?

Whenever you create an event listener, if you want to **off** the event you must pass the same function you passed to **on** to **off** the event correctly.

Creating an EventListener allows you to just call **off** without having to worry about saving and passing the function. See below for a comparison.

##First install it

With npm, saving it as a dependency.

    npm i evt-listener --save

They both share the same event emitter boilerplate code:

```js
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
```

#Comparison

####Without EventListener

```js
//we have to save event name and the listener
var eventName = 'eventName';
var listener = function(payload) {
  console.log('Event ' + eventName + ' triggered with: ' + playload);
};

emitter.on(eventName, listener);

//sometime later...
emitter.off(eventName, listener);
``` 

####With EventListener

```js
var EventListener = require('evt-listener');

//create our listener
var eventNameListener = new EventListener(emitter, 'eventName');

eventNameListener.on(function(payload) {
  console.log('Event ' + eventNameListener.event + ' triggered with: ' + playload);
});

//sometime later...
eventNameListener.off();
``` 

##Tips

__1.__ You can chain your listener function after you create the EventListener instance.

```js
//create our listener, giving it a handler
var listener = new EventListener(emitter, 'eventName').on(function(payload) {
  console.log('Event ' + listener.event + ' triggered with: ' + playload);
});

//same goes for once
var listener = new EventListener(emitter, 'eventName').once(function(payload) {
  console.log('Event ' + listener.event + ' triggered with: ' + playload);
});
```

__2.__ Don't like using the *new* keyword in javascript? No worries.

```js
var EventListener = require('evt-listener');
var listener = EventListener(emitter, 'eventName');
```

__3.__ Prefer the revealing module pattern?

```js
var EventListener = require('evt-listener').EventListener;
```

##PS

Check out [evt-emitter](https://www.npmjs.org/package/evt-emitter) which adds a __createListener__ factory method on the EventEmitter prototype. This allows you to create instance's of EventListener without having to pass an event emitter.
