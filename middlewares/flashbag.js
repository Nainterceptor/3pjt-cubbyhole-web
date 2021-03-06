var extend = require('util')._extend;

module.exports = function() {
    var flashbag = {};
    return function(req, res, next) {
        if (typeof flashbag[req.session.id] == 'undefined') {
            flashbag[req.session.id] = {};
        }
        var userFlashbag = flashbag[req.session.id];
        res.flashBag =  {
            add: function(type, content) {
                if (typeof userFlashbag[type] == 'undefined') {
                    userFlashbag[type] = [];
                }
                userFlashbag[type].push(content);
            },
            flush: function() {
                var bag = extend({}, userFlashbag);
                flashbag[req.session.id] = {};
                return bag;
            }
        };
        if (!req.session.lastPage || req.url =='/'){
            req.session.lastPage = req.url;
        }
        next();
    };
};