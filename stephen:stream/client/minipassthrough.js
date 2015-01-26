Minipassthrough = {};

// This store does nothing.  You can only observe it (no finds, etc) and
// listen for changes.  Nothing is stored for posterity.
Minipassthrough.Store = function(name) {
    var self = this;
    self.name = name;
    self.observers = [];
};

Minipassthrough.Store.prototype.observe = function(callbacks) {
    var self = this;
    console.log("Adding cbs to observers: " + callbacks);
    self.observers.push(callbacks);
    
    return {
        stop: function() {
            self.observers = _.filter(self.observers, function(cbs) {
                return cbs !== callbacks
            });
        },
    };
};

_.extend(Minipassthrough.Store.prototype, {
    _changed: function(id, obj) {
        var self = this;
        self._notifyObservers(id, "changed", obj);
    },
    _notifyObservers: function(id, event, obj) {
        var self = this;
        _.each(self.observers, function(cbs) {
            cbs[event] && cbs[event]({_id: id, fields: obj});
        });
    },
});
