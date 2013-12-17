

/**
* Module dependencies.
*/
var SettingDAL = require('../dal/settingDAL');

/**
* SettingApiController class
*/
(function () {

    /**
    * Attributes.
    */
    var settingDAL = new SettingDAL();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function SettingApiController(app) {
        this.routes(app);
    }

    /**
    * SettingApiController routes.
    * @param {app} - express app.
    */
    SettingApiController.prototype.routes = function(app) {
        app.get('/api/setting', this.getAll);
        app.get('/api/setting/:id', this.get);
        app.post('/api/setting', this.post);
        app.put('/api/setting', this.put);
        app.delete('/api/setting', this.delete);
    };

    /**
    * [httpget]
    * SettingApiController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    SettingApiController.prototype.getAll = function(req, res) {
        settingDAL.getAll(function (settings) {
            res.send(settings);
        });
    };

    /**
    * [httpget]
    * SettingApiController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    SettingApiController.prototype.get = function(req, res) {
        var settingId = req.params.id;
        settingDAL.get(settingId, function (setting) {
            if(setting){
            	res.send(setting);
            }
            else{
            	res.send(404);
            }
        });
    };

    /**
    * [httppost]
    * SettingApiController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    SettingApiController.prototype.post = function(req, res) {
        settingDAL.save(req.body, function (setting) {
            res.send(setting);
        });
    };

    /**
    * [httpput]
    * SettingApiController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    SettingApiController.prototype.put = function(req, res) {
        var option = req.body;
console.log('update or create'+ option.option+'   '+option.id); 
console.log(option); 
        if (option.id) {
            settingDAL.get(option.id, function(entity){
                if(entity){
                    settingDAL.update(entity, option, function (setting) {
                        res.send(setting);
                    });
                }
                else{
                    res.send(404);
                }
            });
        }else
        {
            settingDAL.save(option,function(entity){
                
                        res.send(entity);
                
            });
        }
        
    };

    /**
    * [httpdelete]
    * SettingApiController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    SettingApiController.prototype.delete = function(req, res) {
        settingDAL.remove(req.body.id, function () {
            res.send({mesage: 'setting delete'});
        });
    };

    module.exports = SettingApiController;
})();