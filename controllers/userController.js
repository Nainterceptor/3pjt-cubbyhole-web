var error = require('../errors/userError.js');
var unirest = require('unirest');
var config = require('../config/config.js');
/*
 * GET users listing.
 */

exports.index = function(req, res){
    res.render('login.html.twig', { title: 'Login' });
};

exports.me = function(req, res){
    unirest
        .get(config.api + '/user/my/get')
        .type('json')
        .send({'token': req.cookies.token})
        .end(function (rest) {
            error(req, res, rest.body);
            res.render('user/me.html.twig', {user: rest.body.user});
        });
};