/**
 * Created by scollin on 11/06/2014.
 */

var unirest = require('unirest');
var config = require('../config/config.js');

exports.add = function(req, res){
    var plan = {
        'plan': req.params.id
    };

    unirest
        .put(config.api + '/user/my/subscribe')
        .headers({
            'token': req.cookies.token
        })
        .type('json')
        .send(plan)
        .end(function (rest) {
            var subscribeResponse = rest.body;
            if (subscribeResponse.success != true) {
                switch (subscribeResponse.message) {
                    default:
                        res.flashBag.add("danger", "Something failed !");
                        break;
                }
                return;
            } else {
                res.flashBag.add("success", "Subscription successful !");
            }
            res.redirect('/');
        });
};