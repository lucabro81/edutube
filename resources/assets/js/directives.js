app.directive('isoRepeat', function ($timeout, $rootScope, dataService, playerStatus, QUEUE_event, YT_event) {
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

            element.isotope(options);

            scope.$watch('items', function(newVal, oldVal){
                $timeout(function(){
                    element.isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
                }, true);
            });

            /**
             * TODO: Inizializza la modal, ma c'è troppo jquery, da rivedere
             * 
             * @param {type} item
             * @param {type} modal_sel
             * @returns {undefined}
             */
            scope.modalInfoShow = function(item, modal_sel){
            
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

                // TODO: ora che c'è la direttiva funcionante tutta questa parte può essere sbrigata dal template
                //var title            = item.title;
                var mediafiles       = item.mediafiles;
                var img_header       = modal.find('#img-prev-video');

                // si cerca l'ultimo file che dovrebbe essere il più grande possible
                // TODO: da verificare
                $.each(mediafiles, function(i, obj) {
                    utils.biggerMediafiles = obj;
                });
                
                item['src'] = utils.biggerMediafiles.url;
                dataService.setPost(item);

                var height = (modal.find('.img-video').width()/16)*9;
                var total_height = height + $('.video-info-modal ').outerHeight() + $('.dati-video').outerHeight() + $('.header').outerHeight() + 60;

                if (total_height > $(window).height()) {
                    height = height - (total_height-$(window).height());
                }

                modal.find('.img-video').css({
                    'height': '100%', 
                    'padding-bottom': $('.video-info-modal').outerHeight() + 'px'
                });

                $('.modal-dialog').resizable({
                    handles: "n, e, s, w, se",
                    resize: function( event, ui ) {
                        modal.find('.img-video').css({
                            'height': '100%', 
                            'padding-bottom': $('.video-info-modal').outerHeight() + 'px'
                        });
                    }
                });
                
            }

            scope.addVideoToQueue = function(item) {
                dataService.pushPostToQueue(item);
                $rootScope.$emit(QUEUE_event.ADD, 'ADD');/**/

                console.log(item.YT_id);
                
            }
        }
    }
});

app.directive('jnFitImg', function() {
    return {
        link: function(scope, element, attrs) {
            scope.resizeImage = function(width_img, height_img, container) {
    
                var new_h_img_width_cont = (height_img/width_img)*container.width();

                var css = new Object();

                if (new_h_img_width_cont <= container.height()) {
                    var width_num = ((width_img/height_img)*container.height());
                    var height_num = container.height();
                    css['width']       = width_num + 'px';
                    css['height']      = height_num + 'px';
                    css['margin-top']  = '0px';
                    css['margin-left'] = (-(width_num-container.width())/2) + 'px';
                }
                else {
                    css['width']       = container.width() + 'px';
                    css['height']      = new_h_img_width_cont + 'px';
                    css['margin-top']  = (-(new_h_img_width_cont - container.height())/2) + 'px';
                    css['margin-left'] = '0px';
                }
                
                console.log(css);

                return css;
            };
            
            scope.fitImg = function() {
                var imgContainer = $(element).parent();
                var img = $(element);
                
                console.log(imgContainer);
                console.log(img);
                
                var imgWidth = img.width();
                var imgHeight = img.height();
                
                console.log(imgWidth);
                console.log(imgHeight);
                
                imgContainer.css({'overflow':'hidden'})
                img.css(scope.resizeImage(imgWidth, imgHeight, imgContainer));
                
            }
            
            element.one('load', function() {
                scope.fitImg();
            })
            
        }
    }
})

/**
 * Based on poxrud/youtube-directive-example
 * Github https://github.com/poxrud/youtube-directive-example/blob/master/application.js
 * Blog post http://blog.oxrud.com/posts/creating-youtube-directive/
 */
