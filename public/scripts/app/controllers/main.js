
app.controller('mainCtrl',['$scope','handleUser',
function ($scope,handleUser) {

	handleUser.fetchUserInfo().then(function(data) {
		console.log('fetchUserInfo'); 
	   $scope.user=data; 
	});
	
	


}]);



