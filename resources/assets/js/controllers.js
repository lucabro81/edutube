/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
app.controller('ItemsCtrl', function ItemsCtrl($scope, $timeout, dataService) {
    
    /**
     * 
     * @returns {undefined}
     */
    $scope.update = function() {
        
        dataService.get().then(function (data) {                       
            $scope.collection = data;
        });
    };
    
    $scope.update(); 
    
});

/**
 * 
 */
app.controller('modalInfoCtrl', function modalInfoCtrl($scope, dataService, $interval){
    
    /**
     * 
     * @returns {undefined}
     */
    $scope.setModalGraphic = function() {
        $scope.item = dataService.post;
    };
    
    /**
     * 
     * @param {type} modal_sel
     * @returns {undefined}
     */
    $scope.modalInfoHide = function(modal_sel) {
        
        var modal = $(modal_sel);
        modal.attr('hideon', 0);
        
        modal.fadeTo(200, 0, function() {
            modal.css({'z-index': -1000});
        });
        
        $('html, body').removeClass('noscroll');
    };
    
    /**
     * 
     * @param {type} box
     * @returns {undefined}
     */
    $scope.showBox = function(box) {
        $(box).css({'z-index': 1000});
        $(box).fadeTo(100, 1);
        
        var widthModalDialog = $('.modal-dialog').width();
        
        $(box).draggable({
            containment: "parent",
            snap: "#myModal",
            stop: function(event, ui) {
                
                /*var positionRightDraggableBox = $(window).width()-(ui.position.left + $(box).width());
                
                console.log("ui.position.left: " + ui.position.left);
                console.log("$(box).width(): " + $(box).width());
                console.log("positionRightDraggableBox: " + positionRightDraggableBox);
                
                if (positionRightDraggableBox <= 30) {
                    $('.modal-dialog').css({
                        'width': (widthModalDialog - $(box).width() - 30) + 'px',
                        'margin' : '0 auto 0 0'
                    });
                }
                else {
                    $('.modal-dialog').css({
                        'width': '100%',
                        'margin' : '0 auto'
                    });
                }*/
            }
        });
        $(box).resizable({
            handles: "n, e, s, w, se",
            resize: function( event, ui ) {
                
            }
        });
    }
    
    /**
     * 
     * @param {type} box
     * @returns {undefined}
     */
    $scope.hideBox = function(box) {
        $(box).fadeTo(100, 0, function() {
            $(box).css({'z-index': -1000});
        });
    }
    
    /**
     * 
     * @param {type} target
     * @param {type} other_boxes
     * @returns {undefined}
     */
    $scope.focus = function(target, other_boxes) {

        $(other_boxes).css({'z-index': 999});
        $(target).css({'z-index': 1000});
    }
    
    /*$scope.$watch(function() { return $scope.fixed }, function(newValue, oldValue) {
        
            console.log(newValue+" "+oldValue);
            if (newValue != oldValue) {
                if (newValue) {
                    $('nav').addClass('fixed-menu');
                }
                else {
                    $('nav').removeClass('fixed-menu');
                }
            }
        },true
    );*/
    
    /**
     * 
     * @param {selector} box
     * @returns {void}
     */
    $scope.pushpin = function(box) {
        
        $(box).fadeTo(200, 1).draggable();
        
        if (utils.player['modal'] != null) {
            var videCurrentTime = utils.player['modal'].getCurrentTime();
            playerManageHelper($('#play-video-floating'), 'video-cont-floating', 'floating', videCurrentTime);
        }
        
        $('#myModal').modal('hide');
        
        debug_console("videCurrentTime: " + videCurrentTime);
        
    };
    
    /*
    var promise;      
    var holded = false;

    $scope.mouseDown = function() {
        promise = $interval(function () { 
            holded = true;
        }, 1000);
    };

    $scope.mouseUp = function () {
        holded = false;
        $interval.cancel(promise);
    };
    
    $scope.$watch(function(){ return holded;}, function(newValue, oldValue) {
        
        if (newValue != oldValue) {
            if (newValue) {
                //hold
                
                
                console.log(utils.x);
                console.log(utils.y);
            }
            else {
                //release
                
            }
        }
    },true);
    */
});

app.controller('pushpinCtrl', function pushpinCtrl($scope, dataService, $interval){
   /**
     * 
     * @returns {undefined}
     */
    $scope.setFloatingGraphic = function() {
        $scope.item = dataService.post;
    }; 
    
    /**
     * 
     * @param {type} floating_sel
     * @returns {undefined}
     */
    $scope.pushpinHide = function(floating_sel) {
        console.log(floating_sel);
        
        stopVideo('floating');
        $('div#video-cont-floating').remove();
        $(floating_sel).fadeTo(200, 0);
    };
    
    $scope.returnModal = function(item, modal_sel, floating_sel) {
        $scope.pushpinHide(floating_sel);
        
        var modal = $(modal_sel);

        $('.modal-dialog').css({
            //'margin': '0 auto',
            'width': '100%',
            'height': '100%',
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



        img_header.attr('src', utils.biggerMediafiles.url);
        img_header.one('load', function () {

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

            //TODO: inserire spinner
            //TODO: vedere se si riesce a sistemare la transizione fade

        });
    }
});

/**
 * 
 */
app.controller('menuCtrl', function menuCtrl($scope, $window) {
    
    // conservare
    $scope.$watch(function() { return $scope.fixed }, function(newValue, oldValue) {
        
            console.log(newValue+" "+oldValue);
            if (newValue != oldValue) {
                if (newValue) {
                    $('nav').addClass('fixed-menu');
                }
                else {
                    $('nav').removeClass('fixed-menu');
                }
            }
        },true
    );/**/
    
})