var unirest = require('unirest');
var config = require('../../config/config.js');

exports.removeFile = function (req, res) {
    var url = config.api + '/file/remove/' + req.params.file;
    unirest
        .delete(url)
        .headers({token: req.cookies.token})
        .end(function (rest) {
            res.flashBag.add("success", "File successful removed !");
            var dir = req.params.directory;
            var urlToRedirect = '/user/webapp';
            if ('undefined' != typeof dir) {
                urlToRedirect += '/directory/' + dir;
            }
            res.redirect(urlToRedirect);
        });
};