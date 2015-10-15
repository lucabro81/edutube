var app = angular.module('edutube', ['ngRoute', 'ngAnimate'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('{??');
    $interpolateProvider.endSymbol('??}');
});

app.constant('YT_event', {
    UNSTARTED       : -1,
    ENDED           : 0,
    PLAYING         : 1,
    PAUSED          : 2,
    BUFFERING       : 3,
    VIDEO_CUED      : 5,
    
    STATUS_CHANGE   : 100,
    STOP            : 101, 
    PLAY            : 102,
    PAUSE           : 103
});

app.constant('MODAL_STATUS', {
    STATUS_CHANGE   : 200,
    CLOSE           : 201,
    OPEN            : 202
});

/*app.run(function(){
    
});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/',{
        templateUrl: 'angular/templates/viewPreview.template.html',
        controller: 'postWallController'
    });
});*/