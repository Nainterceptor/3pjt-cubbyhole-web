/**
 * Created by scollin on 14/06/2014.
 */

var unirest = require('unirest');
var config = require('../config/config.js');

exports.index = function(req, res){
    unirest
        .get(config.api + '/plan/get')
        .headers({
            'Accepts': 'application/json'
        })
        .end(function (plans) {
            res.render('admin.html.twig', { plans: plans.body.plans});
        });
};