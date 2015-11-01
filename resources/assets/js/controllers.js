/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
app.controller('ItemsCtrl', function ItemsCtrl($scope, $rootScope, dataService, QUEUE_event) {
    
    /**
     * 
     * @returns {undefined}
     */
    $scope.update = function() {
        dataService.getPosts().then(function (data) {                       
            $scope.collection = data;
        });
    };
    
    $scope.update(); 
    
});

/**
 * Controller for main player modal window
 */
app.controller('modalInfoCtrl', function modalInfoCtrl($scope, $element, $rootScope, $window, dataService, playerStatus, YT_event, MODAL_STATUS){
    
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
            case YT_event.LOADING:
                playerStatus.setLoading(true);
                break;
            case YT_event.UNSTARTED:
                playerStatus.setUnstart(true);
                break;
            case YT_event.PLAYING:
                playerStatus.setPlay(true);
                break;
            case YT_event.PAUSED:
                playerStatus.setPause(true);
                break;
            case YT_event.BUFFERING:
                playerStatus.setBuffering(true);
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
        
        if (playerStatus.getSecFromStart()>0) {
            playerStatus.setPlay(true);
            $scope.$broadcast(YT_event.PLAY);
        }
    });
    
    ////////////////////////////////
    /////////// WATCHERS ///////////
    ////////////////////////////////
    
    /**
     * Init the modal data
     */
    $scope.$watch(function() {
            return dataService.post;
        }, 
        function(value, oldValue) {

            $scope.setModalGraphic()

        }, 
        true
    );
    
    ///////////////////////////////
    /////////// METHODS ///////////
    ///////////////////////////////
    
    /**
     * Play modal video
     * 
     * @returns {void}
     */
    $scope.playVideo = function() {
        playerStatus.setLoading(true);
        this.$broadcast(YT_event.PLAY);
    }
    
    /**
     * Stop modal video
     * 
     * @returns {void}
     */
    $scope.stopVideo = function() {
        
        if (playerStatus.isPlaying() || 
            playerStatus.isPaused() || 
            playerStatus.isBuffering() || 
            playerStatus.isLoading()) {
            
            this.$broadcast(YT_event.STOP);
        }
    }
    
    /**
     * Put item data into scope of the current modal
     *  
     * @returns {void}
     */
    $scope.setModalGraphic = function() {
        $scope.stopVideo();
        $scope.item = dataService.getPost();
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
    $scope.showFloating = function() {
       
        /*$scope.$watch(function() { return playerStatus }, function(value) {
            if (playerStatus.isPlaying() || playerStatus.isPaused() || playerStatus.isBuffering()) {
                this.$broadcast(YT_event.STOP);
            }
        })*/
        
        if (playerStatus.isPlaying() || 
            playerStatus.isPaused() || 
            playerStatus.isBuffering() || 
            playerStatus.isLoading()) {
        
            this.$broadcast(YT_event.STOP);
            
        }
        
        $rootScope.$emit(MODAL_STATUS.CLOSE, 'CLOSE');
        
    };

    /**
     * 
     * @param {String} queueBox
     * @returns {void}
     */
    $scope.addVideoToQueue = function() {
        dataService.pushPostToQueue($scope.item);
        $rootScope.$emit(QUEUE_event.ADD, 'ADD');
    }
    
});

/**
 * Controller for floating player window
 */
