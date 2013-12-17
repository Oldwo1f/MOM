app.factory('projectsApi', ['$http',function ($http) {
    var service = {};
    console.log('service'); 
    service.fetchProjects = function() {
        var promise = $http.get('/api/project').
        then(function(data, status, headers, config) {
            return data.data;
        });
        return promise;
    };
    service.addProject = function(proj) {

        var promise = $http.post('/api/project',proj).
        then(function(data, status, headers, config) {
            return data.data;
        });
        return promise;
    };
    service.editProject = function(proj) {

        var promise = $http.put('/api/project',proj).
        then(function(data, status, headers, config) {
            return data.data;
        });
        return promise;
    };
    service.removeProjects = function(project) {
        console.log('apiremove'); 
        var promise = $http.post('/api/project/remove',project)
        .then(function(data, status, headers, config) {
            console.log(data); 
            return data.data;
        });
        return promise;
    };
    





    return service;
}]);