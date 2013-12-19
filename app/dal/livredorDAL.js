/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* livredorDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function livredorDAL() {
		
    }

	/**
     * get livredor by id
     * @param  {Integer}   livredorId
     * @param  {Function} callback
     */
    livredorDAL.prototype.get = function(livredorId, callback) {
        dbContext.livredor.find(livredorId).success(function(livredor) {
            callback(livredor);
        });
    };

    /**
     * get all livredor
     * @param  {Function} callback
     */
    livredorDAL.prototype.getAll = function(callback) {
        dbContext.livredor.findAll({order: 'id DESC'}).success(function(livredors) {
            callback(livredors);
        });
    };

    /**
     * save livredor
     * @param  {Object}   livredor
     * @param  {Function} callback
     */
    livredorDAL.prototype.save = function(livredor, callback) {
        var livredor = dbContext.livredor.build(livredor);
        livredor.save().success(function(livredor) {
            callback(livredor);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a livredor
     * @param  {Object}   livredor
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    livredorDAL.prototype.update = function(item, callback){
        console.log('dal');
        console.log(item);  
        dbContext.livredor.find(item.id).success(function(ite) {
            // var livredor = dbContext.livredor.create(item);
            console.log(ite); 
            ite.published = item.published;

            ite.save().success(function (updatedlivredor) { 
                callback(updatedlivredor);
            }); 
        });
    };

    /**
     * delete an livredor
     * @param  {Integer}   livredorId
     * @param  {Function} callback
     */
    livredorDAL.prototype.remove = function(livredorId, callback) { 
    console.log('api'+livredorId);   
        dbContext.livredor.find(livredorId).success(function(livredor) {
			livredor.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = livredorDAL;
})();