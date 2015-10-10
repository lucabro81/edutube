app.directive('isoRepeat', function ($timeout, dataService ) {
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

            /*
            element.on('layoutComplete',
                function() {
                    $('.post-open').css({'width':'100%'});
                }
            )
            */

            scope.modalInfoShow = function(item, modal_sel){
            //scope.modalInfoShow = function(item, selected_elem){

                /*var last_item = $(".video-prev").filter(function() { 
                    return $(this).offset().top == $(selected_elem).offset().top 
                }).last();

                last_item.after("<div class='video-prev post-open'></div>");

                element.isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' }); */


                //console.log($((element).children("#"+filtered_items.last().attr('id'))));

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
                            console.log(height);
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



                //$('body').addClass('noscroll');
            }
        }
    }
});

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
});

app.directive('ngFixedmenu', function($window) {
    
    return function(scope, element, attrs) {
        /*$(window).on('scroll',function() {
            if ($(window).scrollTop()>500) {
                $(element).addClass('fixed-menu');
                $("#main-cont").css({'margin-top':'40px'});
                
            }
            
            else {
                $(element).removeClass('fixed-menu');
                $("#main-cont").css({'margin-top':'0px'});
            }
        })*/
        
        //angular.element($window).bind('scroll', function () {
       /* element.bind('scroll', function () {
            
            if ($window.scrollY>500) {
                scope.fixed = true;
            }
            else {
                scope.fixed = false;
            }
            
            console.log(element);
            
            scope.$apply();
        });*/
        
        scope.$watch(function(){
                return element[0].getBoundingClientRect().top + $window.pageYOffset;
            }, 
            function(newValue, oldValue){
                console.log(newValue + ", " + oldValue)
            }
        );
    };
    
})