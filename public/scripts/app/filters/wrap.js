app.filter('wrap', function() {
    return function(input) {
      var out = input;
      if(input.length>50)
      {
        out = input.substring(0,50);
        out+= '. . .';
      }
      return out;
    }
});