if (Meteor.isClient) {

  var stream = new Streams.Stream("4");
  var random = stream.trackData("", "temperature");
  
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
