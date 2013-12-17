

/**
* Module dependencies.
*/
var ImageDAL = require('../dal/imageDAL');
var fs = require('fs');
// var formidable = require('formidable');
var util = require('util');
var inspect = require('util').inspect;
var easyimg = require('easyimage');
var http = require('http');
/**
* ImageApiController class
*/
(function () {

    /**
    * Attributes.
    */
    var imageDAL = new ImageDAL();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function ImageApiController(app) {
        this.routes(app);
    }

    /**
    * ImageApiController routes.
    * @param {app} - express app.
    */
    ImageApiController.prototype.routes = function(app) {
        app.get('/api/image', this.getAll);
        app.get('/api/image/:id', this.get);
        app.post('/api/image', this.post);
        app.post('/upload/image', this.upload);
        app.put('/api/image', this.put);
        app.post('/api/image/remove', this.delete);
    };

    /**
    * [httppost]
    * ImageApiController upload action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ImageApiController.prototype.upload = function(req, res) {
console.log(req.files.myFile.type.indexOf('image')); 
        var fileName = req.files.myFile.name;
        req.setEncoding("binary");
        var filePath = "./public/uploads/";
        var fileStream = null;
        var serverPath = filePath + req.files.myFile.name;
        var serverthumbPath = filePath +'thumb/'+ req.files.myFile.name;
        // console.log(''); 
        var exists = fs.existsSync(serverPath)
        if(req.files.myFile.type.indexOf('image') == -1){
            console.log('type');
            res.end('notImg')
        }
        else if(exists){
            console.log('exist');
            res.end('exist')
        }else
        {
            console.log('here'); 
            var is = fs.createReadStream(req.files.myFile.path)
            var os = fs.createWriteStream(serverPath);
            is.on('data', function(chunk) {
                console.log('got %d bytes of data', chunk.length);
                // is.pause();
            })
            is.pipe(os);
            is.on('end',function() {
                    //remove temp file
                    // fs.unlink(req.files.myFile.path);
                    is.unpipe(os);
                    //do resize 
                    easyimg.rescrop({
                        src:serverPath, dst:serverthumbPath,
                        width:120,
                        cropwidth:120, cropheight:90,
                        x:0, y:0
                    },function(err, image) {
                        if (err) throw err;
                         //do db save
                        req.files.myFile.nom=req.files.myFile.name.substring(0, req.files.myFile.name.lastIndexOf('.'));
                        req.files.myFile.title=req.files.myFile.name.substring(0, req.files.myFile.name.lastIndexOf('.'));
                        imageDAL.save(req.files.myFile,function(data) {
                            // res.send(data); 
                            console.log(data.name);
                            res.end(JSON.stringify(data)); 
                        })
                    });
            });
        }
        
        
    };
    /**
    * [httpget]
    * ImageApiController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ImageApiController.prototype.getAll = function(req, res) {
        imageDAL.getAll(function (images) {
            res.send(images);
        });
    };

    /**
    * [httpget]
    * ImageApiController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ImageApiController.prototype.get = function(req, res) {
        var imageId = req.params.id;
        imageDAL.get(imageId, function (image) {
            if(image){
            	res.send(image);
            }
            else{
            	res.send(404);
            }
        });
    };

    /**
    * [httppost]
    * ImageApiController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ImageApiController.prototype.post = function(req, res) {
        imageDAL.save(req.body, function (image) {
            res.send(image);
        });
    };

    /**
    * [httpput]
    * ImageApiController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ImageApiController.prototype.put = function(req, res) {
        console.log('PUT'); 
        console.log(req.body); 
        var attributes = req.body;
        imageDAL.get(req.body.id, function(entity){
            if(entity){
                imageDAL.update(entity, req.body , function (image) {
                    res.send(image);
                });
            }
            else{
                res.send(404);
            }
        });
    };

    /**
    * [httpdelete]
    * ImageApiController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ImageApiController.prototype.delete = function(req, res) {
        imageDAL.remove(req.body.id, function () {


            console.log('//removeFile here'); 
            console.log(req.body.name); 

            fs.unlink(__dirname+'/../../public/uploads/'+req.body.name,function() {
                console.log('File removed'); 
            });
            fs.unlink(__dirname+'/../../public/uploads/thumb/'+req.body.name,function() {
                console.log('Thumb removed'); 
            });






            res.send({mesage: 'image delete',id: req.body.id});
        });
    };

    module.exports = ImageApiController;
})();