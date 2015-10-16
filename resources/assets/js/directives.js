app.directive('isoRepeat', function ($timeout, dataService, playerStatus) {
    return {
        scope: {
            items: '=isoRepeat'
        },
        templateUrl: 'angular/templates/viewPreview.template.html',
        link: function (scope, element, attrs) {

            var options = {
                itemSelector: '.video-prev',
                animationEngine : 'jquery',
                //percentPosition: true,
                masonry : {
                    columnWidth : '.video-prev',
                    isFitWidth: true,
                    gutter: 10
                }
            };

            $('#main-news').css({'overflow':'hidden'})

            $('.fluid-container')
                .find('img')
                .css(resizeImage(1920, 1080, $('#main-news')));

            element.isotope(options);

            scope.$watch('items', function(newVal, oldVal){
                $timeout(function(){
                    element.isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
                }, true);
            });

            scope.modalInfoShow = function(item, modal_sel){
            
                // CLOSE FLOATING PLAYER
                if ($('#floating_player').is(':visible')) {
                    stopVideo('floating');
                    $('div#video-cont-floating').remove();
                    $('#floating_player').fadeTo(200, 0);
                }

                // INIT MODAL
                var modal = $(modal_sel);

                $('.modal-dialog').css({
                    //'margin': '0 auto',
                    'width': '100%'
                });
                $('.draggable-box').attr('style', '');

                $('.modal-dialog').draggable({
                    containment: "parent",
                    snap: "#myModal",
                    stop: function(event, ui) {
                    }
                });

                // Send data for modal
                dataService.post = item;

                // TODO: ora che c'è la direttiva funcionante tutta questa parte può essere sbrigata dal template
                //var title            = item.title;
                var mediafiles       = item.mediafiles;
                var img_header       = modal.find('#img-prev-video');

                // si cerca l'ultimo file che dovrebbe essere il più grande possible
                // TODO: da verificare
                $.each(mediafiles, function(i, obj) {
                    utils.biggerMediafiles = obj;
                });

                img_header.attr('src', utils.biggerMediafiles.url);
                img_header.one('load', function () {

                    // lo metto prima se no il 100% viene inteso come 100px, possibile bug jquery
                    //modal.fadeTo(200, 1);
                    //modal.on('show.bs.modal', function () {

                        var height = (modal.find('.img-video').width()/16)*9;
                        var total_height = height + $('.video-info-modal ').outerHeight() + $('.dati-video').outerHeight() + $('.header').outerHeight() + 60;

                        if (total_height > $(window).height()) {
                            height = height - (total_height-$(window).height());
                        }

                        //modal.find('.img-video').css({'height':height+'px'})
                        modal.find('.img-video').css({
                            'height': '100%', 
                            'padding-bottom': $('.video-info-modal').outerHeight() + 'px'
                        });
                        img_header.css(resizeImage(utils.biggerMediafiles.width, utils.biggerMediafiles.height, modal.find('.img-video')));

                    //});
                    //modal.find('.img-video').find('p').text(title);

                    //TODO: inserire spinner
                    //TODO: vedere se si riesce a sistemare la transizione fade

                });

                //modal.find('.img-video').css({'height': '100%'});

                $('.modal-dialog').resizable({
                    handles: "n, e, s, w, se",
                    resize: function( event, ui ) {
                        modal.find('.img-video').css({
                            'height': '100%', 
                            'padding-bottom': $('.video-info-modal').outerHeight() + 'px'
                        });
                        img_header.css(resizeImage(utils.biggerMediafiles.width, utils.biggerMediafiles.height, modal.find('.img-video')));
                    }
                });
                
            }
        }
    }
});

/**
 * Based on poxrud/youtube-directive-example
 * Github https://github.com/poxrud/youtube-directive-example/blob/master/application.js
 * Blog post http://blog.oxrud.com/posts/creating-youtube-directive/
 */
