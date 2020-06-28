/*
DON'T USE THE SOLUTION TO STORE SESSION LIKE THIS IN REAL WORLD APPLICATION!!!
*/

var cache = require('memory-cache');

module.exports.add = function (sessionId) {
    cache.put(sessionId, sessionId);
}

module.exports.check = function (sessionId) {
    return cache.get(sessionId) !== null;
}

module.exports.invalidate = function (sessionId) {
    cache.del(sessionId);
}