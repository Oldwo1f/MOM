/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');
var async = require('async');
/**
* articleDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function articleDAL() {
		
    }

	/**
     * get article by id
     * @param  {Integer}   articleId
     * @param  {Function} callback
     */
    articleDAL.prototype.get = function(articleId, callback) {
        dbContext.article.find(articleId).success(function(article) {
            callback(article);
        });
    };    
    articleDAL.prototype.count = function(callback) {
        dbContext.article.count().success(function(nb) {
            console.log( nb ); 
            callback(nb);
        });
    };

    /**
     * get all article
     * @param  {Function} callback
     */
    articleDAL.prototype.getAll = function(callback) {
        dbContext.article.findAll({order: 'id DESC'}).success(function(articles) {
                // callback(projects);
            async.map(articles,function(project,callback) {

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
                        articles[i] =articles[i].toJSON();
                        articles[i].images = results[i];
                    }
                     callback(articles);
                     callback(articles);
               } 
            })

        });
    };

    /**
     * save article
     * @param  {Object}   article
     * @param  {Function} callback
     */
    articleDAL.prototype.save = function(article, callback) {
        var article = dbContext.article.build(article);
        article.save().success(function(article) {
            callback(article);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a article
     * @param  {Object}   article
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    articleDAL.prototype.update = function(article, attributes, callback){
        article.updateAttributes(attributes).success(function (updatedarticle) { 
            callback(updatedarticle);
        }); 
    };

    /**
     * delete an article
     * @param  {Integer}   articleId
     * @param  {Function} callback
     */
    articleDAL.prototype.remove = function(articleId, callback) {   
        dbContext.article.find(articleId).success(function(article) {
			article.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = articleDAL;
})();