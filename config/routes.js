var index = require('../controllers/indexController');
var login = require('../controllers/loginController');
var user = require('../controllers/userController');

module.exports = function (express) {
    var router = express.Router();
    router.use(require('../middlewares/flashbag')());
    router.route('/user/*').all(require('../middlewares/users')());
    router.get('/', index.index);
    router.get('/login', login.index);
    router.post('/login', login.login);
    router.get('/user/me', user.me);
    router.get('/user/webapp/index', require('../controllers/files/homeController'));
    return router;
};