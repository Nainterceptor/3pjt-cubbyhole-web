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

exports.getEditFile = function(req, res) {
    var headers = {token: req.cookies.token};
    unirest
        .get(config.api + '/file/get/' + req.params.file)
        .headers(headers)
        .end(function(rest) {
            var response = rest.body;
            res.render('files/editFile.html.twig', response.file);
        });
};

exports.postEditFile = function(req, res) {
    var output = req.body;
    var url = config.api + '/file/update/' + req.params.file + '/edit-rights';

    unirest
        .post(url)
        .type('json')
        .send(output)
        .headers({token: req.cookies.token})
        .end(function (rest) {
                    var response = rest.body;
                    if (response.success != true) {
                        res.flashBag.add("danger", "Something failed !");
                        res.render('files/editFile.html.twig', output);
                    } else {
                        res.flashBag.add("success", "File successful updated !");
                        res.redirect('/user/webapp');
                    }
        });
};