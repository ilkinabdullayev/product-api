module.exports = function(req, res, next) {
    console.log('Logging...');
    next();
}