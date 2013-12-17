app.factory('settingsApi', ['$http',function ($http) {
    var service = {};
    console.log('service'); 
    service.fetchSettings = function() {
        var promise = $http.get('/api/setting').
        then(function(data, status, headers, config) {
            console.log(data); 
            return data.data;
        });
        return promise;
    };
    service.addSetting = function(setting) {

        var promise = $http.post('/api/setting',setting).
        then(function(data, status, headers, config) {
            return data.data;
        });
        return promise;
    };
    service.editSetting = function(setting) {
        // setting
        var promise = $http.put('/api/setting',setting).
        then(function(data, status, headers, config) {
            return data.data;
        });
        return promise;
    };
    service.removeSettings = function(setting) {
        console.log('apiremove'); 
        var promise = $http.post('/api/setting/remove',setting)
        .then(function(data, status, headers, config) {
            console.log(data); 
            return data.data;
        });
        return promise;
    };
    





    return service;
}]);