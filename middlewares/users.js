module.exports = function() {
    return function(req,res, next){
        if (req.cookies.token){
            if (typeof req.session.user === 'undefined') {
                var config = require('../config/config.js');
                require('unirest')
                    .get(config.api + '/user/my/get')
                    .type('json')
                    .send({token: req.cookies.token})
                    .end(function (rest) {
                        var user = rest.body;
                        if (user.success == true) {
                            req.session.user = user.user;
                        } else {
                            res.flashBag.add('warning', "Can't find user, please login again.");
                        }
                        next();
                    });
            } else {
                next();
            }
        } else {
            res.flashBag.add('danger', 'Login required');
            req.session.lastPage = req.url;
            res.redirect('/login');
        }
    };
};