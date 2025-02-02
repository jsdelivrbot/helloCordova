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
var AsyncAction_1 = require('./AsyncAction');
var AsyncScheduler_1 = require('./AsyncScheduler');
var VirtualTimeScheduler = (function(_super) {
  __extends(VirtualTimeScheduler, _super);
  function VirtualTimeScheduler(SchedulerAction, maxFrames) {
    var _this = this;
    if (SchedulerAction === void 0) {
      SchedulerAction = VirtualAction;
    }
    if (maxFrames === void 0) {
      maxFrames = Number.POSITIVE_INFINITY;
    }
    _super.call(this, SchedulerAction, function() {
      return _this.frame;
    });
    this.maxFrames = maxFrames;
    this.frame = 0;
    this.index = -1;
  }
  VirtualTimeScheduler.prototype.flush = function() {
    var _a = this,
        actions = _a.actions,
        maxFrames = _a.maxFrames;
    var error,
        action;
    while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    }
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  VirtualTimeScheduler.frameTimeFactor = 10;
  return VirtualTimeScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.VirtualTimeScheduler = VirtualTimeScheduler;
var VirtualAction = (function(_super) {
  __extends(VirtualAction, _super);
  function VirtualAction(scheduler, work, index) {
    if (index === void 0) {
      index = scheduler.index += 1;
    }
    _super.call(this, scheduler, work);
    this.scheduler = scheduler;
    this.work = work;
    this.index = index;
    this.index = scheduler.index = index;
  }
  VirtualAction.prototype.schedule = function(state, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return !this.id ? _super.prototype.schedule.call(this, state, delay) : this.add(new VirtualAction(this.scheduler, this.work)).schedule(state, delay);
  };
  VirtualAction.prototype.requestAsyncId = function(scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    this.delay = scheduler.frame + delay;
    var actions = scheduler.actions;
    actions.push(this);
    actions.sort(VirtualAction.sortActions);
    return true;
  };
  VirtualAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return undefined;
  };
  VirtualAction.sortActions = function(a, b) {
    if (a.delay === b.delay) {
      if (a.index === b.index) {
        return 0;
      } else if (a.index > b.index) {
        return 1;
      } else {
        return -1;
      }
    } else if (a.delay > b.delay) {
      return 1;
    } else {
      return -1;
    }
  };
  return VirtualAction;
}(AsyncAction_1.AsyncAction));
exports.VirtualAction = VirtualAction;
