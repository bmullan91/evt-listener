#evt-listener

###What is it?

A class encapsulating an event and it's listener together.

###Why would you use it?

Whenever you create an event listener, if you want to **off** the event, you must pass the same function you passed to **on** to **off** the event correctly.

Creating an EventListener allows you to just call **off** without having to worry about saving and passing the function. See below for a comparison.

First off, they both share the same event emitter boilerplate code:

```js
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
```

####Without EventListener

```js
var listener = function(payload) {
  console.log('Event ' + listener.event + ' triggered: ' + playload);
};

emitter.on('eventName', listener);

//sometime later..
emitter.off('eventName', listener);
``` 

####With EventListener

```js
var EventListener = require('evt-listener');

//create our listener
var eventNameListener = new EventListener(emitter, 'eventName');

//give it a handler
eventNameListener.on(function(payload) {
  console.log('Event ' + listener.event + ' triggered: ' + playload);
});

//sometime later..
eventNameListener.off();
``` 

##Install

With npm, saving it as a dependency.

    npm i evt-listener --save

##Tip

Check out [evt-emitter](https://www.npmjs.org/package/evt-emitter) which simply add's a *createListener* factory along with the default events module.