

/**
* Module dependencies.
*/
var ArticleDAL = require('../dal/articleDAL');
var async      = require('async');
/**
* ArticleApiController class
*/
(function () {

    /**
    * Attributes.
    */
    var articleDAL = new ArticleDAL();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function ArticleApiController(app) {
        this.routes(app);
    }

    /**
    * ArticleApiController routes.
    * @param {app} - express app.
    */
    ArticleApiController.prototype.routes = function(app) {
        app.get('/api/article', this.getAll);
        app.get('/api/article/count', this.countAll);
        app.get('/api/article/:id', this.get);
        app.post('/api/article', this.post);
        app.put('/api/article', this.put);
        app.post('/api/article/remove', this.delete);
    };

    /**
    * [httpget]
    * ArticleApiController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ArticleApiController.prototype.getAll = function(req, res) {
        articleDAL.getAll(function (articles) {
            res.send(articles);
        });
    };
    ArticleApiController.prototype.countAll = function(req, res) {
        articleDAL.count(function (nb) {
            console.log(nb); 
            res.send(String(nb));
        });
    };

    /**
    * [httpget]
    * ArticleApiController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ArticleApiController.prototype.get = function(req, res) {
        var articleId = req.params.id;
        articleDAL.get(articleId, function (article) {
            if(article){
            	res.send(article);
            }
            else{
            	res.send(404);
            }
        });
    };

    /**
    * [httppost]
    * ArticleApiController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ArticleApiController.prototype.post = function(req, res) {
        articleDAL.save(req.body, function (article) {
            res.send(article);
        });
    };

    /**
    * [httpput]
    * ArticleApiController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ArticleApiController.prototype.put = function(req, res) {
        var attributes = req.body;
        articleDAL.get(attributes.id, function(entity){
            if(entity){
                articleDAL.update(entity, attributes, function (article) {
                    res.send(article);
                });
            }
            else{
                res.send(404);
            }
        });
    };

    ArticleApiController.prototype.delete = function(req, res) {
        
        console.log(req.body); 

        async.map(req.body, function(article,callback) {
                console.log('each'); 
                articleDAL.remove(article.id, callback);

            },function(error, results) {
                console.log('finish'); 
                console.log(error)
                if(error)
                {
                    console.log('assync error each'); 
                }
                console.log('all succeed');
                res.write('success');
                res.end();
            });




        // userDal.getMulti({ where: { id: req.body } },function(users) {
        //     console.log('users');
        //     var tab =[];
            

        // });






        // projectDAL.remove(req.body.id, function () {
        //     res.send({mesage: 'project delete'});
        // });
    };
    module.exports = ArticleApiController;
})();