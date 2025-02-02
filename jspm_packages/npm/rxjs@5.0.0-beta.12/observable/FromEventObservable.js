/* */ 
(function(process) {
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
  var Observable_1 = require('../Observable');
  var tryCatch_1 = require('../util/tryCatch');
  var isFunction_1 = require('../util/isFunction');
  var errorObject_1 = require('../util/errorObject');
  var Subscription_1 = require('../Subscription');
  function isNodeStyleEventEmmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
  }
  function isJQueryStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
  }
  function isNodeList(sourceObj) {
    return !!sourceObj && sourceObj.toString() === '[object NodeList]';
  }
  function isHTMLCollection(sourceObj) {
    return !!sourceObj && sourceObj.toString() === '[object HTMLCollection]';
  }
  function isEventTarget(sourceObj) {
    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
  }
  var FromEventObservable = (function(_super) {
    __extends(FromEventObservable, _super);
    function FromEventObservable(sourceObj, eventName, selector, options) {
      _super.call(this);
      this.sourceObj = sourceObj;
      this.eventName = eventName;
      this.selector = selector;
      this.options = options;
    }
    FromEventObservable.create = function(target, eventName, options, selector) {
      if (isFunction_1.isFunction(options)) {
        selector = options;
        options = undefined;
      }
      return new FromEventObservable(target, eventName, selector, options);
    };
    FromEventObservable.setupSubscription = function(sourceObj, eventName, handler, subscriber, options) {
      var unsubscribe;
      if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
        for (var i = 0,
            len = sourceObj.length; i < len; i++) {
          FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
        }
      } else if (isEventTarget(sourceObj)) {
        var source_1 = sourceObj;
        sourceObj.addEventListener(eventName, handler, options);
        unsubscribe = function() {
          return source_1.removeEventListener(eventName, handler);
        };
      } else if (isJQueryStyleEventEmitter(sourceObj)) {
        var source_2 = sourceObj;
        sourceObj.on(eventName, handler);
        unsubscribe = function() {
          return source_2.off(eventName, handler);
        };
      } else if (isNodeStyleEventEmmitter(sourceObj)) {
        var source_3 = sourceObj;
        sourceObj.addListener(eventName, handler);
        unsubscribe = function() {
          return source_3.removeListener(eventName, handler);
        };
      }
      subscriber.add(new Subscription_1.Subscription(unsubscribe));
    };
    FromEventObservable.prototype._subscribe = function(subscriber) {
      var sourceObj = this.sourceObj;
      var eventName = this.eventName;
      var options = this.options;
      var selector = this.selector;
      var handler = selector ? function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i - 0] = arguments[_i];
        }
        var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
        if (result === errorObject_1.errorObject) {
          subscriber.error(errorObject_1.errorObject.e);
        } else {
          subscriber.next(result);
        }
      } : function(e) {
        return subscriber.next(e);
      };
      FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
    };
    return FromEventObservable;
  }(Observable_1.Observable));
  exports.FromEventObservable = FromEventObservable;
})(require('process'));
