/*
* Dependencies
*/
var passport          = require('passport');
var bcrypt            = require('bcrypt-nodejs');
var MembershipFilters = require('../../middleware/membershipFilters');
var UserDal           = require('../dal/userDal');
var async             = require('async');

/**
* Account controller class
*/
(function () {

    /**
    * Attributes.
    */
    var userDal = new UserDal();
    var filters = new MembershipFilters();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function AccountController(app) {
        this.routes(app);
    }

    /**
    * AccountController routes.
    */
    AccountController.prototype.routes = function(app) {
        app.get('/account/login', this.login);
        app.post('/account/login',
            passport.authenticate('local', { successRedirect: '/', failureRedirect: '/account/login'}), 
            this.redirectHome);
        app.get('/account/logout', this.logout);
        app.get('/account/changePassword', filters.authorize, this.changePassword);
        app.post('/account/changePassword', filters.authorize, this.changePassword_post);
        app.post('/account/changeEmail', filters.authorize, this.changeEmail);
        app.get('/account/register', filters.authorize, this.register);
        app.post('/account/register', filters.authorize, this.register_post);
        app.get('/user',  this.userPage);
        app.get('/account/getAllUsers', filters.authorize, this.getAllUsers);
        app.post('/account/removeUser', filters.authorize, this.removeUser);
        app.get('/account/session',  this.session);
        app.get('/account/profile',  this.profile);
    };
    /**
    * Try Session
    */
    AccountController.prototype.session = function(req, res) {
        var rep ={};
        if(req.user){
            res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
            rep.user =  {   username : req.user.username,
                            email : req.user.email,
                            id : req.user.id
                        };
            res.write(JSON.stringify(rep));
            res.end();
        }else{
            res.end(false);
        }
    };
    /**
    * Profile page
    */
    AccountController.prototype.profile = function(req, res) {
       
            res.render('account/profile');
       
    }; 
    AccountController.prototype.test = function(req, res) {
        
            res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
            userDal.save();
            res.write();
            res.end();
       
    };
    
    /**
    * [httpget]
    * login method.
    */
    AccountController.prototype.login = function(req, res) {
        res.render('account/login');
    };

    /**
    * [httpget]
    * logout method.
    */
    AccountController.prototype.logout = function(req, res) {
        req.logout();
        res.redirect('/');
    };

    /**
    * [httpget]
    * Register action.
    */
    AccountController.prototype.register = function(req, res) {
        res.render('account/register');
    };

    /**
    * [httppost]
    * Register post action.
    */
    AccountController.prototype.register_post = function(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
        var rep ={};
        rep.success = false;
         console.log(req.body.password)
         console.log(req.body.confirmPassword)
        if (req.body.password === req.body.confirmPassword && req.body.password.length > 7) {

            userDal.getByUsername(req.body.username, function (user) {
                if (!user) {
                    encryptPassword(req.body.password, function(hashedpassword){
                        var newUser = {};
                        newUser.username = req.body.username;
                        newUser.email = req.body.email
                        newUser.password = hashedpassword;

                        userDal.save(newUser, function (data) {
                            req.flash('flash', 'Utilisateur ajouter !');
                            // res.redirect('/account/login');
                            rep.user = data;
                            rep.success = true;
                            res.write(JSON.stringify(rep));
                            res.end();
                        });
                    });
                }
                else {
                    // req.flash('flash', 'Le nom d\'utilisateur existe déjà!');
                    rep.errors = { input :"username",
                            msg :'Le nom d\'utilisateur existe déjà!'};
                    res.write(JSON.stringify(rep));
                    res.end();
                    //res.redirect('/account/register');
                }
            });
        }
        else {
            // req.flash('flash', 'password must be 6 length or confirmPassword error !');
            rep.errors = { input :"password",
                            msg :'Confirmation invalide ou mots de passe trop court'};
            // res.redirect('/account/register');
            res.write(JSON.stringify(rep));
            res.end();
}
    };

    /**
    * change password.
    */
    AccountController.prototype.changePassword = function(req, res) {
        res.render('account/changePassword');
    };

    /**
    * [httppost]
    * change password.
    */
    AccountController.prototype.changePassword_post = function(req, res) {
        var rep ={};
        if (req.body.newPassword === req.body.confirmNewPassword && req.body.newPassword.length > 6) {
            userDal.get(req.user.id, function (user) {
                console.log(user.password)
                comparePassword(req.body.oldPassword, user.password, function(result){
                    console.log('compare')
                    console.log(result)
                    if(result){
                        encryptPassword(req.body.newPassword, function(encryptedPassWord){
                        console.log('compencryptare')

                            user.password = encryptedPassWord;
                            userDal.update(user, function (updatedUser) {
                                rep.success = true;
                                res.write(JSON.stringify(rep));
                                res.end();
                            });
                        });
                    }else{
                         rep.success = false;
                        rep.errors = { input :"oldPassword",
                                        msg :'Votre ancien mot de passe est incorrect'};
                        res.write(JSON.stringify(rep));
                        res.end();
                    }
                });
            });
        }else
        {
            rep.success = false;
            rep.errors = { input :"newPassword",
                            msg :'Le mot de passe est trop court ou la confirmation est incorrect'};
            res.write(JSON.stringify(rep));
            res.end();
        }
    };
    /**
    * [httppost]
    * change email.
    */
    AccountController.prototype.changeEmail = function(req, res) {
        var rep ={};
        console.log(req.body.newEmail)
        if (req.body.newEmail) {
            userDal.get(req.user.id, function (user) {
                user.email = req.body.newEmail;
                userDal.update(user, function (updatedUser) {
                    rep.success = true;
                    res.write(JSON.stringify(rep));
                    res.end();
                });
            });
        }else
        {
            rep.success = false;
            rep.errors = { input :"newEmail",
                            msg :'L\'adresse email est incorrect'};
            res.write(JSON.stringify(rep));
            res.end();
        }
    };
    /**
    * [httpget]
    * removeUser.
    */
    AccountController.prototype.removeUser = function  (req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
        var rep=req.body;
        userDal.getMulti({ where: { id: req.body } },function(users) {
            console.log('users');
            var tab =[];
            async.map(users, function(user,callback) {
                user.destroy().success(function() {
                    return callback();
                });

            },function(error, results) {
                console.log(error)
                if(error)
                {
                    console.log('assync error each'); 
                }
                console.log('all succeed');
                res.write('success');
                res.end();
            });

        });

    };
      
    /**
    * Redirect to home.
    */
    AccountController.prototype.redirectHome = function(req, res) {


        res.redirect('/', {user:user} );
    };
     /**
    * [httpget]
    * getUserPage method.
    */
    AccountController.prototype.userPage = function (req, res){
         res.render('account/userPage');
    }
     /**
    * [httpget]
    * getAllUsers method.
    */
    AccountController.prototype.getAllUsers = function(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });

        userDal.getAll(function(users) {
            res.write(JSON.stringify(users));
            res.end();
        });

    
    };
    /**
     * encrypted password
     * @param  {String}   password
     * @param  {Function} callback
     */
    var encryptPassword = function (password, callback){
        bcrypt.genSalt(10, function(err, salt) {
            if (err) console.log('error during encryption');
            bcrypt.hash(password, salt, null, function(err, cryptedPassWord) {
                if(err){ throw err; }
                else{
                    callback(cryptedPassWord);  
                }
            });
        });
    }

    /**
     * compare password and return callback if valid
     * @param  {String}   password
     * @param  {String}   encryptedPassWord
     * @param  {Function} callback
     */
    var comparePassword = function (password, encryptedPassWord, callback){
        bcrypt.compare(password, encryptedPassWord, function(err, result){
            if(err){throw err;}
            return callback(result);
        });
    }

    

    module.exports = AccountController;
})();