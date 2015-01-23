if (Meteor.isClient) {

  var ReactiveRandom = {
      randomDep: new Deps.Dependency,
      randomNum: Math.random(),
    
      get: function() {
          var self = this;
          self.randomDep.depend();
          return self.randomNum;
      },
      
      change: function() { 
          var self = this;
          self.randomNum = Math.random();
          self.randomDep.changed();
      },
  };
  
  Template.hello.helpers({
    random: function () {
        return ReactiveRandom.get(); 
    }
  });
  
  setInterval(function() {
      ReactiveRandom.change();
  }, 1000);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
