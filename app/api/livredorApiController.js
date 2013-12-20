

/**
* Module dependencies.
*/
var LivredorDAL = require('../dal/livredorDAL');
var async      = require('async');

/**
* LivredorApiController class
*/
(function () {

    /**
    * Attributes.
    */
    var livredorDAL = new LivredorDAL();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function LivredorApiController(app) {
        this.routes(app);
    }

    /**
    * LivredorApiController routes.
    * @param {app} - express app.
    */
    LivredorApiController.prototype.routes = function(app) {
        app.get('/api/livredor', this.getAll);
        app.get('/api/livredor/count', this.countAll);
        app.get('/api/livredor/:id', this.get);
        app.post('/api/livredor', this.post);
        app.put('/api/livredor', this.put);
        app.post('/api/livredor/remove', this.delete);
    };

    /**
    * [httpget]
    * LivredorApiController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    LivredorApiController.prototype.getAll = function(req, res) {
        livredorDAL.getAll(function (livredors) {
            res.send(livredors);
        });
    };
    LivredorApiController.prototype.countAll = function(req, res) {
        livredorDAL.count(function (nb) {
            console.log(nb); 
            res.send(String(nb));
        });
    };

    /**
    * [httpget]
    * LivredorApiController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    LivredorApiController.prototype.get = function(req, res) {
        var livredorId = req.params.id;
        livredorDAL.get(livredorId, function (livredor) {
            if(livredor){
            	res.send(livredor);
            }
            else{
            	res.send(404);
            }
        });
    };

    /**
    * [httppost]
    * LivredorApiController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    LivredorApiController.prototype.post = function(req, res) {
        livredorDAL.save(req.body, function (livredor) {
            res.send(livredor);
        });
    };

    /**
    * [httpput]
    * LivredorApiController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    LivredorApiController.prototype.put = function(req, res) {
        console.log('req.body'); 
        console.log(req.body); 
         async.map(req.body, function(item,callback) {
            console.log('each'); 
            livredorDAL.update(item, callback);

        },function(error, results) {
            console.log('finish'); 
            console.log(error)
            if(error)
            {
                console.log('assync error each'); 
            }
            console.log('all succeed');
            res.write('success');
            res.end();
        });
    };

    /**
    * [httpdelete]
    * LivredorApiController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    LivredorApiController.prototype.delete = function(req, res) {
    console.log('dal'+req.body);   
        async.map(req.body, function(project,callback) {
            console.log('each'); 
            livredorDAL.remove(project.id, callback);

        },function(error, results) {
            console.log('finish'); 
            console.log(error)
            if(error)
            {
                console.log('assync error each'); 
            }
            console.log('all succeed');
            res.write('success');
            res.end();
        });
        
    };

    module.exports = LivredorApiController;
})();