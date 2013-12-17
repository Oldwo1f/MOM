app.factory('handleUser', ['$http',function ($http) {
    var service = {};
    service.user = {}
    service.fetchUserInfo = function() {
        var promise = $http.get('account/session').then(function(data, status, headers, config) {
            return data.data.user;
        });
        return promise;
    };
    
    
    


    return service;
}]);