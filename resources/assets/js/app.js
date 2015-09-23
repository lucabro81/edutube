//var app = angular.module('edutube', ['ngRoute', 'postWallCtrl']);
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

app.filter('dateToISO', function() {
    return function(input) {
        var goodTime = input.replace(/(.+) (.+)/, "$1T$2Z");
        return goodTime;
    };
});

app.filter('imgByName', function(){
    return function(input, name) {
        
        var imgUrl = '';
        $.each(input, function(i, obj) {
            if (obj.nome === name) {
                imgUrl = obj.url;
                return false;
            }
        });
        
        if (imgUrl === '') {
            return 'placeholder';
        }
        return imgUrl;
    };
})

app.directive('isoRepeat', function ($timeout, dataService ) {
        return {
            scope: {
                items: '=isoRepeat'
            },
            templateUrl: 'angular/templates/viewPreview.template.html',
            link: function (scope, element, attrs) {

                var options = {
                    animationEngine : 'jquery',
                    masonry : {
                        columnWidth : 320,
                        isFitWidth: true,
                        gutter: 10
                    }
                };

                element.isotope(options);

                scope.$watch('items', function(newVal, oldVal){
                    $timeout(function(){
                        element.isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' }); 

                    });
                }, true);
    
                scope.modalInfoShow = function(item, modal_sel){
                    
                    var modal = $(modal_sel);
                    
                    modal.addClass('show-modal');
                    
                    dataService.post = item;
                    
                    // TODO: ora che c'è la direttiva funcionante tutta questa parte può essere sbrigata dal template
                    //var title            = item.title;
                    var mediafiles       = item.mediafiles;
                    var biggerMediafiles = null;
                    var categories       = item.categories;
                    var description      = item.mediafiles;
                    var img_header       = modal.find('#img-prev-video');
                    
                    modal.css({'z-index': 1000});
                    
                    // si cerca l'ultimo file che dovrebbe essere il più grande possible
                    // TODO: da verificare
                    $.each(mediafiles, function(i, obj) {
                        biggerMediafiles = obj;
                    });
                    
                    img_header.attr('src', biggerMediafiles.url);
                    img_header.one('load', function () {
                        
                        // lo metto prima se no il 100% viene inteso come 100px, possibile bug jquery
                        modal.fadeTo(200, 1);
                        img_header.css(resizeImage(biggerMediafiles.width, biggerMediafiles.height, modal.find('.img-video')));
                        modal.find('.img-video').find('p').text(title);
                        
                        modal.attr('hideon', 1);

                    });
                    
                }
            }
        }
    }
);

app.directive('ngHover', ['$animate', function($animate) {
    return function(scope, element, attrs) {

        /*
        element.on('click', function() {
            if(element.hasClass('clicked')) {
                $animate.removeClass(element, 'clicked');
            } else {
                $animate.addClass(element, 'clicked');
            }
        });
        */

        element.hover(
            function() {
                utils.left_dist       = element.offset().left;
                utils.right_dist      = $(window).width() - (element.offset().left + element.width());

                if (utils.left_dist<0) {

                    // elemento a sinistra parzialmente visibile

                    var ombra = html.ombra_dx;
                    var left_mod = "+=" + ((-utils.left_dist) + 10) + "px";
                    var cover = element.next();

                    show_incomplete_prev(element, ombra, left_mod, cover);
                }
                else if (utils.right_dist<0) {

                    // elemento a destra parzialmente visibile

                    var ombra = html.ombra_sx;
                    var left_mod = "-=" + ((-utils.right_dist) + 10)  + "px";
                    var cover = element.prev();

                    show_incomplete_prev(element, ombra, left_mod, cover);    
                }/**/
            },
            function() {
                if (utils.left_dist<0) {

                    var ombra = html.ombra_dx;
                    var left_mod = 0;
                    var cover = element.next();

                    hide_incomplete_prev(element, ombra, left_mod, cover);
                }
                else if (utils.right_dist<0) {

                    var ombra = html.ombra_sx;
                    var left_mod = element.prev().position().left + element.width() + 10 + "px";
                    var cover = element.prev();

                    hide_incomplete_prev(element, ombra, left_mod, cover);
                }
            }
        );

        element.hover(
            function() {
            
                element.find('.frame-prev').stop(true).animate({
                    'border-width' : '4px'
                },100);

                element.find('.video-instruments').stop(true).animate({
                    'top' : -$(this).find('.video-instruments').innerHeight() + 'px'
                },100);

                element.find('.cover-prev-img').fadeTo(100, 1);

            },
            function() {
                element.find('.frame-prev').stop(true).animate({
                    'border-width' : '0px'
                },100);

                element.find('.video-instruments').stop(true).animate({
                    'top' : '0px'
                },100);

                element.find('.cover-prev-img').fadeTo(100, 0);
            }
        );
    }
}]);

app.directive('ngOnshow', function ($timeout, dataService) {
    
    
    return function(scope, element, attrs) {
        scope.$watch(function() {
                return dataService.post;
            }, 
            function(value, oldValue) {
                scope.setModalGraphic()
            }, 
            true);/**/
    }
});/**/

app.controller('ItemsCtrl', function ItemsCtrl($scope, $timeout, dataService) {
    
    $scope.update = function() {
        
        dataService.get().then(function (data) {                       
            $scope.collection = data;
        });
    };
    
    $scope.update(); 
    
});

app.controller('modalInfoCtrl', function modalInfoCtrl($scope, dataService){
    
    $scope.setModalGraphic = function() {
        $scope.item = dataService.post;
    };
    
    $scope.modalInfoHide = function(modal_sel) {
        
        var modal = $(modal_sel);
        modal.attr('hideon', 0);
        
        modal.fadeTo(200, 0, function() {
            modal.css({'z-index': -1000});
        });
    } 
    
});
    
app.service('dataService', function ($http) {
    
    return {
        get: function () {
            var promise = $http
                .get(baseUrl() + 'api/posts')
                .then(function (resp) {
                    return resp.data.featured;
                });
            return promise;
        },
        post: null 
    };
});

/*app.animation('.video-prev', [function() {
  return {
    // make note that other events (like addClass/removeClass)
    // have different function input parameters
    enter: function(element, doneFn) {
      jQuery(element).fadeIn(1000, doneFn);

      // remember to call doneFn so that angular
      // knows that the animation has concluded
    },

    move: function(element, doneFn) {
      jQuery(element).fadeIn(1000, doneFn);
    },

    leave: function(element, doneFn) {
      jQuery(element).fadeOut(1000, doneFn);
    }
  }
}]);*/