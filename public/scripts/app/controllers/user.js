app.controller('userCtrl',['$scope','filterFilter','$http', '$timeout',
function userCtrl($scope, filterFilter, $http, $timeout){

	$scope.chargementTerminer= false;
	$scope.disableOptions= false;
	$scope.lightboxAddUser= false;
	$scope.lightboxChangePassword = false;
	
	$scope.users=[];
	$scope.$watch('users',function  () {
		$scope.nbChecked = filterFilter($scope.users,{selected : true}).length;
		$scope.allchecked = ($scope.nbChecked == $scope.users.length);
		$scope.disableOptions = !$scope.nbChecked;
		$scope.nbUsers= $scope.users.length;


	},true)
	$http.get('account/getAllUsers').success(function(datas) {
		
		if(typeof(datas) =='object')
		{
			$scope.users = datas;
			$scope.chargementTerminer= true;
		}else
		{
			console.log('Vous navez pas les droits');
		}
		
	});
	$scope.checkAll=function(allchecked) {
		allchecked = !allchecked;
		$scope.users.forEach(function(user) {
			user.selected = allchecked;
		});
	};
	$scope.closeLightBox=function() {
		
		$('.has-error').removeClass('has-error');
		$('.handleErrors').html('');
		$scope.newUserInputLogin = '';
		$scope.newUserInputEmail = '';
		$scope.newUserInputPassword = '';
		$scope.newUserInputConfirmPassword = '';
	};
	$scope.closeLightBoxChangePassword=function() {
		
		$('.has-error').removeClass('has-error');
		$('.handleErrors').html('');
		$scope.oldPassword = '';
		$scope.newPassword = '';
		$scope.ConfirmNewPassword = '';
	};
	$scope.addUser=function() {

		var user = {};
		user.username = this.newUserInputLogin
		user.email = this.newUserInputEmail
		user.password = this.newUserInputPassword
		user.confirmPassword = this.newUserInputConfirmPassword
		

		$http.post('/account/register',user).success(function(datas, status) {
		    	

		    console.log('sauvegarder')
		    console.log(datas)
		    
		    if(!datas.success)
		    {
		    	console.log(datas.errors);
		    	
				$('.form-group[rel="'+datas.errors.input+'"]').addClass('has-error');
				$('.handleErrors').append('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'
				+ datas.errors.msg +
				'</div>')
				

		    	return;
		    }

		    $('.has-error').removeClass('has-error');
		    $('.handleErrors').html('');
		    console.log(datas.user);
		    $scope.users.push(datas.user);
		    $scope.nbUsers.length++;
		    $scope.newUserInputLogin = '';
			$scope.newUserInputEmail = '';
			$scope.newUserInputPassword = '';
			$scope.newUserInputConfirmPassword = '';
		    $scope.lightboxAddUser= false;

		});



	};
	$scope.suppVerif=function() {
		console.log('here');
		console.log($scope.users);

		$scope.supprimerVerif=true;
		$timeout(function(){
		    $scope.supprimerVerif=false;
		    console.log('fin'); 
		    console.log($scope.supprimerVerif); 
		}, 5000);
	};
	$scope.supprimer=function() {
		$scope.supprimerVerif=false;
		userToRemove = filterFilter($scope.users,{selected : true});
		userIdToRemove = [];
		for(u in userToRemove){
		
			userIdToRemove.push(userToRemove[u]['id']);
		}
		//console.log(userIdToRemove); 
		$http.post('/account/removeUser',userIdToRemove).success(function(datas, status) {

			if(datas == 'success')
			{ 
				function inArray(array, p_val) {
				    var l = array.length;
				    for(var i = 0; i < l; i++) {
				        if(array[i] == p_val) {
				            return true;
				        }
				    }
				    return false;
				}
				
				for(u in $scope.users){

					

					if(inArray(userIdToRemove, $scope.users[u]['id'] ))
					{
						var index = $scope.users.indexOf($scope.users[u]);
						console.log('index = '+ index); 
						$scope.users.splice(index,1);
						// $scope.$apply();
					}
				}
				console.log($scope.users);

			}


		});

	};

}]);