/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* settingDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function settingDAL() {
		
    }

	/**
     * get setting by id
     * @param  {Integer}   settingId
     * @param  {Function} callback
     */
    settingDAL.prototype.get = function(settingId, callback) {
        dbContext.setting.find(settingId).success(function(setting) {
            callback(setting);
        });
    };

    /**
     * get all setting
     * @param  {Function} callback
     */
    settingDAL.prototype.getAll = function(callback) {
        dbContext.setting.findAll({order: 'id DESC'}).success(function(settings) {
            callback(settings);
        });
    };

    /**
     * save setting
     * @param  {Object}   setting
     * @param  {Function} callback
     */
    settingDAL.prototype.save = function(setting, callback) {
        var setting = dbContext.setting.create(setting).success(function(setting) {
            callback(setting);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a setting
     * @param  {Object}   setting
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    settingDAL.prototype.update = function(setting, attributes, callback){
        setting.updateAttributes(attributes).success(function (updatedsetting) { 
            callback(updatedsetting);
        }); 
    };

    /**
     * delete an setting
     * @param  {Integer}   settingId
     * @param  {Function} callback
     */
    settingDAL.prototype.remove = function(settingId, callback) {   
        dbContext.setting.find(settingId).success(function(setting) {
			setting.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = settingDAL;
})();