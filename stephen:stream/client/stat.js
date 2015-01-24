Stat = function(selector, options, variable) {
    var self = this;
    self.selector = selector;
    self.variable = variable;
    
    // TODO(stephen): Check whether the selector exists and return error(?) if
    //                it doesn't.
    
    self.value = new ReactiveVar(Math.random());
    self.stopped = false;
    self.handle = setInterval(function() {
        self.value.set(Math.random());
    }, 1000);
}

Stat.prototype.get = function() {
    var self = this;
    return self.value.get();
};

Stat.prototype.selector = function() {
    var self = this;
    return self.selector;
};

Stat.prototype.variable = function() {
    var self = this;
    return self.variable;
};

Stat.prototype.isRunning = function() {
    var self = this;
    return !self.stopped;
};

Stat.prototype.isStopped = function() {
    var self = this;
    return self.stopped;
};

Stat.prototype.stop = function() {
    var self = this;
    if (self.stopped === false) {
        self.handle.stop();
        self.stopped = true;
    }
};
