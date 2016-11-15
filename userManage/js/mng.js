var app = angular.module('mng',['ngRoute']);
app.config(['$routeProvider',function($routeProvider) {
    $routeProvider
        .when('/',{templateUrl:'views/index.html',controller:'indexController'})
        .when('/users',{templateUrl:'views/users.html',controller:'usersController'})
        .when('/asset',{templateUrl:'views/asset.html',controller:'assetController'})
        .otherwise({redirectTo:'/'});
}]);
app.controller('mngController',function() {

});
app.controller('indexController',function() {

});
app.controller('usersController',function($http,$scope) {
    $http({
            url: 'server/ajaxUserList.php',
            method: 'get',
            //params: {size: $scope.pageSize, query: $scope.query, page: $scope.page}
        }).success(function(response) {
            if (response.success) {
                $scope.users = response.data;
                //$scope.total = response.total; // 37
                //$scope.pageArr = _.range(0, getTotalPage());

                //renderPaging();
            }
    });
});
app.controller('assetController',function() {

});