app.controller('projectCtrl',['$scope','projectsApi','filterFilter','$timeout','imagesApi',
function projectCtrl($scope, projectsApi, filterFilter, $timeout,imagesApi) {
	$scope.projects=[];
	$scope.allimages=[];
	$scope.projimages=[];
	$scope.notinprojimages=[];
	$scope.imageToShow=[];
	$scope.tri = 'free';
	$scope.$watch('projects',function  () {
		$scope.nbChecked = filterFilter($scope.projects,{selected : true}).length;
		$scope.allchecked = ($scope.nbChecked == $scope.projects.length);
		$scope.disableOptions = !$scope.nbChecked;
		$scope.nbProjects= $scope.projects.length;


	},true);



	function addImgToproj(){
		for(var i in $scope.projects)
		$scope.projects[i].images = $scope.allimages.filter(filterInProj,$scope.projects[i]);
		console.log($scope.projects); 
	}

	projectsApi.fetchProjects().then(function(data) {
	    $scope.projects = data;
	    $scope.chargementTerminer= true;
	     console.log($scope.projects);
	   
	});
 	imagesApi.getAllWithProj().then(function(data) {
		    $scope.allimages = data;
		    console.log($scope.allimages); 
		    // addImgToproj();
	});
	$scope.chargementTerminer= false;
	$scope.disableOptions= false;
	$scope.lightboxAddProject= false;

	 
	
	
	$scope.link=function(proj) {
		console.log($scope.projectToEdit); 
		console.log('link'); 
		var toLink = filterFilter($scope.notinprojimages,{selected : true});
		imagesApi.linkToProj($scope.projectToEdit,toLink).then(function(data) {
		    $scope.projimages.concat(toLink);
		    for(var img in toLink)
		    {
		    	toLink[img].selected = false;
		    	$scope.projimages.push(toLink[img]);
		    	$scope.notinprojimages = $scope.notinprojimages.filter(function(val){
		    	 	return val.id != toLink[img].id 
		    	})
		    }
		    $scope.projectToEdit.images = $scope.projimages;
			console.log($scope.projectToEdit); 
		    imagesApi.getAllWithProj().then(function(data) {
			    $scope.allimages = data;
			    $scope.filtering($scope.tri);
			    
			    // console.log($scope.projectToEdit.images.length); 
			});
		});
		
	};	
	$scope.unlink=function(proj) {
		console.log($scope.projectToEdit); 
		console.log('unlink'); 
		var toLink = filterFilter($scope.projimages,{selected : true});

		imagesApi.unlinkToProj($scope.projectToEdit,toLink).then(function(data) {
		    
		    console.log('fin unlink');
		    console.log(toLink);

		    for(var img in toLink)
		    {
		    	toLink[img].selected = false;
		    	$scope.notinprojimages.push(toLink[img]);
		    	console.log(toLink[img]);
		    	var idToRemove =toLink[img].id;
		    	
			    for (var i in $scope.projimages) {
			    	console.log($scope.projimages[i].id); 
			    	if($scope.projimages[i].id == idToRemove){
			    		console.log('delete'); 
			    		$scope.projimages.splice(i,1);
			    	} 
			    };
		    	

		    }
		    $scope.projectToEdit.images = $scope.projimages;
		    imagesApi.getAllWithProj().then(function(data) {
			    $scope.allimages = data;
			    $scope.filtering($scope.tri);
			   
			});
		    // console.log($scope.notinprojimages); 
		   	
		});
		
	};
	$scope.selectImg=function(elem) {
		if (elem.selected==true) {elem.selected=false }
		else{elem.selected = true;}
		
	};
	$scope.checkAll=function(allchecked) {
		allchecked = !allchecked;
		$scope.projects.forEach(function(project) {
			project.selected = allchecked;
		});
	};
	$scope.filtering=function(type) {
		$scope.tri = type;
		switch(type){
			case 'use':
				 	
				     $scope.imageToShow = $scope.notinprojimages.filter(ImgAlreadyUsed)
			break;
			case 'free':
				 
				     $scope.imageToShow = $scope.notinprojimages.filter(ImgNotAlreadyUsed,true)
			break;			
			case 'all':
				 
				     $scope.imageToShow = $scope.notinprojimages;
			break;
		}
	};
	$scope.closeLightBox=function() {
		
		$scope.lightboxEditProject = false;
		$scope.lightboxAddProject = false;
		$scope.lightboxImageProject = false;
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
		$scope.projectToEditId = $scope.projectToEdit.id;
		console.log($scope.allimages); 
		$scope.projimages = $scope.allimages.filter(filterImgProject)
		$scope.notinprojimages = $scope.allimages.filter(filterImgNotProject)

		console.log($scope.projimages); 


		console.log($scope.projectToEditId); 
		$scope.indexToReplace = $scope.projects.indexOf($scope.projectToEdit); 
		$scope.editProjectInputName = $scope.projectToEdit.name;
		$scope.editProjectInputDescription = $scope.projectToEdit.description;
		$scope.IDProjectToEdit = $scope.projectToEdit.id;
	};
	$scope.editImage=function() {

		$scope.lightboxImageProject = true;
		$scope.projectToEdit = filterFilter($scope.projects,{selected : true})[0];
		$scope.projectToEditId = $scope.projectToEdit.id;
		$scope.projimages = $scope.allimages.filter(filterImgProject)
		$scope.notinprojimages = $scope.allimages.filter(filterImgNotProject)
		$scope.filtering('free');
		
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


	function filterImgProject(val) {
		if(val.url.length >0)
		{
			for(var i in val.url)
			{
				if(val.url[i].id==$scope.projectToEditId){
					return true;
				}
			}
			return false
		}
		return false;
	    
	}
	function filterImgNotProject(val) {
		if(val.url.length > 0)
		{
			for(var i in val.url)
			{
				if(val.url[i].id==$scope.projectToEditId){
					return false;
				}
			}
			return true
		}else
		return true;
		
	}
	function ImgAlreadyUsed(input) {
   
      console.log(input); 
      if(input.url.length>0)
      {
        return true;
      }
      return false;
    }
	function ImgNotAlreadyUsed(input) {
   
      console.log(input); 
      if(input.url.length>0)
      {
        return false;
      }
      return true;
    }


}]);