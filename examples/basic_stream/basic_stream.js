if (Meteor.isClient) {

  var stream = new Streams.Stream("4");
  var random = stream.trackData("", "temperature");
  var options = {
      include: [
          'average', // average using default configuration
          { name: 'min', interval: [-7*24*60*60, 0] } // minimum over the past week
      ]
  };
  var stat = stream.trackStat("", options, "temperature");
  
  Template.hello.helpers({
    datum: function () {
        return random.get(); 
    },
    stat: function () {
        return stat.get(); 
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
