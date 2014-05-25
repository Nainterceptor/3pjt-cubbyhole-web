var unirest = require('unirest');
var config = require('../config/config.js');
/*
 * GET home page.
 */

exports.index = function(req, res) {
    unirest
        .get(config.api + '/plan/get')
        .headers({
            'Accepts': 'application/json'
        })
        .end(function (plans) {
            res.render('index.html.twig', { plans: plans.body.plans});
        });

};
