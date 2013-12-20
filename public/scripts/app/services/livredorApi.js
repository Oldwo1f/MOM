app.factory('livredorApi', ['$http',function ($http) {
    var service = {};
    console.log('service'); 
    service.fetchLivredors = function() {
        var promise = $http.get('/api/livredor').
        then(function(data, status, headers, config) {
            return data.data;
        });
        return promise;
    };
    service.addLivredor = function(proj) {

        var promise = $http.post('/api/livredor',proj).
        then(function(data, status, headers, config) {
            return data.data;
        });
        return promise;
    };
    service.editLivredor = function(livredors) {

        console.log(livredors); 
        var promise = $http.put('/api/livredor',livredors).
        then(function(data, status, headers, config) {
            return data.data;
        });
        return promise;
    };
    service.removeLivredors = function(livredors) {
        console.log('apiremove'); 
        var promise = $http.post('/api/livredor/remove',livredors)
        .then(function(data, status, headers, config) {
            console.log(data); 
            return data.data;
        });
        return promise;
    };
    service.count = function() {
        console.log('count'); 
        var promise = $http.get('/api/livredor/count').
        then(function(data, status, headers, config) {
            console.log(data.data);
            return data.data;
        });
        console.log('return'); 
        return promise;
    };





    return service;
}]);