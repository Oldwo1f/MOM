app.controller('profileCtrl',['$scope','filterFilter','$http', '$timeout',
function profileCtrl($scope, filterFilter, $http, $timeout){

	$scope.lightboxChangePassword = false;
	$scope.changePasswordSucceed = false;
	$scope.lightboxChangeEmail = false;
	$scope.changeEmailSucceed = false;
	console.log('profilecontroller')
	
	$scope.ngclickChangePassword=function() {
		console.log('fn change')
		$scope.lightboxChangePassword = true;
		
		
	};	
	$scope.ngclickChangeEmail=function() {
		console.log('fn change')
		$scope.lightboxChangeEmail = true;
		
		
	};
	$scope.changePassword=function(){

		var formData = {};
		formData.oldPassword = this.oldPassword
		formData.newPassword = this.newPassword
		formData.confirmNewPassword = this.confirmNewPassword
		

		$http.post('/account/changePassword',formData).success(function(datas, status) {
		    	

		    console.log('mdp enregistrer')
		    console.log(datas)
		    
		    if(!datas.success)
		    {
		    	$('.has-error').removeClass('has-error');
			    $('.handleErrors').html('');
		    	
				$('.form-group[rel="'+datas.errors.input+'"]').addClass('has-error');
				$('.handleErrors').append('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'
				+ datas.errors.msg +
				'</div>')
				

		    	return;
		    }

		    $('.has-error').removeClass('has-error');
		    $('.handleErrors').html('');
		    $scope.oldPassword = '';
			$scope.newPassword = '';
			$scope.confirmNewPassword = '';
		    $scope.lightboxChangePassword= false;
		    $scope.changePasswordSucceed = true;
		    $timeout(function(){
		    	$scope.changePasswordSucceed = false;
			}, 5000);


		});
	}
	$scope.changeEmail=function(){

		var formData = {};
		formData.newEmail = this.newEmail
		
		
		console.log(formData)
		$http.post('/account/changeEmail',formData).success(function(datas, status) {
		    	

		    console.log('email enregistrer')
		    console.log(datas)
		    
		    if(!datas.success)
		    {
		    	$('.has-error').removeClass('has-error');
			    $('.handleErrors').html('');
		    	
				$('.form-group[rel="'+datas.errors.input+'"]').addClass('has-error');
				$('.handleErrors').append('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'
				+ datas.errors.msg +
				'</div>')
				

		    	return;
		    }

		    $('.has-error').removeClass('has-error');
		    $('.handleErrors').html('');
			$scope.newEmail = '';
		    $scope.lightboxChangeEmail= false;
		    $scope.changeEmailSucceed = true;
		    $timeout(function(){
		    	$scope.changeEmailSucceed = false;
			}, 5000);


		});
	}

	$scope.closeLightBoxChangePassword=function() {
		
		$('.has-error').removeClass('has-error');
		$('.handleErrors').html('');
		$scope.oldPassword = '';
		$scope.newPassword = '';
		$scope.ConfirmNewPassword = '';
	};

}]);