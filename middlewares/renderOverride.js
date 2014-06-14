module.exports = function(req, res, next) {
    var render = res.render;
    res.render = function(view, options, fn) {
        var self = this,
            options = options || {},
            req = this.req,
            defaultFn;

        if ('function' == typeof options) {
            fn = options, options = {};
        }

        defaultFn = function(err, str){
            if (err) return req.next(err);
            self.send(str);
        };

        if ('function' != typeof fn) {
            fn = defaultFn;
        }
        options.res = res;
        options.req = req;
        options.session = req.session;
        options.cookies = req.cookies;
        options.user = req.user;
        render.call(self, view, options, function(err, str) {
            fn(err, str);
        });
    };
    next();
};