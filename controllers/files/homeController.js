var unirest = require('unirest');
var config = require('../../config/config.js');

module.exports = function (req, res) {
    var output = {};
    var directory = req.params.directory;
    var url = config.api + '/files/list';
    if ('undefined' !== typeof directory) {
        url += "/" + directory;
        output.currentDirectory = directory;
    }
    var headers = {token: req.cookies.token};
    unirest
        .get(url)
        .type('json')
        .headers(headers)
        .end(function (rest) {
            var response = rest.body;
            if (response.success != true) {
                res.flashBag.add("danger", "Something failed !");
                res.render('files/home.html.twig',output);
            } else if ('undefined' !== typeof directory) {
                unirest
                    .get(config.api + '/directory/get-breadcrumb/' + directory)
                    .type('json')
                    .headers(headers)
                    .end(function(rest) {
                        output.rootline = require('../../helpers/breadcrumb.js').getNameList(rest.body);
                        output.files = response.files;
                        output.directories = response.directories;
                        res.render('files/home.html.twig',output);
                    });
            } else {
                output.rootline = [];
                output.files = response.files;
                output.directories = response.directories;
                res.render('files/home.html.twig',output);
            }
        });
};