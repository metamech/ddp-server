// Add code here to setup handling of all streams asked for by the program.
//
// TODO(stephen): determine whether the logic for handling a stream (ddp connection or
//                connection to the server, etc) should be handled locally within the stream 
//                object or globally as 'batch'.
//                In either case, we'll probably need some global here for connection information
//                that is static.

Streams = {};

Stream = function(id) {
    var self = this;
    self.id = id;
    
    // TODO(stephen): Validate whether the user has access to this stream...somehow.
    // I'm assuming that it won't matter here and will only matter when server calls
    // are made by the functions below.
};

Stream.prototype.trackData = function(selector, variable) {
    return new Datum(selector, variable);
}

Stream.prototype.trackStat = function(selector, options, variable) {
    return new Stat(selector, options, variable);
}

Stream.prototype.id = function() {
    var self = this;
    return self.id;
};

Streams.Stream = Stream;
