var passport          = require('passport');
var MembershipFilters = require('../../middleware/membershipFilters');



/**
* homeController class
*/
(function () {

    var filters = new MembershipFilters();
    

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function HomeController(app) {
        this.routes(app);
    }

    /**
     * Controller routes
     * @param  {express} app
     */
    HomeController.prototype.routes = function(app) {
        app.get('/',filters.authorize, this.index);
        app.get('/home',filters.authorize, this.index);
        app.get('/home/index',filters.authorize, this.index);
        app.get('/index',filters.authorize, this.index);
        app.get('/project',filters.authorize, this.project);
        app.get('/images',filters.authorize, this.images);
        app.get('/article',filters.authorize, this.article);
        app.get('/settings',filters.authorize, this.settings);
        app.get('/livredor',filters.authorize, this.livredor);
        app.get('/dashboard',filters.authorize, this.dashboard);
    };

    /**
     * [HttpGet].
     * index action
     * @param  {request} req
     * @param  {response} res
     */
    HomeController.prototype.index = function(req, res) {
        res.render('index');
    };
    /**
     * [HttpGet].
     * project action
     * @param  {request} req
     * @param  {response} res
     */
    HomeController.prototype.project = function(req, res) {
        res.render('project/project');
    };

    HomeController.prototype.article = function(req, res) {
        res.render('article/article');
    };
/**
     * [HttpGet].
     * images action
     * @param  {request} req
     * @param  {response} res
     */
    HomeController.prototype.images = function(req, res) {
        res.render('image/images');
    };
    HomeController.prototype.settings = function(req, res) {
        res.render('shared/settings');
    };

 HomeController.prototype.livredor = function(req, res) {
        res.render('livredor/livredor');
    };

 HomeController.prototype.dashboard = function(req, res) {
        res.render('shared/dashboard');
    };


    

    module.exports = HomeController;
})();