/**
 * Created by scollin on 14/06/2014.
 */

module.exports = function(req, res, next){
    if (req.user.admin) {
        next();
    } else {
        res.flashBag.add('danger', 'Permission denied');
        req.session.lastPage = req.url;
        res.redirect('/login');
    }
};