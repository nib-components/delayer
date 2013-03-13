module.exports = {
  setTimeout: function(name, time, handler) {
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
  },
  clearTimeout: function(name) {
    if ( !this.timeouts || !this.timeouts[name] ) {
      return;
    }
    clearTimeout(this.timeouts[name]);
    delete this.timeouts[name];
  },
  clearAllTimeouts: function() {
    var handle, name, _ref;
    if (!this.timeouts) {
      return;
    }
    _ref = this.timeouts;
    for (name in _ref) {
      handle = _ref[name];
      this.clearTimeout(name);
    }
  },
  setInterval: function(name, time, handler) {
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
  },
  clearInterval: function(name) {
    if (!(this.intervals && this.intervals[name])) {
      return;
    }
    clearInterval(this.intervals[name]);
    delete this.intervals[name];
  },
  clearAllIntervals: function() {
    var handle, name, _ref;
    if (!this.intervals) {
      return;
    }
    _ref = this.intervals;
    for (name in _ref) {
      handle = _ref[name];
      this.clearInterval(name);
    }
  },
  clearDelayed: function() {
    this.clearAllTimeouts();
    this.clearAllIntervals();
  }
};