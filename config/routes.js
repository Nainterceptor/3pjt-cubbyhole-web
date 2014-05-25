var index = require('../controllers/indexController');
var login = require('../controllers/loginController');
var user = require('../controllers/userController');

module.exports = function (express, swig) {
    var router = express.Router();
    router.use(require('../filters/flashbag')(swig));
    router.route('/user/*').all(require('../filters/users')());
    router.get('/', index.index);
    router.get('/login', login.index);
    router.post('/login', login.login);
    router.get('/user/me', user.me);
    return router;
};