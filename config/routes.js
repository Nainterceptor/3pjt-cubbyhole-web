var index = require('../controllers/indexController');
var login = require('../controllers/loginController');
var user = require('../controllers/userController');
var files = {
    index: require('../controllers/files/homeController'),
    directory: require('../controllers/files/directoryController')
};

module.exports = function (express) {
    var router = express.Router();
    router.route('/user/*').all(require('../middlewares/users'));
    router.get('/', index.index);
    router.get('/login', login.index);
    router.get('/logout', user.logout);
    router.get('/register', user.registerGet);
    router.post('/register', user.registerPost);
    router.post('/login', login.login);
    router.get('/user/me', user.me);
    router.get('/user/webapp', files.index);
    router.get('/user/webapp/directory/new-directory', files.directory.getCreateDirectory);
    router.get('/user/webapp/directory/remove/:directory', files.directory.getCreateDirectory);
    router.post('/user/webapp/directory/new-directory', files.directory.removeDirectory);
    router.get('/user/webapp/directory/:directory', files.index);
    return router;
};