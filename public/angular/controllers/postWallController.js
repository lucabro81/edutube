var wallPosts = angular.module('postWallCtrl', []);

wallPosts.controller('postWallController', function($scope, $http){
    
    $scope.init = function() {
        $http.
        get(baseUrl() + 'api/posts').
        success(function(data, status, headers, config) {
            $scope.posts = data;
            console.log($scope.posts);
        });/**/
    }
    
    $scope.init();
})

