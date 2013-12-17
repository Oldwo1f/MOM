app.controller('imagesCtrl',['$scope','projectsApi','filterFilter','$timeout','imagesApi',
function imagesCtrl($scope, projectsApi, filterFilter, $timeout,imagesApi) {
	
	$scope.images = [];
	$scope.edit = [];
	$scope.supprimerVerif=[];
	imagesApi.fetchImages().then(function(data) {
	    $scope.images = data;
	    // $scope.chargementTerminer= true;
	});
	$scope.suppVerif=function(index) {
		console.log('supverif  '+ index); 
		$scope.supprimerVerif[index]=true;
		$timeout(function(){
		    $scope.supprimerVerif[index]=false;
		}, 5000);
	};
	$scope.supprimer=function(index) {
		$scope.supprimerVerif=[]
		var indexToremove ;
		imagesApi.removeImages($scope.images[index]).then(function(data) {
		    for(var i in $scope.images)
		    {
		    	// console.log($scope.images[i].id); 
		    	if($scope.images[i].id == data.id)
		    	{
		    		console.log('if');
		    		indexToremove = i;
		    		
		    		break;
		    	}
		    }
		    $scope.images.splice(indexToremove,1);
		});
	};
	$scope.dblclick=function(index,$event, $elem) {
		console.log($elem);
		// console.log($event.currentTarget);
		// console.log($event.currentTarget.findElementsByTagName('input'));
		// console.log($($event.curentTarget));
		// console.log($($event.curentTarget).find('input'));
		// // console.log($event.currentTarget.find('input'));
		// $($event.curentTarget).find('input').focus();
	    $scope.edit=[]; 
	    console.log($scope.edit); 
	    $scope.edit[index]=true;
	    console.log($scope.edit); 
	}
	$scope.editTitle=function(index) {
		console.log('blurfun'); 
	    imagesApi.editImages($scope.images[index]).then(function(data) {
		    console.log(data); 
		    console.log('name changed'); 
		});

	    $scope.edit=[]; 
	}
	$scope.keypressCallback = function($event) {
       	
       	console.log($event);
       	$timeout(function () { $event.target.blur() }, 0, false);
		// $event.currentTarget.blur()

         $event.preventDefault();
    };


}]);