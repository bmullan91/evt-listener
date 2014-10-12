var expect = require('chai').expect;
var EventEmitter = require('events').EventEmitter;
var EventListener = require('../');

//re-used test var's
var emitter = new EventEmitter();
var eventName = 'eventName';


describe('validation checks', function() {

  it('should throw if 0 param\'s passed', function() {
    expect(EventListener).to.throw(Error);
  });

  it('should throw if the emitter is not an instance of EventEmitter', function() {
    expect(function() { EventListener({}, eventName); }).to.throw(Error);
  });

  it('should throw if there is no event passed', function() {
    expect(EventListener.bind(EventListener, emitter)).to.throw(Error);
  });

  it('should return an instance of EventListener with correct param\'s', function() {
    var listener = EventListener(emitter, eventName);
    expect(listener).to.be.an.instanceof(EventListener);
  });

  it('should expose the on, off, once interface', function() {
    var listener = EventListener(emitter, eventName);
    var meetsInterface = ['on', 'off', 'once'].every(function(method) {
      return (typeof listener[method] === 'function');
    });
    expect(meetsInterface).to.be.true;
  });

});

describe('work\'s like any other event listener', function() {

  it('should work with on, and off', function() {
    var listener = EventListener(emitter, eventName);
    //test state to check if the event listeners are triggered
    var onTriggered = 0;

    //Step 1.
    //add an on function for the listener
    listener.on(function() {
      //toggle
      onTriggered++;
    });

    //check it's been added to the list of listeners
    expect(emitter.listeners(eventName)).to.have.length(1);

    //test emitting and recieving the event via 'on'
    var previousTriggerCount = onTriggered;
    emitter.emit(eventName);
    expect(onTriggered).to.equal(++previousTriggerCount);

    //test turning off the listener
    var previousListeners = emitter.listeners(eventName).length;
    listener.off();

    //check the listener has been removed
    expect(emitter.listeners(eventName)).to.have.length(previousListeners - 1);

    //emit another event, check the listener doesn't recieve it
    emitter.emit(eventName);
    expect(onTriggered).to.equal(previousTriggerCount);
  });


  it('should work with once and off', function() {
    var listener = EventListener(emitter, eventName);
    //test state to check if the event listeners are triggered
    var onTriggered = 0;

    //Step 1.
    //add an once function for the listener
    listener.once(function() {
      //toggle
      onTriggered++;
    });

    //check it's been added to the list of listeners
    expect(emitter.listeners(eventName)).to.have.length(1);

    //test emitting and recieving the event via 'once'
    var previousTriggerCount = onTriggered;
    emitter.emit(eventName);
    expect(onTriggered).to.equal(++previousTriggerCount);

    //test that triggering a second event does not register.
    emitter.emit(eventName);
    expect(onTriggered).to.equal(previousTriggerCount);

    //check the listener has been removed
    expect(emitter.listeners(eventName)).to.have.length(0);
  });

});
