// Takes in a selector and a set of options, and passes back change events for a value
// under useId.
// TODO(stephen): write docs when not tired -.-
Meteor.publish("StatStream", function(selector, options, useId) {
    var self = this;
    check(useId, String);
    // TODO(stephen): validate permissions
    // TODO(stephen): validate options.
    // TODO(stephen): validate selector and get values for stat.
    console.log("Stat: Opening stat with ID:", useId, ", selector:", selector, "and options:", options);
    
    // set initial value
    self.added("StatStream", useId, {value: Math.random(), date: Date.now()});
    self.ready();
    
    self.handle = Meteor.setInterval(function() {
        self.changed("StatStream", useId, {value: Math.random(), date: Date.now()});
    }, 1000);
    
    self.onStop(function() {
        console.log("Stat: Closing: ", useId);
        Meteor.clearInterval(self.handle);
    });
});
