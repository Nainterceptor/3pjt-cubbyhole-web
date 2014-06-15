var index = require('../controllers/indexController');
var login = require('../controllers/loginController');
var user = require('../controllers/userController');
var admin = require('../controllers/adminController');
var files = {
    index: require('../controllers/files/homeController'),
    directory: require('../controllers/files/directoryController'),
    file: require('../controllers/files/fileController')
};
var plans = {
    plan: require('../controllers/admin/planController')
}
var isUser = require('../middlewares/users');
var isAdmin = require('../middlewares/admin');
module.exports = function (express) {
    var router = express.Router();

    router.route('/user/*').all(isUser);
    router.get('/', index.index);
    router.get('/login', login.index);
    router.get('/logout', user.logout);
    router.get('/register', user.registerGet);
    router.post('/register', user.registerPost);
    router.post('/login', login.login);
    router.get('/user/me', user.me);

    router.get('/user/webapp', files.index);

    router.get('/user/webapp/directory/new-directory', files.directory.getCreateDirectory);
    router.post('/user/webapp/directory/new-directory', files.directory.postCreateDirectory);
    router.get('/user/webapp/directory/remove/:directory', files.directory.removeDirectory);
    router.get('/user/webapp/directory/:directory', files.index);
    router.get('/user/webapp/directory/edit/:directory', files.directory.getEditDirectory);
    router.post('/user/webapp/directory/edit/:directory', files.directory.postEditDirectory);

    router.get('/user/webapp/file/remove/:file', files.file.removeFile);
    router.get('/user/webapp/:directory/file/remove/:file', files.file.removeFile);

    router.get('/user/addplan/:id', require('../controllers/planController').add);

    router.route('/admin/*').all(isUser, isAdmin);
    router.get('/admin',isUser, isAdmin, admin.index);
    router.get('/admin/plan/new-plan', plans.plan.getCreatePlan);
    router.get('/admin/plan/edit-plan/:id', plans.plan.getEditPlan);
    router.get('/admin/plan/remove/:id', plans.plan.removePlan);
    router.post('/admin/plan/new-plan', plans.plan.postCreatePlan);
    router.post('/admin/plan/edit-plan/:id', plans.plan.postEditPlan);


    return router;
};