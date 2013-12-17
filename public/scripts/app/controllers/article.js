app.controller('articleCtrl',['$scope','articlesApi','filterFilter','$timeout',
function articleCtrl($scope, articlesApi, filterFilter, $timeout) {
	$scope.articles=[];
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
	
	$scope.chargementTerminer= false;
	$scope.disableOptions= false;
	$scope.lightboxAddArticle= false;

	 
	
	
	$scope.checkAll=function(allchecked) {
		allchecked = !allchecked;
		$scope.articles.forEach(function(article) {
			article.selected = allchecked;
		});
	};
	$scope.closeLightBox=function() {
		
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
		$scope.IDArticleToEdit = $scope.articleToEdit.id;
	};
	$scope.editArticle=function() {
		var proj={};
		proj.title = $scope.editArticleInputName; 
		proj.content = $scope.editArticleInputDescription;
		proj.id = $scope.IDArticleToEdit;
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




}]);