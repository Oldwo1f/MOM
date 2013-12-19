app.factory('articlesApi', ['$http',function ($http) {
    var service = {};
    console.log('service'); 
    service.fetchArticles = function() {
        var promise = $http.get('/api/article').
        then(function(data, status, headers, config) {
            console.log(data); 
            return data.data;
        });
        return promise;
    };
    service.count = function() {
        console.log('count'); 
        var promise = $http.get('/api/article/count').
        then(function(data, status, headers, config) {
            console.log(data.data);
            return data.data;
        });
        console.log('return'); 
        return promise;
    };
    service.addArticle = function(proj) {

        var promise = $http.post('/api/article',proj).
        then(function(data, status, headers, config) {
            return data.data;
        });
        return promise;
    };
    service.editArticle = function(proj) {

        var promise = $http.put('/api/article',proj).
        then(function(data, status, headers, config) {
            return data.data;
        });
        return promise;
    };
    service.removeArticles = function(article) {
        console.log('apiremove'); 
        var promise = $http.post('/api/article/remove',article)
        .then(function(data, status, headers, config) {
            console.log(data); 
            return data.data;
        });
        return promise;
    };
    





    return service;
}]);