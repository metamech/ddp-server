// options.connection, if give, is a LivedataClient
// TODO(stephen): get this working on the server
Meteor.PassthroughCollection = function(name, options) {
    var self = this;
    if (! (self instanceof Meteor.PassthroughCollection))
        throw new Error('use "new" to construct a Meteor.PassthroughCollection');
    
    if (!name && (name !== null)) {
        Meteor._debug("Warning: creating anonymous collection.  It will not be " + 
                "saved or synchronized over the network.  (Pass null for " + 
                "the colection name to turn off this warning.)");
        
        name = null;
    }
    
    if (name !== null && typeof name !== "string") {
        throw new Error(
                "First argument to new Meteor.PassthroughCollection must be a string or null");
    }
    
    if (name !== null) {
        self._factory(name, options);
        return self;
    } else {
        self._factory();
        return self;
    }
};

Meteor.PassthroughCollection.prototype._factory = function(name, options) {
    var self = this;

    options = _.extend({
        _connection: undefined,
        _driver: undefined,
    }, options);
    
    self._makeNewId = function() {
        var src = name ? DDP.randomStream('/collection/' + name) : Random;
        return src.id();
    };
    
    if (! name || options.connection === null)
        self._connection = null;
    else if (options.connection)
        self._connection = options.connection;
    else if (Meteor.isClient)
        self._connection = Meteor.connection;
    else {
        // TODO(stephen): This shouldn't happen, but makes sure that it works
        // when the collection on the server is supported.
        self._connection = Meteor.server;
    }
    
    if (!options.driver) {
        options._driver = LocalCollectionDriver;
    }
    
    // TODO(stephen): create connection here if needed.  A passthrough won't need 
    // a backing store so might just delete this later when it's confirmed that we're
    // good without.
    self._collection = options._driver.open(name, self.connection); 
    self._name = name || "";
    
    if (self._connection && self._connection.registerStore) {
        // This is where Meteor starts sending our collection data from the 
        // subscribe call.  It's all based on the name parameter.  Going to 
        // implement a few functions here that are required by the DDP connection.
        var ok = self._connection.registerStore(name, {
            // Called at the beginning of a batch of updates.  batchSize is the number 
            // of update calls to expect.
            beginUpdate: function(batchSize, reset) {
                if (batchSize > 1 || reset) {
                    // TODO(stephen): figure out if this should be defined by us or not.
                    self._connection.pauseObservers();
                }
                
                if (reset) {
                    // TODO(stephen): figure out if this should be defined by us or not.
                    self._connection._drop();
                }
                
                console.log("beginUpdate called, batchSize: " + batchSize + ", reset: " + reset);
            },
            
            // Apply an update
            // This is where the message comes in from DDP.
            update: function(msg) {
                var key = msg.id;
                console.log("Update message received: " + JSON.stringify(msg));
                self._collection._changed(msg["id"], msg["fields"]);
            },
            
            // Called at the end of a batch of updates.
            endUpdate: function() {
                //console.log("End update called");
                // TODO(stephen): This should be implemented by us if we need it.
                //self._connection.resumeObservers();
            },
            
            // TODO(stephen): Figure out what this is for.
            saveOriginals: function() {},
            // TODO(stephen): Figure out what this is for.
            retrieveOriginals: function() {},
        });
        
        if (!ok) {
            throw new Error("There is already a connection named '" + name + "'");
        } else {
            console.log("Collection created for: " + name);
        }
    } else {
        throw new Error("registerStore not defined on the _connection");
    }
};

_.extend(Meteor.PassthroughCollection.prototype, {
    observe: function(observer) {
        var self = this;
        return self._collection.observe(observer);
    },
});
