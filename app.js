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

// Middlewares
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser('cubbyhole'));
app.use(session());

if ('development' == app.get('env')) {
    var errorHandler = require('errorhandler');
    app.use(errorHandler());
}

app.use(less({
        src: path.join(__dirname, 'private', 'less'),
        prefix: '/css',
        compress: true,
        paths: [path.join(bootstrapPath, 'less')],
        dest: path.join(__dirname, 'public', 'css')

    }
));
swig.setFilter('bytesToReadable', function(bytes) {
    return require('numeral')(bytes).format('0.0 b');
});
swig.setDefaults({
    locals: {
        tokenExist: function(req) { return req.cookies.token },
        isAdmin: function(req) { return req.user.admin},
        getFlashs: function(res) {
            return res.flashBag.flush();
        },
        config: require('./config/config')
    }
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/js/bootstrap', express.static(path.join(__dirname, 'node_modules', 'twitter-bootstrap-3.0.0', 'js')));
app.use('/fonts', express.static(path.join(__dirname, 'node_modules', 'twitter-bootstrap-3.0.0', 'fonts')));
app.use(require('./middlewares/renderOverride'));
app.use(require('./middlewares/flashbag')());
app.use(require('./middlewares/getUserInformations'));
app.use(require('./config/routes')(express, swig));


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
