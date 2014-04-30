var api_call = require('../api_call/api_call');
/*
 * GET home page.
 */

exports.index = function(req, res){
    api_call.get('/plan/get', null, function (obj){
        res.render('index_html', { plans: obj.plans});
    });
};
