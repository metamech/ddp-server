Package.describe({
  name: 'stephen:stream',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.use('reactive-var');
  api.addFiles('datum.js');
  api.addFiles('stream.js');

  api.export('Streams');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('stream');
  api.addFiles('stream-tests.js');
});
