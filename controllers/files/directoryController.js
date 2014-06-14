var unirest = require('unirest');
var config = require('../../config/config.js');

exports.getCreateDirectory = function (req, res) {
    res.render('files/createDirectory.html.twig');
};

exports.postCreateDirectory = function (req, res) {
    var output = {};
    var restParams = {};
    var url = config.api + '/directory/create';

    var parent = req.query.parent;
    if ('undefined' !== typeof parent) {
        restParams.parent = parent;
        output.parent = parent;
    }

    var name = req.body.name;
    restParams.name = name;
    output.name = name;
    unirest
        .post(url)
        .type('json')
        .send(restParams)
        .headers({token: req.cookies.token})
        .end(function (rest) {
            var response = rest.body;
            if (response.success != true) {
                res.flashBag.add("danger", "Something failed !");
                res.render('files/createDirectory.html.twig',output);
            } else {
                res.flashBag.add("success", "Directory successful created !");
                res.redirect('/user/webapp/directory/' + response.directory._id);
            }
        });
};

exports.removeDirectory = function (req, res) {

};