module.exports = function (req, res, obj) {
    if (!obj.success) {
        req.session.flashBag = {error: obj.message};
        req.session.lastPage = req.url;
        res.redirect('/login');
    }
}