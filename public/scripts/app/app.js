var app = angular.module('adminApp', ['ngRoute','angularFileUpload','uiKeypress'])
 
.config(function($routeProvider) {
  $routeProvider.when('/user', {
    templateUrl: '/user'
  });

  $routeProvider.when('/project', {
    templateUrl: '/project',
  });
  $routeProvider.when('/images', {
    templateUrl: '/images',
  });
   $routeProvider.when('/article', {
    templateUrl: '/article',
  });
  $routeProvider.when('/account/profile', {
    templateUrl: '/account/profile',

  });
  $routeProvider.when('/settings', {
    templateUrl: '/settings',
  });
 
  $routeProvider.when('/livredor', {
    templateUrl: '/livredor',
  }); 
  $routeProvider.when('/', {
    templateUrl: '/dashboard',
  });
 
});



