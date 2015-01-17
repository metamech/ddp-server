# ddp-server
A DDP data source for real-time data external to MongoDB.

Attempting to move livedata_server.js from Meteor's DDP package to a standalone Node 
JS package.  Right now the DDPServer is heavily tied to Meteor code which is code that 
had to be stripped out or replaced to get a DDP server working on it's own.

Right now nothing works...working on that.

TODO:
* Shim all used Meteor functions
* Test that it works?
