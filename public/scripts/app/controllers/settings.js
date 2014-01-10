app.controller('settingsCtrl',['$scope','filterFilter','$timeout','settingsApi',
	function settingsCtrl($scope, filterFilter, $timeout,settingsApi) {
	
	$scope.info={};
	$scope.editing=null;
	$scope.info.name = 'Jardimaison';
	$scope.info.fixe = '0145487875';
	$scope.info.mobile = '0145966675';
	$scope.info.fax = '0145481233';
	$scope.info.adresse = '8 rue des champs';
	$scope.info.cp = '89520';
	$scope.info.ville = 'Paris';
	$scope.info.fb = 'http://example.com';
	$scope.info.twitter = 'http://example.com';
	$scope.info.lat = '52';
	$scope.info.lng = '6';
	$scope.info.zoom=3;

	$scope.options = [];
	$scope.options['lat']={};
	$scope.options['lng']={}; 
	$scope.options['zoom']={};

	settingsApi.fetchSettings().then(function(data) {
		for(var i in data)
		{
			$scope.options[data[i].option] = data[i];
		}
		console.log($scope.options); 
		initializeMap();

	});

	$scope.editSetting = function(key) {
	    	console.log($scope.options[key]);
	    	if(!$scope.options[key].id)
	    	{
	    		console.log('firstEdit');
	    		$scope.options[key].option = key
	    	} 

	    	settingsApi.editSetting($scope.options[key]);
	}
	$scope.saveMap = function() {

			if(!$scope.options['lat'].id && !$scope.options['lng'].id && !$scope.options['zoom'].id)
			{
				$scope.options['lat']={};
				$scope.options['lng']={}; 
				$scope.options['zoom']={};
			}

			 
			 $scope.options['lat'].option ='lat' ;$scope.options['lat'].value = $scope.position.nb;
			$scope.options['lng'].option ='lng' ;$scope.options['lng'].value = $scope.position.ob;
			 $scope.options['zoom'].option ='zoom' ;$scope.options['zoom'].value = $scope.zoom;
	    	this.editSetting('lat');
	    	this.editSetting('lng');
	    	this.editSetting('zoom');

	}

	
	console.log($scope.position); 
	function initializeMap() {
		var lat = $scope.options['lat'].value || 46;
		var lng = $scope.options['lng'].value || 2.5;
		$scope.position = new google.maps.LatLng(lat,lng);
		$scope.zoom = $scope.options['zoom'].value || 3;
		parseInt($scope.zoom); 
	  var mapOptions = {
	    zoom: parseInt($scope.zoom),
	    center: $scope.position,
	    scrollwheel: false
	     };

	  map = new google.maps.Map(document.getElementById('map-canvas'),
	      mapOptions);
	  console.log(map); 

	

	  google.maps.event.addListener(map, 'center_changed', function(event) {
	  	console.log('centerChanged');
	  	$scope.$apply(function() {
	  	    $scope.position=map.getCenter();
	    	$scope.zoom=map.getZoom();
	  	}) 
	    
	    
	  });
	}
	$scope.keypressCallback = function($event) {
       	
       	console.log($event);
       	$timeout(function () { $event.target.blur() }, 0, false);
		// $event.currentTarget.blur()

         $event.preventDefault();
    };


}]);