app.directive('youtube', function($window, dataService, playerStatus, YT_event){
    
    return {
        restrict: "E",

        template: '<div style="width:100%; height:100%;"></div>',
        
        scope: {
            videoid : '@',
            //status : '@',
            //stica:'=',
        },

        link: function(scope, element, attrs) {
            
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            var player = null;
            
            scope.$on(YT_event.STOP, function () {
                
                /*if (playerStatus.isLoading()) {
                    player = null;
                }*/
                
                playerStatus.setStop(true);

                attrs.$set('status',YT_event.ENDED);
                
                console.log(playerStatus.isLoading());
                
                if (!playerStatus.isLoading()) {
                    if (player !== null) {
                        playerStatus.setSecFromStart(player.getCurrentTime());
                
                        player.seekTo(0);
                        player.stopVideo();
                        player.clearVideo();
                        player.destroy();
                    }
                }
                
                element.css({
                    'width':'0', 
                    'height':'0', 
                    'padding-bottom':'inherit'
                });
            });

            scope.$on(YT_event.PLAY, function () {
                
                element.css({
                    'width':'100%', 
                    'height':'100%', 
                    'padding-bottom':'inherit'
                });

                $window.onYouTubeIframeAPIReady = function() {
                    player = new YT.Player(element.children()[0], {
                        videoId: scope.videoid,
                        playerVars: {
                            'showinfo': 0,
                            'modestbranding': 0,
                            'rel': 0
                        },
                        events: {
                            'onReady': function(event) {
                                scope.$apply(function() {
                                    if (playerStatus.getSecFromStart()>0) {
                                        player.seekTo(playerStatus.getSecFromStart(), false);
                                    }
                                    player.playVideo();
                                    
                                    console.log(playerStatus.isStopped())
                                    
                                    if (playerStatus.isStopped()) {
                                        player.seekTo(0);
                                        player.stopVideo();
                                        player.clearVideo();
                                        player.destroy();
                                        
                                    }
                                    else {
                                        playerStatus.setPlay(true);
                                        attrs.$set('status', YT_event.PLAYING);
                                    }
                                    
                                });
                            },
                            'onStateChange': function(event) {
                                var message = {
                                    event: YT_event.STATUS_CHANGE,
                                    data: "",
                                    code: event.data
                                };
                                
                                attrs.$set('status', event.data);
                                
                                switch(event.data) {
                                    case YT.PlayerState.PLAYING:
                                        message.data = "PLAYING";
                                        break;
                                    case YT.PlayerState.ENDED:
                                        message.data = "ENDED";
                                        break;
                                    case YT.PlayerState.UNSTARTED:
                                        message.data = "NOT PLAYING";
                                        break;
                                    case YT.PlayerState.BUFFERING:
                                        message.data = "BUFFERING";
                                        break;
                                    case YT.PlayerState.PAUSED:
                                        message.data = "PAUSED";
                                        break;
                                };
                                
                                console.log(message);
                                
                                scope.$apply(function() {
                                    scope.$emit(message.event, message.data, message.code);
                                });
                            }
                        }
                    });
                };

                $window.onYouTubeIframeAPIReady();
            }); 

            scope.$on(YT_event.PAUSE, function () {
                player.pauseVideo();
                
                attrs.$set('status', YT_event.PAUSED);
                playerStatus.setPause(true);
            }); 
        }
    }
})

app.directive('ngHover', ['$animate', function($animate) {
    return function(scope, element, attrs) {

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
                
                // se il menu è aperto, lasciando la preview si chiude
                element
                    .find('.video-instruments ')
                    .find(".dropdown-toggle[aria-expanded=true]")
                    .dropdown("toggle");
            }
        );
    }
}]);

app.directive('ngHoverfloating', ['$animate', function($animate) {
    return function(scope, element, attrs) {
        element.hover(
            function() {
                
                // appare titolo video floating
                var infoVideo = element.find('.video-info');
                infoVideo.stop(true).animate({
                   'bottom' : (-infoVideo.outerHeight()) + 'px' 
                },
                100);
                
                // appare header floating
                var header = element.find('.header');
                header.stop(true).animate({
                   'top' : (-header.outerHeight()) + 'px' 
                },
                100);
            },
            function() {
                
                // scompare titolo video floating
                var infoVideo = element.find('.video-info');
                infoVideo.stop(true).animate({
                   'bottom' : '0px' 
                },
                100);
                
                // scompare header floating
                var header = element.find('.header');
                header.stop(true).animate({
                   'top' : '0px' 
                },
                100);
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
                
                if (scope.setModalGraphic) {
                    scope.setModalGraphic()
                }
                
                if (scope.setFloatingGraphic) {
                    scope.setFloatingGraphic();
                }
                
            }, 
            true);/**/
    }
});

app.directive('ngFixedmenu', function($window) {
    
    return function(scope, element, attrs) {
        
        /*
        $(window).on('scroll',function() {
            if ($(window).scrollTop()>500) {
                $(element).addClass('fixed-menu');
                $("#main-cont").css({'margin-top':'40px'});
                
            }
            
            else {
                $(element).removeClass('fixed-menu');
                $("#main-cont").css({'margin-top':'0px'});
            }
        })
        */
        
        //angular.element($window).bind('scroll', function () {
        /*
        element.bind('scroll', function () {
            
            if ($window.scrollY>500) {
                scope.fixed = true;
            }
            else {
                scope.fixed = false;
            }
            
            scope.$apply();
        });
        */
        
        scope.$watch(function(){
                return element[0].getBoundingClientRect().top + $window.pageYOffset;
            }, 
            function(newValue, oldValue){
            }
        );
    };
});

app.directive('ngAddqueue', function(){
    var onclick = function(scope, element, attrs) {
        element.click(function(){
            var params = $.parseJSON(attrs.ngAddqueue);
            
            var weight = ($('#queue-box-cont').find('div').length-1 <= 0) ? 0 : $('#queue-box-cont').find('div').length-1;
            
            $('#play-video-floating').attr('data-videoid', params.id);
            
            $('#queue-box-cont').append('<div id="'+params.id+'" data-status="-1" data-weight="' + weight + '"></div>');
        });
    };
    
    return {
        restrict: "A",
        link: onclick,
        scope: '='
    };
});

app.directive('ngStatuslistener', function() {
    var watchStatus = function(scope, element, attr) {
        scope.$watch(function() { return element.attr('ng-statuslistener') }, function(oldValue, newValue) {
                
            }, 
            true            
        );

    }
    
    return {
        restrict: "A",
        link: watchStatus,
        scope: '='
    }
})