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
 * Controller for main player modal window
 */
app.controller('modalInfoCtrl', function modalInfoCtrl($scope, $rootScope, dataService, playerStatus, YT_event, MODAL_STATUS){
    
    ////////////////////////////
    /////////// VARS ///////////
    ////////////////////////////
    
    $scope.YT_event = YT_event;
    $scope.yt = {
        playerStatus: 0
    }
    
    //////////////////////////////
    /////////// EVENTS ///////////
    //////////////////////////////
    
    /**
     * Listen for player status changes
     */
    $scope.$on(YT_event.STATUS_CHANGE, function (event, data, code) {
        console.log(code);
        $scope.yt.playerStatus = code;
    });
    
    ///////////////////////////////
    /////////// METHODS ///////////
    ///////////////////////////////
    
    /**
     * Play modal video
     * 
     * @returns {void}
     */
    $scope.playVideo = function() {
        
        playerStatus.setSecFromStart(0);
        playerStatus.setPlay(false);
        playerStatus.setPause(false);
        playerStatus.setStop(false);
        
        this.$broadcast(YT_event.PLAY);
    }
    
    /**
     * Stop modal video
     * 
     * @returns {void}
     */
    $scope.stopVideo = function() {
        this.$broadcast(YT_event.STOP);
    }
    
    /**
     * Put item data into scope of the current modal
     *  
     * @returns {void}
     */
    $scope.setModalGraphic = function() {
        $scope.item = dataService.post;
    };
    
    /**
     * @deprecated
     * 
     * @param {string} modal_sel
     * @returns {void}
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
     * Show comment, related and description draggable and resizable boxes
     * 
     * @param {string} box
     * @returns {void}
     */
    $scope.showBox = function(box) {
        $(box).css({'z-index': 1000});
        $(box).fadeTo(100, 1);
        
        var widthModalDialog = $('.modal-dialog').width();
        
        console.log(widthModalDialog);
        
        $(box).draggable({
            containment: "parent",
            snap: "#myModal",
            stop: function(event, ui) {
                
                /*var positionRightDraggableBox = $(window).width()-(ui.position.left + $(box).width());
                
                
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
     * Hide comment, related and description draggable and resizable boxes
     * 
     * @param {string} box
     * @returns {void}
     */
    $scope.hideBox = function(box) {
        $(box).fadeTo(100, 0, function() {
            $(box).css({'z-index': -1000});
        });
    }
    
    /**
     * Give focus to the clicked box
     * 
     * @param {string} target       selector clicked box
     * @param {string} other_boxes  other opened boxes
     * @returns {void}
     */
    $scope.focus = function(target, other_boxes) {

        $(other_boxes).css({'z-index': 999});
        $(target).css({'z-index': 1000});
    }
    
    /**
     * Close the modal and open a floating box where a new player start playing
     * 
     * @param {string} box
     * @returns {void}
     */
    $scope.showFloating = function(box) {
        
        $rootScope.$emit(MODAL_STATUS.STATUS_CHANGE, 'CLOSE', MODAL_STATUS.CLOSE);
        this.$broadcast(YT_event.STOP);
        
        /*$(box).fadeTo(200, 1).draggable();
        
        if (utils.player['modal'] != null) {
            var videCurrentTime = utils.player['modal'].getCurrentTime();
            playerManageHelper($('#play-video-floating'), 'video-cont-floating', 'floating', videCurrentTime);
            $('#floating_player').attr('ng-statuslistener', utils.player['floating'].getPlayerState());
        }
        
        $('#myModal').modal('hide');
        
        debug_console("videCurrentTime: " + videCurrentTime);*/
        
    };
    
});

app.controller('pushpinCtrl', function pushpinCtrl($scope, $rootScope, $element, dataService, playerStatus, YT_event, MODAL_STATUS){
    
    ////////////////////////////
    /////////// VARS ///////////
    ////////////////////////////
    
    $scope.YT_event = YT_event;
    $scope.yt = {
        playerStatus: 0
    }
    
    //////////////////////////////
    /////////// EVENTS ///////////
    //////////////////////////////
    
    /**
     * Listen for player status changes
     */
    $rootScope.$on(MODAL_STATUS.STATUS_CHANGE, function (status, data, code) {
        if (code === MODAL_STATUS.CLOSE) {
            $element.fadeTo(200, 1).draggable();
            $scope.$broadcast(YT_event.PLAY);
        }
    });
    
    ///////////////////////////////
    /////////// METHODS ///////////
    ///////////////////////////////
    
    /**
     * Play modal video
     * 
     * @returns {void}
     */
    $scope.playVideo = function() {
        playerStatus.setSecFromStart(0);
        playerStatus.setPlay(false);
        playerStatus.setPause(false);
        playerStatus.setStop(false);
        this.$broadcast(YT_event.PLAY);
    }
    
    /**
     * Stop modal video
     * 
     * @returns {void}
     */
    $scope.stopVideo = function() {
        this.$broadcast(YT_event.STOP);
    }
    
    /**
     * Put item data into scope of the current floating box
     * 
     * @returns {void}
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
        
        //stopVideo('floating');
        $scope.stopVideo();
        //$('div#video-cont-floating').remove();
        //$(floating_sel).fadeTo(200, 0);
        $element.fadeTo(200, 0);
    };
    
    /**
     * 
     * @param {type} item
     * @param {type} modal_sel
     * @param {type} floating_sel
     * @returns {undefined}
     */
    $scope.returnModal = function(item, modal_sel, floating_sel) {
        
        //TODO gestire il ritorno in modale con i secondi di riproduzione, utilizzare listener e il pulsante di ritorno come quello che apre la modale, dovrebbe funzionare
        //TODO ci sono troppi todo
        
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
        
        if (utils.player['floating'] != null) {
            var videCurrentTime = utils.player['floating'].getCurrentTime();
            playerManageHelper($('#play-video'), 'video-cont', 'modal', videCurrentTime);
            $('#myModal').attr('ng-statuslistener', utils.player['modal'].getPlayerState());
        }
        
        $scope.pushpinHide(floating_sel);
    }
    
    /*
    
    $scope.$watch(function() { return $scope.element }, function(newValue, oldValue) {
        },true
    );*/
});

/**
 * 
 */
app.controller('menuCtrl', function menuCtrl($scope, $window) {
    
    // conservare
    $scope.$watch(function() { return $scope.fixed }, function(newValue, oldValue) {
        
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
    
});

app.controller('YouTubeCtrl', function YouTubeCtrl($scope, YT_event) {
    $scope.YT_event = YT_event;
    $scope.yt = {
        playerStatus: 0
    }
    /**
     * 
     */
    $scope.playVideo = function() {
        this.$broadcast(YT_event.PLAY);
    }
    
    /**
     * TODO: questo controller e rispettiva directive sono ok, usarli per rifare tutte le opzioni del player come stop all'uscita e scambio di player
     */
    $scope.$on(YT_event.STATUS_CHANGE, function (event, data, code) {
        console.log(code);
        
        $scope.yt.playerStatus = code;
    });
})