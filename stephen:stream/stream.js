// Add code here to setup handling of all streams asked for by the program.
//
// TODO(stephen): determine whether the logic for handling a stream (ddp connection or
//                connection to the server, etc) should be handled locally within the stream 
//                object or globally as 'batch'.
//                In either case, we'll probably need some global here for connection information
//                that is static.

Streams = {};

/*
 *  Returns a ReactiveVar for the stream with the entered stream ID.
 */
Stream = function(id) {
    var self = this;
    self.value = new ReactiveVar(Math.random());
    self.id = id;
    
    // TODO(stephen): Validate whether the user has access to this stream...somehow.
};

Stream.prototype.trackData = function(selector, variable) {
    return new Datum(selector, variable);
}

Stream.prototype.id = function() {
    var self = this;
    return self.id;
};

Streams.Stream = Stream;
