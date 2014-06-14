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
                if (response.message == 'validator.error') {
                    for (key in response.errors) {
                        if (response.errors.hasOwnProperty(key)) {
                            switch (response.errors[key].message) {
                                case 'validator.directory.name.alreadyExist':
                                    res.flashBag.add("danger", "Name already exist in this directory !");
                                    break;
                                case 'validator.name.notValid':
                                    res.flashBag.add("danger", "Name not valid !");
                                    break;
                                case 'validator.name.isEmpty':
                                    res.flashBag.add("danger", "Name is empty !");
                                    break;
                                default:
                                    res.flashBag.add("danger", "Something failed ! (" + response.errors[key].message + ")");
                                    break;
                            }
                        }
                    }
                } else {
                    res.flashBag.add("danger", "Something failed !");
                }
                res.render('files/createDirectory.html.twig',output);
            } else {
                res.flashBag.add("success", "Directory successful created !");
                res.redirect('/user/webapp/directory/' + response.directory._id);
            }
        });
};

exports.removeDirectory = function (req, res) {

};