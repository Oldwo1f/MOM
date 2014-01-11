/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');
var async = require('async');

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
    imageDAL.prototype.count = function(callback) {
        dbContext.image.count().success(function(nb) {
            console.log( nb ); 
            callback(nb);
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
     * get all image
     * @param  {Function} callback
     */
    imageDAL.prototype.getAllWithProj = function(callbackk) {
        dbContext.image.findAll({order: 'id DESC'}).success(function(images) {
            
            async.map(images,function(image,cb) {
                image.getProjects().success(function(projects) {
                    // console.log(projects); 
                    image.projects = JSON.stringify(projects);
                    // console.log(image); 
                    cb(null,JSON.stringify(projects));
                })
            },function(err,results) {
               if(err) console.log(err); 
               else{
                    for(var i in images)
                    {
                        // console.log('__________________________________'+i); 
                        // console.log(results[i]); 
                       // if(i==3){console.log(images[i]);} 
                        // images[i].dataValues.projects = '';

                        images[i].url = JSON.parse(results[i]);
                        // if(i==3){console.log(images[i]);} 
                        // console.log(images); 
                       
                    }
                     callbackk(images);
               }
                
                
            });





        });
    };
 imageDAL.prototype.getAllWithArticle = function(callbackk) {
    console.log('GETWithARticle'); 
        dbContext.image.findAll({order: 'id DESC'}).success(function(images) {
            
            async.map(images,function(image,cb) {
                image.getArticles().success(function(projects) {
                    // console.log(projects); 
                    image.articles = JSON.stringify(projects);
                    // console.log(image); 
                    cb(null,JSON.stringify(projects));
                })
            },function(err,results) {
               if(err) console.log(err); 
               else{
                    for(var i in images)
                    {
                        // console.log('__________________________________'+i); 
                        // console.log(results[i]); 
                       // if(i==3){console.log(images[i]);} 
                        // images[i].dataValues.projects = '';

                        images[i].url = JSON.parse(results[i]);
                        // if(i==3){console.log(images[i]);} 
                        // console.log(images); 
                       
                    }
                     callbackk(images);
               }
                
                
            });





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
    imageDAL.prototype.linkProj = function(projId,imageId,callback) { 
        
        async.parallel({
            img : function(callback){
               dbContext.image.find(imageId).success(function(img) {
                    callback(null,img)
                });
            },
            proj:function(callback){
                dbContext.project.find(projId).success(function(proj) {
                    callback(null,proj)
                });
            }
        },
        function(err, results){
            results.proj.addImage(results.img).success(function() {
                console.log('sucessSet');
                callback();
            })
        });
    };
    imageDAL.prototype.unlinkProj = function(projId,imageId,callback) { 
        
        async.parallel({
            img : function(callback){
               dbContext.image.find(imageId).success(function(img) {
                    callback(null,img)
                });
            },
            proj:function(callback){
                dbContext.project.find(projId).success(function(proj) {
                    callback(null,proj)
                });
            }
        },
        function(err, results){
            results.proj.removeImage(results.img).success(function() {
                console.log('sucessSet');
                callback();
            })
        });
    };
imageDAL.prototype.linkArticle = function(projId,imageId,callback) { 
        
        async.parallel({
            img : function(callback){
               dbContext.image.find(imageId).success(function(img) {
                    callback(null,img)
                });
            },
            proj:function(callback){
                dbContext.article.find(projId).success(function(proj) {
                    callback(null,proj)
                });
            }
        },
        function(err, results){
            results.proj.addImage(results.img).success(function() {
                console.log('sucessSet');
                callback();
            })
        });
    };
    imageDAL.prototype.unlinkArticle = function(projId,imageId,callback) { 
        
        async.parallel({
            img : function(callback){
               dbContext.image.find(imageId).success(function(img) {
                    callback(null,img)
                });
            },
            proj:function(callback){
                dbContext.article.find(projId).success(function(proj) {
                    callback(null,proj)
                });
            }
        },
        function(err, results){
            results.proj.removeImage(results.img).success(function() {
                console.log('sucessSet');
                callback();
            })
        });
    };

    module.exports = imageDAL;
})();