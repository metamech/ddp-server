Package.describe({
  name: 'stephen:stream',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.use('reactive-var', ['client']);
  api.use('underscore', ['client']);
  
  api.addFiles('client/minipassthrough.js', ['client']);
  api.addFiles('client/local_collection_driver.js', ['client']);
  api.addFiles('client/passthrough_collection.js', ['client']);
  api.addFiles('client/datum.js', ['client']);
  api.addFiles('client/stat.js', ['client']);
  api.addFiles('client/stream.js', ['client']);
  
  api.addFiles('server/datum.js', ['server']);
  api.addFiles('server/stat.js', ['server']);
  api.addFiles('server/stream.js', ['server']);

  api.export('Streams');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('stream');
  api.addFiles('stream-tests.js');
});
