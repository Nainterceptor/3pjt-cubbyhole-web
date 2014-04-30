var api_call = require('../api_call/api_call')
/*
 * GET users listing.
 */

exports.index = function(req, res){
    res.render('login_html', { title: 'Login' });
};

exports.me = function(req, res){
    api_call.get('/user/my/get', {'token': req.cookies.token}, function (obj){
        console.log(obj);
        res.render('user/me_html', {user: obj.user});
    });
};