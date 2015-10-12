var app = angular.module('edutube', ['ngRoute', 'ngAnimate'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('{??');
    $interpolateProvider.endSymbol('??}');
});

app.constant('YT_event', {
    UNSTARTED       : 0,
    ENDED           : 1,
    PLAYING         : 2,
    PAUSED          : 3,
    BUFFERING       : 4,
    VIDEO_CUED      : 5,
    STATUS_CHANGE   : 6,
    STOP            : 7, 
    PLAY            : 8,
    PAUSE           : 9
});

app.constant('MODAL_STATUS', {
    STATUS_CHANGE   : 0,
    CLOSE           : 1,
    OPEN            : 2
});

/*app.run(function(){
    
});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/',{
        templateUrl: 'angular/templates/viewPreview.template.html',
        controller: 'postWallController'
    });
});*/