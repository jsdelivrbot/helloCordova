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
var OuterSubscriber_1 = require('../OuterSubscriber');
var subscribeToResult_1 = require('../util/subscribeToResult');
function debounce(durationSelector) {
  return this.lift(new DebounceOperator(durationSelector));
}
exports.debounce = debounce;
var DebounceOperator = (function() {
  function DebounceOperator(durationSelector) {
    this.durationSelector = durationSelector;
  }
  DebounceOperator.prototype.call = function(subscriber, source) {
    return source._subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
  };
  return DebounceOperator;
}());
var DebounceSubscriber = (function(_super) {
  __extends(DebounceSubscriber, _super);
  function DebounceSubscriber(destination, durationSelector) {
    _super.call(this, destination);
    this.durationSelector = durationSelector;
    this.hasValue = false;
    this.durationSubscription = null;
  }
  DebounceSubscriber.prototype._next = function(value) {
    try {
      var result = this.durationSelector.call(this, value);
      if (result) {
        this._tryNext(value, result);
      }
    } catch (err) {
      this.destination.error(err);
    }
  };
  DebounceSubscriber.prototype._complete = function() {
    this.emitValue();
    this.destination.complete();
  };
  DebounceSubscriber.prototype._tryNext = function(value, duration) {
    var subscription = this.durationSubscription;
    this.value = value;
    this.hasValue = true;
    if (subscription) {
      subscription.unsubscribe();
      this.remove(subscription);
    }
    subscription = subscribeToResult_1.subscribeToResult(this, duration);
    if (!subscription.closed) {
      this.add(this.durationSubscription = subscription);
    }
  };
  DebounceSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
    this.emitValue();
  };
  DebounceSubscriber.prototype.notifyComplete = function() {
    this.emitValue();
  };
  DebounceSubscriber.prototype.emitValue = function() {
    if (this.hasValue) {
      var value = this.value;
      var subscription = this.durationSubscription;
      if (subscription) {
        this.durationSubscription = null;
        subscription.unsubscribe();
        this.remove(subscription);
      }
      this.value = null;
      this.hasValue = false;
      _super.prototype._next.call(this, value);
    }
  };
  return DebounceSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
