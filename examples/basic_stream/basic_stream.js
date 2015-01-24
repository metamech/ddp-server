if (Meteor.isClient) {

  var random = new Streams.Stream("4", 1000);
  
  Template.hello.helpers({
    random: function () {
        return random.get(); 
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
