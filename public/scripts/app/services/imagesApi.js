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
    service.getAllWithProj = function() {
        var promise = $http.get('/api/image/getAllWithProj').
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
    service.linkToProj = function(proj,images) {

        var promise = $http.put('/api/image/linkProj',{proj:proj, images:images}).
        then(function(data, status, headers, config) {
            return data.data;
        });
        return promise;
    };
    service.unlinkToProj = function(proj,images) {

        var promise = $http.put('/api/image/unlinkProj',{proj:proj, images:images}).
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
    service.count = function() {
        console.log('count'); 
        var promise = $http.get('/api/image/count').
        then(function(data, status, headers, config) {
            console.log(data.data);
            return data.data;
        });
        console.log('return'); 
        return promise;
    };





    return service;
}]);