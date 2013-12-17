/**
* DbContext class
*/
(function () {

    var modelsPath = __dirname + '/../app/models/';

    /**
    * Constructor.
    * Add your entities 'DbSet' instance here like user.
    */
    function DbContext() {
        this.db = require('./dbConnection');
        this.entities();
        this.modelBuilder();
    }

    /**
     * Attach your model to DbContext like user to perform database sync.
     * 
     */
    DbContext.prototype.entities = function() {
        this.user = this.db.import(modelsPath + 'user');
        this.image = this.db.import(modelsPath + 'image');
        this.project = this.db.import(modelsPath + 'project');
        this.article = this.db.import(modelsPath + 'article');
        this.setting = this.db.import(modelsPath + 'setting');
        this.livredor = this.db.import(modelsPath + 'livredor');
    };

    /**
    * Manage Database entities associations here.
    */
    DbContext.prototype.modelBuilder = function () {
        this.project.hasMany(this.image);
        this.image.hasMany(this.project);

        this.article.hasMany(this.image);
        this.image.hasMany(this.article);



        this.article.belongsTo(this.user,{as:'Creator'});
        this.project.belongsTo(this.user,{as:'Creator'});
    };

    module.exports = DbContext;
})();