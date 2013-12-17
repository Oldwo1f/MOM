app.directive('focusInput', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      element.bind('dblclick', function() {
       
        scope.$apply(function() {
		    scope.editing=attrs.focusInput;
		});
          element.find('input')[0].focus();
          console.log(element.find('input')[0]); 

      });
    }
  };
});

app.directive('blurInput', function($timeout) {
  return {
    link: function(scope, element, attrs) {

     	element.bind('blur', function() {
	        scope.$apply(function() {
			    scope.editing=null;
			   	scope.editSetting(attrs.blurInput) 
			});
			

      	});
    }
  };
});