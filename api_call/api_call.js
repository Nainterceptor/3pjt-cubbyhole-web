var host = require('../config/config').host;

var api_call = require('../api_call/index').createJSONClient({
    url: host
});
var querystring = require('querystring');


exports.get = function (path, params, success){
    var paramsQuery;
    if (typeof params === 'undefined' || params == null){
        paramsQuery = '';
    } else {
        paramsQuery ='?' + querystring.stringify(params);
    }
    api_call.get(host + path + paramsQuery, function(err, req, res, obj) {
        req.write(JSON.stringify(obj));
        success(obj);
        req.end();
    });
};

exports.post = function (path, params, data, success){
    var paramsQuery;
    if (typeof params === 'undefined' || params == null){
        paramsQuery = '';
    } else {
        paramsQuery ='?' + querystring.stringify(params);
    }
    if (typeof data === 'undefined'){
        data = null;
    }
    api_call.post(host + path + paramsQuery, data, function(err, req, res, obj) {
        req.write(JSON.stringify(obj));
        success(obj);
        req.end();
    });
};

exports.put = function (path, params, data, success){
    var paramsQuery;
    if (typeof params === 'undefined' || params == null){
        paramsQuery = '';
    } else {
        paramsQuery ='?' + querystring.stringify(params);
    }
    if (typeof data === 'undefined'){
        data = null;
    }
    api_call.put(host + path + paramsQuery, data, function(err, req, res, obj) {
        req.write(JSON.stringify(obj));
        success(obj);
        req.end();
    });
};

exports.del = function (path, params, data, success){
    var paramsQuery;
    if (typeof params === 'undefined' || params == null){
        paramsQuery = '';
    } else {
        paramsQuery ='?' + querystring.stringify(params);
    }
    if (typeof data === 'undefined'){
        data = null;
    }
    api_call.del(host + path + paramsQuery, data, function(err, req, res, obj) {
        req.write(JSON.stringify(obj));
        success(obj);
        req.end();
    });
};