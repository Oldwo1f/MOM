/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

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
            callback(projects);
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