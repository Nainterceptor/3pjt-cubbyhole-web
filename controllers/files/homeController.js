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
    unirest
        .get(url)
        .type('json')
        .headers({token: req.cookies.token})
        .end(function (rest) {
            var response = rest.body;
            if (response.success != true) {
                res.flashBag.add("danger", "Something failed !");
            } else {
                unirest
                    .get(config)
                output.files = response.files;
                output.directories = response.directories;
            }
            res.render('files/home.html.twig',output);
        });
};