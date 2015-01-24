Datum = function(selector, variable) {
    var self = this;
    self.selector = selector;
    self.variable = variable;
    
    // TODO(stephen): Check whether the selector exists and return error(?) if
    //                it doesn't.  Probably will just return error if the subscribe
    //                command returns empty.
    
    self.useId = Random.id();
    self.collection = new Meteor.Collection('DataStream');
    self.subscription = null;
    self.value = new ReactiveVar(Math.random());
    
    // We tell the server to send datum values using the ID that we send
    // when we subscribe. 
    self.collection.find({}).observe({
        "added": function(e) {
            if (e._id === self.useId) {
                self.value.set({value: e.value, time: e.date});
            } else {
                console.log("Not using ID: ", e);
            }
        },
        "changed": function(e) {
            if (e._id === self.useId) {
                self.value.set({value: e.value, time: e.date});
            } else {
                console.log("Not using ID: ", e);
            }
        },
    });
    
    self.subscription = Meteor.subscribe("DataStream", selector, self.useId);
    self.stopped = false;
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

Datum.prototype.useId = function() {    
    var self = this;
    return self.useId;
};

Datum.prototype.stop = function() {
    var self = this;
    if (self.stopped === false) {
        self.subscription.stop();
        self.stopped = true;
    }
};
