/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');
var async = require('async');

/**
* projectDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function projectDAL() {
		
    }

	/**
     * get project by id
     * @param  {Integer}   projectId
     * @param  {Function} callback
     */
    projectDAL.prototype.get = function(projectId, callback) {
        dbContext.project.find(projectId).success(function(project) {
            callback(project);
        });
    };

    /**
     * get all project
     * @param  {Function} callback
     */
    projectDAL.prototype.getAll = function(callback) {
        dbContext.project.findAll({order: 'id DESC'}).success(function(projects) {
            // callback(projects);
            async.map(projects,function(project,callback) {

                project.getImages().success(function(images) {
                    // console.log(projects); 
                    // project.UserId = JSON.stringify(images);
                    // project.yop = ['yop'];
                    // console.log(image);

                    callback(null,images);
                })
            },function(err,results) {
               if(err) console.log(err); 
               else{
                    for(var i in results)
                    {
                        projects[i] =projects[i].toJSON();
                        projects[i].images = results[i];
                    }
                     callback(projects);
               } 
            })

        });
    };

    /**
     * save project
     * @param  {Object}   project
     * @param  {Function} callback
     */
    projectDAL.prototype.save = function(project, callback) {
        var project = dbContext.project.build(project);
        project.save().success(function(project) {
            callback(project);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a project
     * @param  {Object}   project
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    projectDAL.prototype.update = function(project, attributes, callback){
        project.updateAttributes(attributes).success(function (updatedproject) { 
            callback(updatedproject);
        }); 
    };

    /**
     * delete an project
     * @param  {Integer}   projectId
     * @param  {Function} callback
     */
    projectDAL.prototype.remove = function(projectId, callback) {   
        dbContext.project.find(projectId).success(function(project) {
			project.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = projectDAL;
})();