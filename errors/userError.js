module.exports = function (req, res, obj) {
    if (!obj.success) {
        console.log(obj.message);
        req.session.lastPage = req.url;
        res.redirect('/login');
    }
}