var api_call = require('../api_call/api_call')
/*
 * GET users listing.
 */

exports.index = function(req, res){
    res.render('login_html', { title: 'Login' });
};

exports.login = function(req, res){
    api_call.post('/user/login', null,{
        'email': req.body.email,
        'password': req.body.password
    }, function (obj){
        res.cookie('token', obj.token, {maxAge: 4000000});
        console.log(req.session.lastPage);
        res.redirect(req.session.lastPage);
    });
};