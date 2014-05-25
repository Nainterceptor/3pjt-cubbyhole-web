/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var swig = require('swig');
var less = require('less-middleware');
var bootstrapPath = path.join(__dirname, 'node_modules', 'twitter-bootstrap-3.0.0');
var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.engine('twig', swig.renderFile);
app.set('view engine', 'twig');
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.all('/user/*', function(req,res, next){
    if (req.cookies.token){
        next();
    } else {
        req.session.flashBag = {error: 'Vous devez vous connecter'};
        req.session.lastPage = req.url;
        res.redirect('/login');
    }
});
app.all('/*', function(req,res,next){
    swig.setDefaults({
        locals: {
            tokenExist: function(){return req.cookies.token},
            getFlash: function(){
                if (!req.session.flashBag){
                    req.session.flashBag = {};
                }
                if (req.session.flashBag.error){
                    return "<div class=\"alert alert-danger fade in\"><button type=\"button\" class=\"close\"" +
                        " data-dismiss=\"alert\" aria-hidden=\"true\">×</button><strong>Error! </strong>"
                        +req.session.flashBag.error+"</div>"}
                else {
                    return false;
                }
                ;},
            clearFlashError: function() {
                if (req.session.flashBag.error) {
                    req.session.flashBag.error = null;
                }
            }
        }, cache: false});
    if (!req.session.lastPage || req.url =='/'){
        req.session.lastPage = req.url;
    }
    next();
});

app.use(less({
        src: path.join(__dirname, 'private', 'less'),
        prefix: '/compiled/css',
        compress: true,
        paths: [path.join(bootstrapPath, 'less')],
        dest: path.join(__dirname, 'public', 'compiled', 'css')

    }
));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/compiled/js/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/compiled/js/bootstrap', express.static(path.join(__dirname, 'node_modules', 'twitter-bootstrap-3.0.0', 'js')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var routes = require('./config/routes')(app);


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
