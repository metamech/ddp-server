Package.describe({
  name: 'stephen:stream',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.export('Streams');
  api.use('reactive-var');
  api.addFiles('stephen:stream.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('stephen:stream');
  api.addFiles('stephen:stream-tests.js');
});
