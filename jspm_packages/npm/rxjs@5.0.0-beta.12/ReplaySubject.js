/* */ 
"use strict";
var __extends = (this && this.__extends) || function(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = require('./Subject');
var queue_1 = require('./scheduler/queue');
var observeOn_1 = require('./operator/observeOn');
var ReplaySubject = (function(_super) {
  __extends(ReplaySubject, _super);
  function ReplaySubject(bufferSize, windowTime, scheduler) {
    if (bufferSize === void 0) {
      bufferSize = Number.POSITIVE_INFINITY;
    }
    if (windowTime === void 0) {
      windowTime = Number.POSITIVE_INFINITY;
    }
    _super.call(this);
    this.scheduler = scheduler;
    this._events = [];
    this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
    this._windowTime = windowTime < 1 ? 1 : windowTime;
  }
  ReplaySubject.prototype.next = function(value) {
    var now = this._getNow();
    this._events.push(new ReplayEvent(now, value));
    this._trimBufferThenGetEvents();
    _super.prototype.next.call(this, value);
  };
  ReplaySubject.prototype._subscribe = function(subscriber) {
    var _events = this._trimBufferThenGetEvents();
    var scheduler = this.scheduler;
    if (scheduler) {
      subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
    }
    var len = _events.length;
    for (var i = 0; i < len && !subscriber.closed; i++) {
      subscriber.next(_events[i].value);
    }
    return _super.prototype._subscribe.call(this, subscriber);
  };
  ReplaySubject.prototype._getNow = function() {
    return (this.scheduler || queue_1.queue).now();
  };
  ReplaySubject.prototype._trimBufferThenGetEvents = function() {
    var now = this._getNow();
    var _bufferSize = this._bufferSize;
    var _windowTime = this._windowTime;
    var _events = this._events;
    var eventsCount = _events.length;
    var spliceCount = 0;
    while (spliceCount < eventsCount) {
      if ((now - _events[spliceCount].time) < _windowTime) {
        break;
      }
      spliceCount++;
    }
    if (eventsCount > _bufferSize) {
      spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
    }
    if (spliceCount > 0) {
      _events.splice(0, spliceCount);
    }
    return _events;
  };
  return ReplaySubject;
}(Subject_1.Subject));
exports.ReplaySubject = ReplaySubject;
var ReplayEvent = (function() {
  function ReplayEvent(time, value) {
    this.time = time;
    this.value = value;
  }
  return ReplayEvent;
}());
