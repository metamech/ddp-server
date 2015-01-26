LocalCollectionDriver = function() {
    var self = this;
    // TODO(stephen): figure out what the differnce between these two variables is.
    self.noConnCollections = {};
    self.noConnStore = null;
};

var ensureCollection = function(name, collections) {
    if (!(name in collections)) {
        collections[name] = new Minipassthrough.Store(name);
    }
    return collections[name];
};

_.extend(LocalCollectionDriver.prototype, {
    open: function(name, conn) {
        var self = this;   
        return ensureCollection(name, self.noConnCollections);
    },
});

// singleton
LocalCollectionDriver = new LocalCollectionDriver;
