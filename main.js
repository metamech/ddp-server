var livedata = require("./livedata_server.js");

console.log("Alive? ", (DDPServer !== null));

console.log("Attempting to start server, here goes nothing:\n\n");

var server = new livedata.Server;
