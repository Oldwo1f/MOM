app.controller('projectCtrl',['$scope','projectsApi','filterFilter','$timeout',
function projectCtrl($scope, projectsApi, filterFilter, $timeout) {
	$scope.projects=[];
	$scope.$watch('projects',function  () {
		$scope.nbChecked = filterFilter($scope.projects,{selected : true}).length;
		$scope.allchecked = ($scope.nbChecked == $scope.projects.length);
		$scope.disableOptions = !$scope.nbChecked;
		$scope.nbProjects= $scope.projects.length;


	},true);
	projectsApi.fetchProjects().then(function(data) {
	    $scope.projects = data;
	    $scope.chargementTerminer= true;
	});
	
	$scope.chargementTerminer= false;
	$scope.disableOptions= false;
	$scope.lightboxAddProject= false;

	 
	
	
	$scope.checkAll=function(allchecked) {
		allchecked = !allchecked;
		$scope.projects.forEach(function(project) {
			project.selected = allchecked;
		});
	};
	$scope.closeLightBox=function() {
		
		$('.has-error').removeClass('has-error');
		$('.handleErrors').html('');
		$scope.newProjectInputName = '';
		$scope.newProjectInputDescription = '';
		$scope.editProjectInputName = '';
		$scope.editProjectInputDescription = '';
		
	};
	$scope.addProject=function() {
		var proj={};
		proj.name= $scope.newProjectInputName;
		proj.description= $scope.newProjectInputDescription;
		projectsApi.addProject(proj).then(function(data) {
		    $scope.projects.push(data);
		    console.log(data); 
		    $scope.lightboxAddProject= false;
		});
	};
	$scope.editProject=function() {
		var proj={};
		proj.name = $scope.editProjectInputName; 
		proj.description = $scope.editProjectInputDescription;
		proj.id = $scope.IDProjectToEdit;
		console.log(proj); 
		projectsApi.editProject(proj).then(function(data) {
		    
		    console.log('fin edition');
		    console.log($scope.projects); 
		    console.log(data); 
		    $scope.projects.splice($scope.indexToReplace,1,data);
		    // console.log(data); 
		    $scope.lightboxEditProject= false;
		});

	};
	$scope.editPage=function() {
		console.log('editpage'); 
		$scope.lightboxEditProject = true;
		$scope.projectToEdit = filterFilter($scope.projects,{selected : true})[0];
		
		$scope.indexToReplace = $scope.projects.indexOf($scope.projectToEdit); 
		$scope.editProjectInputName = $scope.projectToEdit.name;
		$scope.editProjectInputDescription = $scope.projectToEdit.description;
		$scope.IDProjectToEdit = $scope.projectToEdit.id;
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
		projectToRemove = filterFilter($scope.projects,{selected : true});
		

		projectsApi.removeProjects(projectToRemove).then(function(data) {
		    // $scope.projects = data;
		    console.log(data); 
		    console.log(projectToRemove); 
		    $scope.projects  = $scope.projects.filter(function(val) {
		     	   return !val.selected;
		    });
		    console.log($scope.projects); 
		});

	};




}]);