Datum = function(selector, variable) {
    var self = this;
    self.selector = selector;
    self.type = variable;
    
    // TODO(stephen): Check whether the selector exists and return error(?) if
    //                it doesn't.
    
    self.value = new ReactiveVar(Math.random());
    self.stopped = false;
    self.handle = setInterval(function() {
        self.value.set(Math.random());
    }, 1000);
};

Datum.prototype.get = function() {
    var self = this;
    return self.value.get();
};

Datum.prototype.selector = function() {
    var self = this;
    return self.selector;
};

Datum.prototype.variable = function() {
    var self = this;
    return self.variable;
};

Datum.prototype.isRunning = function() {
    var self = this;
    return !self.stopped;
};

Datum.prototype.isStopped = function() {
    var self = this;
    return self.stopped;
};

Datum.prototype.stop = function() {
    var self = this;
    if (self.stopped === false) {
        self.handle.stop();
        self.stopped = true;
    }
};
