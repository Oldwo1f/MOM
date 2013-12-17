/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* imageDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function imageDAL() {
		
    }

	/**
     * get image by id
     * @param  {Integer}   imageId
     * @param  {Function} callback
     */
    imageDAL.prototype.get = function(imageId, callback) {
        dbContext.image.find(imageId).success(function(image) {
            callback(image);
        });
    };

    /**
     * get all image
     * @param  {Function} callback
     */
    imageDAL.prototype.getAll = function(callback) {
        dbContext.image.findAll({order: 'id DESC'}).success(function(images) {
            callback(images);
        });
    };

    /**
     * save image
     * @param  {Object}   image
     * @param  {Function} callback
     */
    imageDAL.prototype.save = function(image, callback) {
        var image = dbContext.image.build(image);
        image.save().success(function(image) {
            callback(image);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a image
     * @param  {Object}   image
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    imageDAL.prototype.update = function(image, attributes, callback){
        image.updateAttributes(attributes).success(function (updatedimage) { 
            callback(updatedimage);
        }); 
    };

    /**
     * delete an image
     * @param  {Integer}   imageId
     * @param  {Function} callback
     */
    imageDAL.prototype.remove = function(imageId, callback) {   
        dbContext.image.find(imageId).success(function(image) {


            image.destroy().success(function() {
                callback();
            });
        })
    };
    imageDAL.prototype.sync = function(callback) { 
        // var img = {name:'toto',title:"tata"};
        // var image = dbContext.image.build(img);
        // var proj = {};
        // proj.name = 'Mon premier projet';
        // proj.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        // var project = dbContext.project.build(proj);
        
        
        // image.save().success(function(image) {
            
        // }).error(function(error) {
        //     callback({message: error});
        // });

        // project.save().success(function(image) {
        //     callback(image);
        // }).error(function(error) {
        //     callback({message: error});
        // });

        // // project.setImages([image]).success(function() {
        // //     console.log('sucess'); 
        // // })
        


    };

    module.exports = imageDAL;
})();