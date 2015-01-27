// A data stream, use publish get in a selector, and pass data 'change' events
// when modified.  
Meteor.publish("DataStream", function(selector, useId) {
    var self = this;
    check(useId, String);
    // TODO(stephen): validate permissions
    // TODO(stephen): validate selector and get values for datum.
    console.log("Datum: Opening datum with ID:", useId, "and selector:", selector);
    
    // set initial value
    self.added("DataStream", useId, {value: Math.random(), date: Date.now()});
    self.ready();
    
    self.handle = Meteor.setInterval(function() {
        self.changed("DataStream", useId, {value: Math.random(), date: Date.now()});
    }, 1000);
    
    self.onStop(function() {
        console.log("Datum: Closing: ", useId);
        Meteor.clearInterval(self.handle);
    });
});
