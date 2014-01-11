app.controller('articleCtrl',['$scope','articlesApi','filterFilter','$timeout','imagesApi',
function articleCtrl($scope, articlesApi, filterFilter, $timeout,imagesApi) {
	$scope.articles=[];
	$scope.allimages=[];
	$scope.projimages=[];
	$scope.notinprojimages=[];
	$scope.imageToShow=[];
	$scope.tri = 'free';
	$scope.$watch('articles',function  () {
		$scope.nbChecked = filterFilter($scope.articles,{selected : true}).length;
		$scope.allchecked = ($scope.nbChecked == $scope.articles.length);
		$scope.disableOptions = !$scope.nbChecked;
		$scope.nbArticles= $scope.articles.length;


	},true);
	articlesApi.fetchArticles().then(function(data) {
	    $scope.articles = data;
	    $scope.chargementTerminer= true;
	});
	imagesApi.getAllWithArticle().then(function(data) {
		console.log(data); 
		    $scope.allimages = data;
		    console.log($scope.allimages); 
		    // addImgToproj();
	});
	
	$scope.chargementTerminer= false;
	$scope.disableOptions= false;
	$scope.lightboxAddArticle= false;


	function addImgToArticle(){
		for(var i in $scope.articles)
		$scope.article[i].images = $scope.allimages.filter(filterInProj,$scope.articles[i]);
		console.log($scope.articles); 
	}

	$scope.link=function(proj) {
		console.log($scope.articleToEdit); 
		console.log('link'); 
		var toLink = filterFilter($scope.notinprojimages,{selected : true});
		imagesApi.linkToArticle($scope.articleToEdit,toLink).then(function(data) {
		    $scope.projimages.concat(toLink);
		    for(var img in toLink)
		    {
		    	toLink[img].selected = false;
		    	$scope.projimages.push(toLink[img]);
		    	$scope.notinprojimages = $scope.notinprojimages.filter(function(val){
		    	 	return val.id != toLink[img].id 
		    	})
		    }
		    $scope.articleToEdit.images = $scope.projimages;
			console.log($scope.articleToEdit); 
		    imagesApi.getAllWithArticle().then(function(data) {
			    $scope.allimages = data;
			    $scope.filtering($scope.tri);
			    
			    console.log($scope.articleToEdit.images); 
			});
		});
		
	};	
	$scope.unlink=function(proj) {
		console.log($scope.articleToEdit); 
		console.log('unlink'); 
		var toLink = filterFilter($scope.projimages,{selected : true});

		imagesApi.unlinkToArticle($scope.articleToEdit,toLink).then(function(data) {
		    
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
		    $scope.articleToEdit.images = $scope.projimages;
		    imagesApi.getAllWithArticle().then(function(data) {
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
	
	
	$scope.checkAll=function(allchecked) {
		allchecked = !allchecked;
		$scope.articles.forEach(function(article) {
			article.selected = allchecked;
		});
	};
	$scope.closeLightBox=function() {
		$scope.lightboxEditArticle = false;
		$scope.lightboxAddArticle = false;
		$scope.lightboxImageArticle = false;
		$('.has-error').removeClass('has-error');
		$('.handleErrors').html('');
		$scope.newArticleInputName = '';
		$scope.newArticleInputDescription = '';
		$scope.editArticleInputName = '';
		$scope.editArticleInputDescription = '';
		
	};
	$scope.addArticle=function() {
		var proj={};
		proj.title= $scope.newArticleInputName;
		proj.content= $scope.newArticleInputDescription;
		proj.urlFB= $scope.newArticleInputUrlFB;
		articlesApi.addArticle(proj).then(function(data) {
		    $scope.articles.push(data);
		    console.log(data); 
		    $scope.lightboxAddArticle= false;
		});
	};
	
	$scope.editPage=function() {
		console.log('editpage'); 
		$scope.lightboxEditArticle = true;
		$scope.articleToEdit = filterFilter($scope.articles,{selected : true})[0];
		
		$scope.indexToReplace = $scope.articles.indexOf($scope.articleToEdit); 
		$scope.editArticleInputName = $scope.articleToEdit.title;
		$scope.editArticleInputDescription = $scope.articleToEdit.content;
		$scope.editArticleInputUrlFB = $scope.articleToEdit.urlFB;
		$scope.IDArticleToEdit = $scope.articleToEdit.id;
	};
	$scope.editArticle=function() {
		var proj={};
		proj.title = $scope.editArticleInputName; 
		proj.content = $scope.editArticleInputDescription;
		proj.id = $scope.IDArticleToEdit;
		proj.urlFB = $scope.editArticleInputUrlFB;
		console.log(proj); 
		articlesApi.editArticle(proj).then(function(data) {
		    
		    console.log('fin edition');
		    console.log($scope.articles); 
		    console.log(data); 
		    $scope.articles.splice($scope.indexToReplace,1,data);
		    // console.log(data); 
		    $scope.lightboxEditArticle= false;
		});

	};
	$scope.editImage=function() {

		$scope.lightboxImageArticle = true;
		$scope.articleToEdit = filterFilter($scope.articles,{selected : true})[0];
		$scope.articleToEditId = $scope.articleToEdit.id;
		console.log($scope.allimages); 
		$scope.projimages = $scope.allimages.filter(filterImgProject)
		console.log($scope.projimages); 
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
		articleToRemove = filterFilter($scope.articles,{selected : true});
		

		articlesApi.removeArticles(articleToRemove).then(function(data) {
		    // $scope.articles = data;
		    console.log(data); 
		    console.log(articleToRemove); 
		    $scope.articles  = $scope.articles.filter(function(val) {
		     	   return !val.selected;
		    });
		    console.log($scope.articles); 
		});

	};


	function filterImgProject(val) {
		if(val.url.length >0)
		{
			for(var i in val.url)
			{
				if(val.url[i].id==$scope.articleToEditId){
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
				if(val.url[i].id==$scope.articleToEditId){
					return false;
				}
			}
			return true
		}else
		return true;
		
	}
	function ImgAlreadyUsed(input) {
   
      // console.log(input); 
      if(input.url.length>0)
      {
        return true;
      }
      return false;
    }
	function ImgNotAlreadyUsed(input) {
   
      // console.log(input); 
      if(input.url.length>0)
      {
        return false;
      }
      return true;
    }




}]);