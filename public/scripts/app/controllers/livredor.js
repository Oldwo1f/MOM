app.controller('livredorCtrl',['$scope','livredorApi','filterFilter','$timeout',
function livredorCtrl($scope, livredorApi, filterFilter, $timeout) {
		$scope.livredors=[];
		$scope.$watch('livredors',function  () {
		$scope.nbChecked = filterFilter($scope.livredors,{selected : true}).length;
		$scope.allchecked = ($scope.nbChecked == $scope.livredors.length);
		$scope.disableOptions = !$scope.nbChecked;
		$scope.nbLivredors= $scope.livredors.length;


	},true);
	livredorApi.fetchLivredors().then(function(data) {
		console.log('fetchLivredor'); 
	    $scope.livredors = data;
	    $scope.chargementTerminer= true;
		console.log($scope.livredors ); 

	});
	
	$scope.chargementTerminer= false;
	$scope.disableOptions= false;
	$scope.lightboxAddLivredor= false;

	 
	
	
	$scope.checkAll=function(allchecked) {
		allchecked = !allchecked;
		$scope.livredors.forEach(function(livredor) {
			livredor.selected = allchecked;
		});
	};
	
	$scope.editLivredor=function() {
		var proj={};
		
		// console.log(proj); 
		// livredorApi.editLivredor(proj).then(function(data) {
		    
		//     console.log('fin edition');
		//     console.log($scope.livredors); 
		//     console.log(data); 
		//     $scope.livredors.splice($scope.indexToReplace,1,data);
		//     // console.log(data); 
		//     $scope.lightboxEditLivredor= false;
		// });

	};
	$scope.suppVerif=function() {
		$scope.supprimerVerif=true;
		$timeout(function(){
		    $scope.supprimerVerif=false;
		}, 5000);
	};
	$scope.supprimer=function() {
		console.log('clickremove'); 
		$scope.supprimerVerif=false;
		livredorToRemove = filterFilter($scope.livredors,{selected : true});
		console.log(livredorToRemove); 

		livredorApi.removeLivredors(livredorToRemove).then(function(data) {
		    // $scope.livredors = data;
		    console.log(data); 
		    console.log(livredorToRemove); 
		    $scope.livredors  = $scope.livredors.filter(function(val) {
		     	   return !val.selected;
		    });
		    console.log($scope.livredors); 
		});

	};

	$scope.publish=function(bool) {
		console.log('publier'); 
		livredorToPublish = filterFilter($scope.livredors,{selected : true});
		console.log(livredorToPublish); 
		if(bool)
		{
			for(var i in livredorToPublish){
				livredorToPublish[i].published=true
			}
		}else
		{
			for(var i in livredorToPublish){
				livredorToPublish[i].published=false
			}
		}
		

		livredorApi.editLivredor(livredorToPublish).then(function(data) {
		    // $scope.livredors = data;
		    console.log(data); 
		    console.log(livredorToPublish); 
		   
		    console.log($scope.livredors); 
		});

	};
	


}]);