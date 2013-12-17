app.factory('imagesApi', ['$http',function ($http) {
    var service = {};
    // console.log('service'); 
    service.fetchImages = function() {
        var promise = $http.get('/api/image').
        then(function(data, status, headers, config) {
            return data.data;
        });
        return promise;
    };
    service.addImages = function(proj) {

        var promise = $http.post('/api/image',proj).
        then(function(data, status, headers, config) {
            return data.data;
        });
        return promise;
    };
    service.editImages = function(image) {

        var promise = $http.put('/api/image',{id:image.id, title:image.title}).
        then(function(data, status, headers, config) {
            return data.data;
        });
        return promise;
    };
    service.removeImages = function(image) {
        console.log('apiremove'); 
        
        var promise = $http.post('/api/image/remove',image)
        .then(function(data, status, headers, config) {
            console.log(data); 
            return data.data;
        });
        return promise;
    };
    





    return service;
}]);