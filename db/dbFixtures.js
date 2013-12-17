/**
 * Using
 */
var DbContext = require(__dirname + '/dbContext');
var UserDal           = require(__dirname + '/../app/dal/userDal');
var ProjectDal           = require(__dirname + '/../app/dal/projectDal');
var ArticleDal           = require(__dirname + '/../app/dal/articleDal');
var SettingDal           = require(__dirname + '/../app/dal/settingDal');
var LivredorDal           = require(__dirname + '/../app/dal/livredorDal');
var ImageDal           = require(__dirname + '/../app/dal/imageDal');
var passport          = require('passport');
var bcrypt            = require('bcrypt-nodejs');
/**
 * Run fixture function
 */
module.exports = function(){

	var dbContext = new DbContext();
	var userDal = new UserDal();
	var projectDal = new ProjectDal();
    var articleDal = new ArticleDal();
    var imageDal = new ImageDal();
    var settingDal = new SettingDal();
	var livredorDal = new LivredorDal();










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
    console.log("... running fixtures ...");
    var newUser1 = {};
        newUser1.username = 'yoda';
        newUser1.email = 'alexismom@momcreation.fr'
//ADD 2 User
	encryptPassword('totototo', function(hashedpassword){
        
        newUser1.password = hashedpassword;

        userDal.save(newUser1, function (data) { 

        	console.log(data); 
        	newUser1 = data;
        });
    });
    encryptPassword('totototo', function(hashedpassword){
        var newUser = {};
        newUser.username = 'alexis';
        newUser.email = 'alexismomcilovic@momcreation.fr'
        newUser.password = hashedpassword;

        userDal.save(newUser, function (data) { });
    });
    encryptPassword('totototo', function(hashedpassword){
        var newUser = {};
        newUser.username = 'toto';
        newUser.email = 'toto@momcreation.fr'
        newUser.password = hashedpassword;

        userDal.save(newUser, function (data) {});
    });
//ADD  Project
    var project = {};
        project.name = 'Mon premier projet';
       
        project.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        projectDal.save(project, function (project) { 
                console.log('----------------------------------------------------------------'); 
            
            console.log(project)
                console.log('----------------------------------------------------------------'); 
             project.setCreator([newUser1]).success(function() {
                console.log('supperCool'); 
            });

        });
var setting1 = {};
        setting1.option = 'name';
        setting1.value = 'Company';
       
        settingDal.save(setting1, function (project) { 

        });




var com = {};
        com.author = 'benjamin04';
        com.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        livredorDal.save(com, function (data) {});

var com1 = {};
        com1.author = 'mudusa45';
        com1.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        livredorDal.save(com1, function (data) {});

var com2 = {};
        com2.author = 'rastarapace';
        com2.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        livredorDal.save(com2, function (data) {});

var com3 = {};
        com3.author = 'benjamin04';
        com3.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        livredorDal.save(com3, function (data) {});

var com4 = {};
        com4.author = 'taki85';
        com4.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        livredorDal.save(com4, function (data) {});

var com6 = {};
        com6.author = 'benj';
        com6.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        livredorDal.save(com6, function (data) {});

var com7 = {};
        com7.author = 'Dgeo02';
        com7.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        livredorDal.save(com7, function (data) {});

var com8 = {};
        com8.author = 'yoda512';
        com8.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        livredorDal.save(com8, function (data) {});

//     var project1 = {};
//         project1.name = 'Mon 2ER projet';
//         project1.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
//         projectDal.save(project1, function (data) {
//             project1 = data;
//         });


//      var img = {name:'tut1yu',title:"tata"};

//         imageDal.save(img, function (data) {img = data})

// setTimeout(function() {
//         project1.setImages([img]).success(function(d) {
//             console.log('success'); 
//             console.log(d); 
//         }).error(function(d) {
//             console.log('error'); 
//             console.log(d); 
//         })
// },3000)
        
    var project3 = {};
        project3.name = 'Mon 3 projet';
        project3.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        projectDal.save(project3, function (data) {});
    var project4 = {};
        project4.name = 'Mon 4 projet';
        project4.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        projectDal.save(project4, function (data) { });
    var project5 = {};
        project5.name = 'Mon premier projet';
        project5.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        projectDal.save(project5, function (data) { });
    var project6 = {};
        project6.name = 'Mon second projet';
        project6.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        projectDal.save(project6, function (data) { });
    var project7 = {};
        project7.name = 'Mon 3 projet';
        project7.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        projectDal.save(project7, function (data) { });
    var project8 = {};
        project8.name = 'Mon 4 projet';
        project8.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        projectDal.save(project8, function (data) { });//ADD  Project
  
    var article = {};
        article.title = 'Mon premier Article';
        article.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        articleDal.save(article, function (data) {});
    var article1 = {};
        article1.title = 'Mon second Article';
        article1.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        articleDal.save(article1, function (data) { });
    var article3 = {};
        article3.title = 'Mon 3 Article';
        article3.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        articleDal.save(article3, function (data) { });
    var article4 = {};
        article4.title = 'Mon 4 Article';
        article4.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        articleDal.save(article4, function (data) { });
    var article5 = {};
        article5.title = 'Mon pr emier Article';
        article5.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        articleDal.save(article5, function (data) { });
    var article6 = {};
        article6.title = 'Mon 2second Article';
        article6.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        articleDal.save(article6, function (data) { });
    var article7 = {};
        article7.title = 'Mon 3em Article';
        article7.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        articleDal.save(article7, function (data) { });
    var article8 = {};
        article8.title = 'Mon 4em Article';
        article8.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        articleDal.save(article8, function (data) { });



}