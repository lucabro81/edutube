/**
 * Permette di passare i dati tra la griglia e la modale e tra la modale e la floating
 */
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

/**
 * Da utilizzare per comunicare lo stato del player tra la modale la floating ed eventualmente altri controller.
 * In questo modo la floating può eventualmente partire da dove ha finito la modale
 */
app.service('playerStatus', function() {
    
    var secFromStart = 0;
    var playing      = false;
    var paused       = false;
    var stopped      = false;
    var unstarted    = true;
    var buffered     = false;
    var loaded       = false;
    
    return {
        /**
         * 
         * @returns {sec|Number}
         */
        getSecFromStart : function() {
            return secFromStart;
        },
        /**
         * 
         * @param {int} sec
         * @returns {void}
         */
        setSecFromStart : function(sec) {
            secFromStart = sec;
        },
        
        /**
         * 
         * @returns {play|Boolean}
         */
        isPlaying : function() {
            return playing;
        },
        /**
         * 
         * @param {boolean} play
         * @returns {void}
         */
        setPlay : function(play) {
            playing = play;
            if (playing) {
                this.setPause(false);
                this.setStop(false);
                this.setUnstart(false);
                this.setBuffering(false);
                this.setLoaded(true);
            }
        },
        
        /**
         * 
         * @returns {Boolean|pause}
         */
        isPaused : function() {
            return paused;
        },
        /**
         * 
         * @param {boolean} pause
         * @returns {void}
         */
        setPause : function(pause) {
            paused = pause;
            if (paused) {
                this.setPlay(false);
                this.setStop(false);
                this.setUnstart(false);
                this.setBuffering(false);
                this.setLoaded(true);
            }
        },
        
        /**
         * 
         * @returns {stop|Boolean}
         */
        isStopped : function() {
            return stopped;
        },
        /**
         * 
         * @param {boolean} stop
         * @returns {void}
         */
        setStop : function(stop) {
            stopped = stop;
            if (stopped) {
                this.setPlay(false);
                this.setPause(false);
                this.setUnstart(false);
                this.setBuffering(false);
                this.setLoaded(true);
            }
        },
        
        /**
         * 
         * @returns {unstart|Boolean}
         */
        isUnstarted : function() {
            return unstarted;
        },
        /**
         * 
         * @param {boolean} unstart
         * @returns {void}
         */
        setUnstart : function(unstart) {
            unstarted = unstart;
            if (unstarted) {
                secFromStart = 0;
                this.setPlay(false);
                this.setPause(false);
                this.setStop(false);
                this.setBuffering(false);
                this.setLoaded(true);
            }
        },
        
        /**
         * 
         * @returns {buffering|Boolean}
         */
        isBuffering : function() {
            return buffered;
        },
        /**
         * 
         * @param {boolean} buffering
         * @returns {void}
         */
        setBuffering : function(buffering) {
            buffered = buffering;
            if (buffered) {
                secFromStart = 0;
                this.setPlay(false);
                this.setPause(false);
                this.setStop(false);
                this.setUnstart(false);
                this.setLoaded(true);
            }
        },
        
        /**
         * 
         * @returns {loaded|Boolean}
         */
        isLoading : function() {
            return loaded;
        },
        /**
         * 
         * @param {boolean} load
         * @returns {void}
         */
        setLoaded : function(load) {
            loaded = load;
            if (loaded) {
                secFromStart = 0;
                this.setPlay(false);
                this.setPause(false);
                this.setStop(false);
                this.setUnstart(false);
                this.setBuffering(false);
            }
        }
    }
})