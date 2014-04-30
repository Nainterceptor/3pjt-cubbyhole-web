var index = require('../controllers/indexController');
var login = require('../controllers/loginController');
var user = require('../controllers/userController');

module.exports = function (app) {
    app.get('/', index.index);
    app.get('/login', login.index);
    app.post('/login', login.login);
    app.get('/user/me', user.me);
}