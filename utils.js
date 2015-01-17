// utils.js
module.exports = {
    _debug: function(/* arguments */) {
        // Chrome and Safari only hyperlink URLs to source files in first argument of
        // console.log, so try to call it with one argument if possible.
        // Approach taken here: If all arguments are strings, join them on space.
        // See https://github.com/meteor/meteor/pull/732#issuecomment-13975991
        var allArgumentsOfTypeString = true;
        for (var i = 0; i < arguments.length; i++)
            if (typeof arguments[i] !== "string")
                allArgumentsOfTypeString = false;

        if (allArgumentsOfTypeString)
            console.log.apply(console, [Array.prototype.join.call(arguments, " ")]);
        else
            console.log.apply(console, arguments);
    },
    isDebug: true,
}
