var app = angular.module('edutube', ['ngRoute', 'ngAnimate'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('{??');
    $interpolateProvider.endSymbol('??}');
});

/*app.run(function(){
    
});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/',{
        templateUrl: 'angular/templates/viewPreview.template.html',
        controller: 'postWallController'
    });
});*/