app.controller('pushpinCtrl', function pushpinCtrl($scope, $rootScope, $element, $window, dataService, playerStatus, YT_event, MODAL_STATUS, QUEUE_event){
    
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
            case YT_event.LOADING:
                playerStatus.setLoading(true);
                break;
            case YT_event.UNSTARTED:
                playerStatus.setUnstart(true);
                break;
            case YT_event.PLAYING:
                playerStatus.setPlay(true);
                break;
            case YT_event.PAUSED:
                playerStatus.setPause(true);
                break;
            case YT_event.BUFFERING:
                playerStatus.setBuffering(true);
                break;
            case YT_event.ENDED:
                $scope.stopVideo();
                //playerStatus.setStop(true);
                
                /*
                if ($('#queue-box-cont').find('div').length > 0) {
                    $window.onYouTubeIframeAPIReady($scope.item.YT_id);
                }
                */
                                    
                if (dataService.getQueueDim() > 0) {
                    
                    $scope.item = dataService.getCurrentPostAndNext();
                    $scope.playVideo();
                    
                }
                break;
        }
    });
    
    /**
     * Listen for the modal status changes
     */
    $rootScope.$on(MODAL_STATUS.CLOSE, function (status, data) {
        $element.fadeTo(200, 1).draggable();
        
        if (playerStatus.getSecFromStart()>0) {
        //if (!playerStatus.isUnstarted()) {
            playerStatus.setPlay(true);
            $scope.$broadcast(YT_event.PLAY);
        }
    });
    
    ////////////////////////////////
    /////////// WATCHERS ///////////
    ////////////////////////////////
    
    $scope.$watch(function() {
            return dataService.post;
        }, 
        function(value, oldValue) {
            $scope.setFloatingGraphic();
            //playerStatus.setUnstart(true);
        }, 
        true
    );
    
    ///////////////////////////////
    /////////// METHODS ///////////
    ///////////////////////////////
    
    /**
     * Play modal video
     * 
     * @returns {void}
     */
    $scope.playVideo = function() {
        
        playerStatus.setLoading(true);
        this.$broadcast(YT_event.PLAY);

    }
    
    /**
     * Stop modal video
     * 
     * @returns {void}
     */
    $scope.stopVideo = function() {
        
        if (playerStatus.isPlaying() || 
            playerStatus.isPaused() || 
            playerStatus.isBuffering() || 
            playerStatus.isLoading()) {
            this.$broadcast(YT_event.STOP);
        }
    }
    
    /**
     * Put item data into scope of the current floating box
     * 
     * @returns {void}
     */
    $scope.setFloatingGraphic = function() {
        $scope.pushpinHide(); // altrimenti la floating non se ne va quando si apre un'altra modale 
        playerStatus.setUnstart(true);
        $scope.item = dataService.getPost();
    }; 
    
    /**
     * 
     * @param {type} floating_sel
     * @returns {undefined}
     */
    $scope.pushpinHide = function() {
        
        $scope.stopVideo();
        $element.fadeTo(200, 0);
        $element.css({
            'display': 'none'
        });
    };
    
    /**
     * 
     * @returns {undefined}
     */
    $scope.showModal = function() {
        $element.fadeTo(200, 0);
        
        if (playerStatus.isPlaying() || 
            playerStatus.isPaused() || 
            playerStatus.isBuffering() || 
            playerStatus.isLoading()) {
        
            this.$broadcast(YT_event.STOP);
        }
        
        $rootScope.$emit(MODAL_STATUS.OPEN, 'OPEN');
    }
    
    $scope.addVideoToQueue = function() {
        dataService.pushPostToQueue($scope.item);
        $rootScope.$emit(QUEUE_event.ADD, 'ADD');
    }
});

app.controller('QeueboxCtrl', function QeueBoxCtrl($scope, $document, $window, $element) {
    /**
     * init queue box
     */
    $document.ready(function () {
        
        $element.css({
            'bottom': -$element[0].offsetHeight + 'px'
        });
    });
    
    
    $scope.openCloseQueueBox = function() {
        
        if (($window.innerHeight - Math.ceil($element[0].getBoundingClientRect().top))>0) {
            $element.animate({
                'bottom': -$element[0].offsetHeight + 'px',
                //'-webkit-box-shadow': '0 0 0 0 rgba(0, 0, 0, 0.5)',
                //'box-shadow': '0 0 0 0 rgba(0, 0, 0, 0.5)'
            }, 100); 
        }
        else {
            $element.animate({
                'bottom': 0,
                //'-webkit-box-shadow': '0 0 100px 30px rgba(0, 0, 0, 0.5)',
                //'box-shadow': '0 0 100px 30px rgba(0, 0, 0, 0.5)'
            }, 100);
        }
    } 
});

app.controller('QeueCtrl', function QeueCtrl($scope, $rootScope, $element, dataService, playerStatus, QUEUE_event) {
    
    ////////////////////////////
    /////////// VARS ///////////
    ////////////////////////////
    
    //////////////////////////////
    /////////// EVENTS ///////////
    //////////////////////////////
    
    
    
    $rootScope.$on(QUEUE_event.ADD, function(data) {
        $scope.queue = dataService.getQueue();
    });
    
    ///////////////////////////////
    /////////// METHODS ///////////
    ///////////////////////////////
    
})
