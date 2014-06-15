/**
 * Created by scollin on 14/06/2014.
 */

var unirest = require('unirest');
var config = require('../../config/config.js');

exports.getCreatePlan = function (req, res) {
    res.render('plans/createPlan.html.twig');
};

exports.postCreatePlan = function (req, res) {
    var output = req.body;
    var url = config.api + '/plan/create';

    unirest
        .post(url)
        .type('json')
        .send(output)
        .headers({token: req.cookies.token})
        .end(function (rest) {
            var response = rest.body;
            if (response.success != true) {
                res.flashBag.add("danger", "Something failed !");
                res.render('plans/createPlan.html.twig', output);
            } else {
                res.flashBag.add("success", "Plan successful created !");
                res.redirect('/admin');
            }
        });
};

exports.getEditPlan = function (req, res) {
    var plan = {
        '_id': req.params.id
    };
    unirest
        .get(config.api + '/plan/get')
        .query(plan)
        .end(function(rest) {
           var response = rest.body;
            res.render('plans/editPlan.html.twig',response.plan);
        });
};

exports.postEditPlan = function (req, res) {
    var plan = {
        '_id': req.params.id
    };
    var output = req.body;
    var url = config.api + '/plan/update';

    unirest
        .post(url)
        .type('json')
        .query(plan)
        .send(output)
        .headers({token: req.cookies.token})
        .end(function (rest) {
            var response = rest.body;
            if (response.success != true) {
                res.flashBag.add("danger", "Something failed !");
                res.render('plans/editPlan.html.twig', output);
            } else {
                res.flashBag.add("success", "Plan successful updated !");
                res.redirect('/admin');
            }
        });
};

exports.removePlan = function (req, res) {
    var plan = {
        '_id': req.params.id
    };
    var url = config.api + '/plan/remove';
    unirest
        .delete(url)
        .type('json')
        .send(plan)
        .headers({token: req.cookies.token})
        .end(function (rest) {
            var response = rest.body;
            if (response.success != true) {
                res.flashBag.add("danger", "Something failed !");
                res.render('/admin');
            } else {
                res.flashBag.add("success", "Plan successful deleted !");
                res.redirect('/admin');
            }
        });
};

exports.getPlans = function (req, res) {
    res.render('admin.html.twig');

};