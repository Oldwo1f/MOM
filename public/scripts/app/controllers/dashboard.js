app.controller('dashboardCtrl',['$scope','filterFilter','$http', '$timeout','articlesApi','projectsApi','livredorApi','imagesApi',
function dashboardCtrl($scope, filterFilter, $http, $timeout,articlesApi,projectsApi,livredorApi,imagesApi){

	$scope.chargementTerminer= false;
	
	articlesApi.count().then(function(nb) {
		console.log(nb); 
	   $scope.nbArticle  = nb;
	});
	projectsApi.count().then(function(nb) {
		console.log(nb); 
	   $scope.nbProject  = nb;
	});
	livredorApi.count().then(function(nb) {
		console.log(nb); 
	   $scope.nbLivredor  = nb;
	});
	imagesApi.count().then(function(nb) {
		console.log(nb); 
	   $scope.nbImage  = nb;
	});
	
	

}]);