function Delayer(obj) {
  if(obj) return mixin(obj);
}

function mixin(obj) {
  for (var key in Delayer.prototype) {
    obj[key] = Delayer.prototype[key];
  }
  return obj;
}

Delayer.prototype.setTimeout = function(name, time, handler) {
  var handle, _this = this;
  if ( !this.timeouts ) {
    this.timeouts = {};
  }
  this.clearTimeout(name);
  var wrappedHandler = function() {
    delete _this.timeouts[name];
    return handler.call(_this);
  };
  handle = setTimeout(wrappedHandler, time);
  this.timeouts[name] = handle;
  return handle;
};

Delayer.prototype.clearTimeout = function(name) {
  if ( !this.timeouts || !this.timeouts[name] ) {
    return;
  }
  clearTimeout(this.timeouts[name]);
  delete this.timeouts[name];
};

Delayer.prototype.clearAllTimeouts = function() {
  var handle, name, _ref;
  if (!this.timeouts) {
    return;
  }
  _ref = this.timeouts;
  for (name in _ref) {
    handle = _ref[name];
    this.clearTimeout(name);
  }
};

Delayer.prototype.setInterval = function(name, time, handler) {
  var self = this;
  this.clearInterval(name);
  if ( !this.intervals ) {
    this.intervals = {};
  }
  var handle = setInterval(function() {
    return handler.call(self);
  }, time);
  this.intervals[name] = handle;
  return handle;
};

Delayer.prototype.clearInterval = function(name) {
  if (!(this.intervals && this.intervals[name])) {
    return;
  }
  clearInterval(this.intervals[name]);
  delete this.intervals[name];
};

Delayer.prototype.clearAllIntervals = function() {
  var handle, name, _ref;
  if (!this.intervals) {
    return;
  }
  _ref = this.intervals;
  for (name in _ref) {
    handle = _ref[name];
    this.clearInterval(name);
  }
};

Delayer.prototype.clearDelayed = function() {
  this.clearAllTimeouts();
  this.clearAllIntervals();
};

module.exports = Delayer;