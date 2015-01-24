// A data stream, use publish to 'added' and initial value and use 'change'
// to modify it.  Basically there will only be one value in the 'cursor' at 
// a time.
Meteor.publish("DataStream", function(selector, useId) {
    var self = this;
    check(useId, String);
    // TODO(stephen): validate permissions
    // TODO(stephen): validate selector and get values for datum.
    console.log("Opening datum with ID:", useId, "and selector:", selector);
    
    // set initial value
    self.added("DataStream", useId, {value: Math.random(), date: Date.now()});
    self.ready();
    
    self.handle = Meteor.setInterval(function() {
        self.changed("DataStream", useId, {value: Math.random(), date: Date.now()});
    }, 1000);
    
    self.onStop(function() {
        console.log("Closing: ", useId);
        Meteor.clearInterval(self.handle);
    });
});
