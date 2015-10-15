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
app.controller('modalInfoCtrl', function modalInfoCtrl($scope, $element, $rootScope, dataService, playerStatus, YT_event, MODAL_STATUS){
    
    ////////////////////////////
    /////////// VARS ///////////
    ////////////////////////////
    
    $scope.YT_event = YT_event;
    $scope.yt = {
        playerStatus: YT_event.UNSTARTED
    }
    
    //////////////////////////////
    /////////// EVENTS ///////////
    //////////////////////////////
    
    /**
     * Listen for player status changes
     */
    $scope.$on(YT_event.STATUS_CHANGE, function (event, data, code) {
        //$scope.yt.playerStatus = code;
        switch (code) {
            case YT_event.UNSTARTED:
                playerStatus.setUnstart(true);
                break;
            case YT_event.PLAYING:
                playerStatus.setPlay(true);
                break;
            case YT_event.PAUSED:
                playerStatus.setPause(true);
                break;
            case YT_event.ENDED:
                playerStatus.setStop(true);
                break;
        }
    });
    
    /**
     * Listen for the modal OPEN
     */
    $rootScope.$on(MODAL_STATUS.OPEN, function (status, data) {
        $element.fadeTo(200, 1).draggable();
        if (!playerStatus.isUnstarted()) {
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
        
        playerStatus.setUnstart(true);
        
        this.$broadcast(YT_event.PLAY);
        //$scope.yt.playerStatus = YT_event.PLAY;
    }
    
    /**
     * Stop modal video
     * 
     * @returns {void}
     */
    $scope.stopVideo = function() {
        
        if (playerStatus.isPlaying() || playerStatus.isPaused()) {
            this.$broadcast(YT_event.STOP);
        }
    }
    
    /**
     * Put item data into scope of the current modal
     *  
     * @returns {void}
     */
    $scope.setModalGraphic = function() {
        //playerStatus.setUnstart(true);
        //$scope.yt.playerStatus = YT_event.ENDED;
        $scope.stopVideo();
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
        
        $(box).draggable({
            containment: "parent",
            snap: "#myModal",
            stop: function(event, ui) {
                
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
        $rootScope.$emit(MODAL_STATUS.CLOSE, 'CLOSE');
        if (playerStatus.isPlaying() || playerStatus.isPaused()) {
            this.$broadcast(YT_event.STOP);
        }
    };
    
});

app.controller('pushpinCtrl', function pushpinCtrl($scope, $rootScope, $element, dataService, playerStatus, YT_event, MODAL_STATUS){
    
    ////////////////////////////
    /////////// VARS ///////////
    ////////////////////////////
    
    $scope.YT_event = YT_event;
    $scope.yt = {
        playerStatus: YT_event.UNSTARTED
    }
    
    //////////////////////////////
    /////////// EVENTS ///////////
    //////////////////////////////
    
    /**
     * Listen for player status changes
     */
    $scope.$on(YT_event.STATUS_CHANGE, function (event, data, code) {
        switch (code) {
            case YT_event.UNSTARTED:
                playerStatus.setUnstart(true);
                break;
            case YT_event.PLAYING:
                playerStatus.setPlay(true);
                break;
            case YT_event.PAUSED:
                playerStatus.setPause(true);
                break;
            case YT_event.ENDED:
                playerStatus.setStop(true);
                break;
        }
    });
    
    /**
     * Listen for the modal status changes
     */
    $rootScope.$on(MODAL_STATUS.CLOSE, function (status, data) {
        $element.fadeTo(200, 1).draggable();
        
        if (playerStatus.isPlaying()) {
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
        playerStatus.setUnstart(true);
        this.$broadcast(YT_event.PLAY);
    }
    
    /**
     * Stop modal video
     * 
     * @returns {void}
     */
    $scope.stopVideo = function() {
        if (playerStatus.isPlaying() || playerStatus.isPaused()) {
            this.$broadcast(YT_event.STOP);
        }
    }
    
    /**
     * Put item data into scope of the current floating box
     * 
     * @returns {void}
     */
    $scope.setFloatingGraphic = function() {
        $scope.pushpinHide();
        playerStatus.setUnstart(true);
        $scope.item = dataService.post;
    }; 
    
    /**
     * 
     * @param {type} floating_sel
     * @returns {undefined}
     */
    $scope.pushpinHide = function() {
        $scope.stopVideo();
        $element.fadeTo(200, 0);
    };
    
    /**
     * 
     * @returns {undefined}
     */
    $scope.showModal = function() {
        $scope.pushpinHide();
        $rootScope.$emit(MODAL_STATUS.OPEN, 'OPEN');
        if (playerStatus.isPlaying() || playerStatus.isPaused()) {
            this.$broadcast(YT_event.STOP);
        }
    }
});

/**
 * 
 
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
    );
    
});*/

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