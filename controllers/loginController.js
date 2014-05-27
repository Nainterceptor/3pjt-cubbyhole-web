var unirest = require('unirest');
var config = require('../config/config.js');
/*
 * GET users listing.
 */

exports.index = function(req, res){
    res.render('login.html.twig');
};

exports.login = function(req, res){
    var account = {
        email: req.body.email,
        password: req.body.password
    };
    unirest
        .post(config.api + '/user/login')
        .type('json')
        .send(account)
        .end(function (rest) {
            var loginResponse = rest.body;
            if (loginResponse.success != true) {
                switch (loginResponse.message) {
                    case 'user.login.userNotFound':
                        res.flashBag.add("danger", "User not found !");
                        break;
                    case 'user.login.passwordIsWrong':
                        res.flashBag.add("danger", "Bad password !");
                        break;
                    default:
                        res.flashBag.add("danger", "Something failed !");
                        break;
                }
                res.render('login.html.twig', account);
                return;
            }
            res.flashBag.add("success", "Login successful !");
            res.cookie('token', loginResponse.token, {maxAge: 4000000});
            res.redirect(req.session.lastPage);
        });
};