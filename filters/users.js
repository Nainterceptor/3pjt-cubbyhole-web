module.exports = function() {
    return function(req,res, next){
        if (req.cookies.token){
            next();
        } else {
            res.flashBag.add('danger', 'Login required');
            req.session.lastPage = req.url;
            res.redirect('/login');
        }
    };
};