// Add code here to setup handling of all streams asked for by the program.
//
// TODO determine whether the logic for handling a stream (ddp connection or
//      connection to the server, etc) should be handled locally within the stream 
//      object or globally as 'batch'.
//      In either case, we'll probably need some global here for connection information
//      that is static.

Streams = {};

/*
 *  Returns a ReactiveVar for the stream with the entered stream ID.
 */
Stream = function(id, interval) {
    var self = this;
    self.value = new ReactiveVar(Math.random());
    self.id = id;
    
    self.stopped = false;
    self.handle = setInterval(function() {
        self.value.set(Math.random());
    }, interval ? interval : 1000);
};

Stream.prototype.get = function() {
    var self = this;
    return self.value.get();
};

Stream.prototype.id = function() {
    var self = this;
    self.id;
};

Stream.prototype.stop = function() {
    var self = this;
    if (self.stopped === false) {
        self.handle.stop();
        self.stopped = true;
    }
};

Streams.Stream = Stream;
