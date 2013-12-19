app.filter('imgAlreadyUsed', function() {
    return function(input) {
      var out = input;
      console.log(input); 
      if(input.url.length>0)
      {
        return true;
      }
      return false;
    }
});