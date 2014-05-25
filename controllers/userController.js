var error = require('../errors/userError.js');
/*
 * GET users listing.
 */

exports.index = function(req, res){
    res.render('login.html.twig', { title: 'Login' });
};

exports.me = function(req, res){

    api_call.get('/user/my/get', {'token': req.cookies.token}, function (obj){
            error(req, res, obj);
            res.render('user/me_html', {user: obj.user});
//        if (!obj.success) {
//            error(req, res, obj);
//        } else {
//            res.render('user/me_html', {user: obj.user});
//        }
    });
};