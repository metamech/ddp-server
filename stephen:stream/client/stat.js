Stat = function(selector, options, variable) {
    var self = this;
    self.selector = selector;
    self.variable = variable;
    self.options = options;
    
    // TODO(stephen): Check whether the selector exists and return error(?) if
    //                it doesn't.
    
    self.useId = Random.id();
    self.collection = new Meteor.PassthroughCollection('StatStream');
    self.subscription = null;
    self.value = new ReactiveVar(Math.random());

    // We tell the server to send stat values using the ID that we send
    // when we subscribe.
    self.collection.observe({
        "changed": function(e) {
            console.log("changed: " + JSON.stringify(e));
            if (e._id ===self.useId) {
                self.value.set({value: e.fields.value, time: e.fields.date});
            } else {
                console.log("Not using ID: ", e);
            }
        },
    });
    
    self.subscription = Meteor.subscribe("StatStream", selector, options, self.useId);
    self.stopped = false;
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
        self.subscription.stop();
        self.stopped = true;
    }
};
