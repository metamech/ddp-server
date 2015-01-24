// Write your tests here!
// Here is an example.
Tinytest.add('Intellimatics Stream lib - Simple Test', function (test) {
    stream = new Streams.Stream("test");
    test.isNotNull(stream, "Stream value is null");
});
