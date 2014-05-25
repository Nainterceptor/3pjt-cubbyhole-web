module.exports = function() {
    return function(req,res, next){
        if (req.cookies.token){
            next();
        } else {
            req.session.flashBag = {error: 'Vous devez vous connecter'};
            req.session.lastPage = req.url;
            res.redirect('/login');
        }
    };
};