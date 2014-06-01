module.exports = function (req, res, next) {
    if (req.cookies.token) {
            var config = require('../config/config.js');
            require('unirest')
                .get(config.api + '/user/my/get')
                .type('json')
                .send({token: req.cookies.token})
                .end(function (rest) {
                    var user = rest.body;
                    if (user.success == true) {
                        req.user = user.user;
                    } else {
                        res.clearCookie('token');
                        res.flashBag.add('warning', "Can't find user, please login again.");
                    }
                    next();
                });
    } else {
        next();
    }
};