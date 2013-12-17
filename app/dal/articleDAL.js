/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

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

    /**
     * get all article
     * @param  {Function} callback
     */
    articleDAL.prototype.getAll = function(callback) {
        dbContext.article.findAll({order: 'id DESC'}).success(function(articles) {
            callback(articles);
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