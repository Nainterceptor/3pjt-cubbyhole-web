module.exports = function() {
    return function(req,res, next){
        if (req.cookies.token){
            next();
        } else {
            req.flashBag.add('error', 'Login required');
            req.session.lastPage = req.url;
            res.redirect('/login');
        }
    };
};