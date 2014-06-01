var error = require('../errors/userError.js');
var unirest = require('unirest');
var config = require('../config/config.js');
/*
 * GET users listing.
 */

exports.index = function(req, res) {
    res.render('login.html.twig', { title: 'Login' });
};

exports.me = function(req, res) {
    res.render('user/me.html.twig', {user: req.user});
};

exports.logout = function(req, res) {
    res.flashBag.add("success", "Logout successful !");
    res.clearCookie('token');
    res.redirect('/');
};

exports.registerGet = function(req, res) {
    res.render('user/register.html.twig');
};

exports.registerPost = function(req, res) {
    if (req.body.password != req.body.passwordConfirm) {
        res.flashBag.add("danger", "Passwords not equals !");
        res.render('user/register.html.twig', req.body);
        return;
    }
    var account = {
        email: req.body.email,
        password: req.body.password
    };

    unirest
        .post(config.api + '/user/registration')
        .type('json')
        .send(account)
        .end(function (rest) {
            var registrationResponse = rest.body;
            if (registrationResponse.success != true) {
                if (registrationResponse.message == 'validator.error') {
                    for (key in registrationResponse.errors) {
                        if (registrationResponse.errors.hasOwnProperty(key)) {
                            switch (registrationResponse.errors[key].message) {
                                case 'validator.email.alreadyExist':
                                    res.flashBag.add("danger", "Email already registered !");
                                    break;
                                case 'validator.email.notValid':
                                    res.flashBag.add("danger", "Email not valid !");
                                    break;
                                case 'validator.email.isEmpty':
                                    res.flashBag.add("danger", "Email is empty !");
                                    break;
                                case 'validator.hashed_password.isEmpty':
                                    res.flashBag.add("danger", "Password is empty !");
                                    break;
                                default:
                                    res.flashBag.add("danger", "Something failed ! (" + registrationResponse.errors[key].message + ")");
                                    break;
                            }
                        }
                    }
                }
                res.render('user/register.html.twig', account);
                return;
            }
            res.flashBag.add("success", "Sign up successful !");
            res.redirect('/login');
        });
};