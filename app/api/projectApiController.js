

/**
* Module dependencies.
*/
var ProjectDAL = require('../dal/projectDAL');
var async      = require('async');
/**
* projectApiController class
*/
(function () {

    /**
    * Attributes.
    */
    // var projectDAL = new projectDAL();
    var projectDAL = new ProjectDAL();
    /**
    * Constructor.
    * @param {app} - express app.
    */
    function projectApiController(app) {
        this.routes(app);
    }

    /**
    * projectApiController routes.
    * @param {app} - express app.
    */
    projectApiController.prototype.routes = function(app) {
        app.get('/api/project', this.getAll);
        app.get('/api/project/count', this.countAll );
        app.get('/api/project/:id', this.get);
        app.post('/api/project', this.post);
        app.put('/api/project', this.put);
        app.post('/api/project/remove', this.delete);
    };

    /**
    * [httpget]
    * projectApiController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    projectApiController.prototype.getAll = function(req, res) {
        projectDAL.getAll(function (projects) {
            res.send(projects);
        });
    };
    projectApiController.prototype.countAll = function(req, res) {
        console.log('here'); 
        projectDAL.countAll(function (nb) {
            console.log('countALL'); 
            console.log(nb); 
            res.send(String(nb));
        });
    };

    /**
    * [httpget]
    * projectApiController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    projectApiController.prototype.get = function(req, res) {
        var projectId = req.params.id;
        projectDAL.get(projectId, function (project) {
            if(project){
            	res.send(project);
            }
            else{
            	res.send(404);
            }
        });
    };

    /**
    * [httppost]
    * projectApiController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    projectApiController.prototype.post = function(req, res) {
        console.log('req.body'); 
        console.log(req.body); 
        projectDAL.save(req.body, function (project) {
            console.log('saved!'); 
            res.send(project);
        });
    };

    /**
    * [httpput]
    * projectApiController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    projectApiController.prototype.put = function(req, res) {
        var proj = req.body;
        console.log(proj); 
        projectDAL.get(proj.id, function(entity){
            if(entity){
                projectDAL.update(entity, proj, function (project) {
                    res.send(project);
                });
            }
            else{
                res.send(404);
            }
        });
    };

    /**
    * [httpdelete]
    * projectApiController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    projectApiController.prototype.delete = function(req, res) {
        
        console.log(req.body); 

        async.map(req.body, function(project,callback) {
                console.log('each'); 
                projectDAL.remove(project.id, callback);

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




        // userDal.getMulti({ where: { id: req.body } },function(users) {
        //     console.log('users');
        //     var tab =[];
            

        // });






        // projectDAL.remove(req.body.id, function () {
        //     res.send({mesage: 'project delete'});
        // });
    };

    module.exports = projectApiController;
})();