app.directive('youtube', function($window, dataService, playerStatus, YT_event){
    
    return {
        restrict: "E",
        
        template: '<div style="width:100%; height:100%;"></div>',
        
        // NOTA: usare un isolated scope non permetteva di aggiornare correttamente lo scope, facendo console.log(scope) si aveva il valore corretto, facendo console.log(scope.videoid) si aveva il valore vecchio
        
        /*scope: {
            //videoid : '=videoid',
            //videoid : '@videoid'
        },*/

        link: function(scope, element, attrs) {
            
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            var player = null;
            
            scope.$on(YT_event.STOP, function () {
                
                attrs.$set('status',YT_event.ENDED);
                
                if ((!playerStatus.isLoading())&&
                    (!playerStatus.isUnstarted())) {
                /*if ((!playerStatus.isLoading())) {*/
                    
                    if (player !== null) {
                        playerStatus.setSecFromStart(player.getCurrentTime());
                
                        playerStatus.printStatus();
                
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
                
                playerStatus.setStop(true);
                
            });
            
            /*console.log('0-scope');
            console.log(scope);
            console.log("scope.videoid: " + scope.videoid);*/

            scope.$on(YT_event.PLAY, function (event, args) {
                
                element.css({
                    'width':'100%', 
                    'height':'100%', 
                    'padding-bottom':'inherit'
                });
                
                /*console.log('1-scope');
                console.log(scope);
                console.log("scope.videoid: " + scope.videoid);*/

                $window.onYouTubeIframeAPIReady = function() {
                    
                    /*console.log('2-scope');
                    console.log(scope);
                    console.log("scope.videoid: " + scope.videoid);*/
                    
                    player = new YT.Player(element.children()[0], {
                        videoId: scope.item.YT_id,
                        //videoId: scope.videoid,
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
                                    
                                });
                            },
                            'onStateChange': function(event) {
                                var message = {
                                    event: YT_event.STATUS_CHANGE,
                                    data: "",
                                    code: event.data
                                };
                                
                                attrs.$set('status', event.data);
                                
                                if (playerStatus.isStopped()) {
                                    player.seekTo(0);
                                    player.stopVideo();
                                    player.clearVideo();
                                    player.destroy();
                                    
                                    element.css({
                                        'width':'0', 
                                        'height':'0', 
                                        'padding-bottom':'inherit'
                                    });
                                }
                                else {
                                
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

                                    scope.$apply(function() {
                                        scope.$emit(message.event, message.data, message.code);
                                    });
                                }
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

/**
 * 
 */
app.directive('jnHover', ['$animate', function($animate) {
    return function(scope, element, attrs) {

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

/**
 * 
 */
app.directive('jnSlideHiddenElement', function() {
    return {
        link: function(scope, element, attrs) {
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
        }
    }
});

/**
 * 
 */
app.directive('jnHoverFloating', ['$animate', function($animate) {
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

/**
 * 
 */

/*
app.directive('jnOnShowModal', function (dataService, playerStatus, $rootScope, YT_event, MODAL_STATUS) {
    
    return {
        link: function(scope, element, attrs) {
            
            scope.$watch(function() {
                    return dataService.post;
                }, 
                function(value, oldValue) {

                    scope.setModalGraphic()

                }, 
                true
            );
        }
    } 
});
*/

/**
 * 
 */
/*
app.directive('jnOnShowFloating', function(dataService, playerStatus) {
    return {
        link: function(scope, element, attrs) {
            
            scope.$watch(function() {
                    return dataService.post;
                }, 
                function(value, oldValue) {
                    scope.setFloatingGraphic();
                    playerStatus.setUnstart(true);
                }, 
                true
            );
    
        }
    } 
});
*/

/**
 * 
 */
app.directive('jnQueueSlide', function() {
    return {
        link: function(scope, element, attr) {
            scope.setWidth = function(element) {
                
                scope.width = 0;
                scope.lastLeft = 0;
                scope.direction = '';
                scope.lastOffset = 0;
                
                element.children().each(function(index, obj) {
                    scope.width = scope.width + $(obj).outerWidth();
                });
                
                $(element[0]).css({
                   'width': scope.width + 'px'
                });
                
                if (scope.width > $(window).width()) {
                    
                    // TODO: meglio se si usa lo scroll normale, nascondendo la scrollbar
                    
                    $(element).draggable({
                        axis: "x",
                        start: function(event, ui) {
                            //$(element).draggable( "enable" );
                        },
                        stop: function(event, ui) {
                            
                            
                            /*var newLeft = 0;
                            if (scope.direction === 'left') {
                                newLeft = scope.lastLeft - 100
                            }
                            else {
                                newLeft = scope.lastLeft + 100
                            }
                            $(element).stop().animate({
                                'left': newLeft + 'px'
                            }, 200);*/
                        },
                        drag: function(event, ui) {
                            
                            scope.lastOffset = ui.position.left - scope.lastLeft;
                            
                            console.log(scope.lastOffset);
                            
                            if (ui.position.left > scope.lastLeft) {
                                scope.direction = 'right';
                            }
                            else {
                                scope.direction = 'left';
                            }
                            
                            if (ui.position.left > 0) {
                                ui.position.left = 0;
                            }
                            
                            scope.lastLeft = ui.position.left;
                            
                        }
                    });
                }
                
                console.log(element[0].offsetWidth);
            }
        }
    }
}).directive('jnQueueSlideElement', function () {
    return {
        link: function(scope, element, attr) {
            scope.setWidth(element.parent());
        }
    }
});
