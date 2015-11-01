/**
 * Permette di passare i dati tra la griglia e la modale e tra la modale e la floating.
 * Permette di getire una coda di post in attesa di gestione
 */
app.service('dataService', function ($http) {
    return {
        post: null,
        queue: [],
        current: 0,
        
        /**
         * 
         * @returns {Object}
         */
        getPosts: function () {
            var promise = $http
                .get(baseUrl() + 'api/posts')
                .then(function (resp) {
                    return resp.data.featured;
                });
            return promise;
        },
        
        /**
         * 
         * @param {Object} post
         * @returns {void}
         */
        setPost: function (post) {
            this.post = post;
        },
        /**
         * 
         * @returns {Object}
         */
        getPost: function () {
            return this.post;
        },
        
        /**
         * 
         * @returns {void}
         */
        iniPostQueue: function() {
            this.queue = [];
        },
        /**
         * 
         * @param {Object} item
         * @returns {void}
         */
        pushPostToQueue: function(item) {
            this.queue.push(item);
        },
        /**
         * 
         * @returns {Object}
         */
        popPostToQueue: function() {
            return this.queue.pop();
        },
        /**
         * 
         * @returns {int}
         */
        getQueueDim: function() {
            return this.queue.length;
        },
        /**
         * 
         * @param {int} index
         * @returns {Object}
         */
        getPostAtIndex: function(index) {
            this.current = index;
            return this.queue[index];
        },
        /**
         * 
         * @returns {Array}
         */
        getQueue: function() {
            return this.queue;
        },
        /**
         * 
         * @returns {int}
         */
        getCurrentIndex: function() {
            return this.current
        },
        /**
         * 
         * @returns {Object}
         */
        getCurrentPost: function() {
            return this.queue[this.current];
        },
        /**
         * 
         * @returns {Object}
         */
        getCurrentPostAndNext: function() {
            var post = this.queue[this.current];
            if ((this.current+1) < (this.getQueueDim()-1)) {
                this.current += 1;
            }
            return post;
        },
        /**
         * 
         * @returns {Object}
         */
        getCurrentPostAndPrev: function() {
            var post = this.queue[this.current];
            if ((this.current-1) > 0) {
                this.current -= 1;
            }
            return post;
        },
        /**
         * 
         * @returns {Object|Boolean}
         */
        nextPost: function() {
            if ((this.current+1) > (this.getQueueDim()-1)) {
                return false;
            }
            
            this.current += 1;
            return this.queue[this.current];
        },
        /**
         * 
         * @returns {Object|Boolean}
         */
        prevPost: function() {
            if ((this.current-1) < 0) {
                return false;
            }
            
            this.current -= 1;
            return this.queue[this.current];
        },
        /**
         * 
         */
        printStatus : function() {
            console.log("Queue: " + this.queue);
            console.log("Current: " + this.queue[this.current]);
            console.log("Current key: " + this.current);
        }
    };
});

/**
 * Da utilizzare per comunicare lo stato del player tra la modale la floating ed eventualmente altri controller.
 * In questo modo la floating può eventualmente partire da dove ha finito la modale
 */

app.service('playerStatus', function() {
    return {
        secFromStart : 0,
        playing      : false,
        paused       : false,
        stopped      : false,
        unstarted    : true,
        buffering    : false,
        loading      : false,
        
        /**
         * 
         * @returns {sec|Number}
         */
        getSecFromStart : function() {
            return this.secFromStart;
        },
        /**
         * 
         * @param {int} sec
         * @returns {void}
         */
        setSecFromStart : function(sec) {
            this.secFromStart = sec;
        },
        
        /**
         * 
         * @returns {play|Boolean}
         */
        isPlaying : function() {
            return this.playing;
        },
        /**
         * 
         * @param {boolean} play
         * @returns {void}
         */
        setPlay : function(play) {
            this.playing = play;
            if (this.playing) {
                this.paused = false;
                this.stopped = false;
                this.unstarted = false;
                this.buffering = false;
                this.loading = false;
            }
        },
        
        /**
         * 
         * @returns {Boolean|pause}
         */
        isPaused : function() {
            return this.paused;
        },
        /**
         * 
         * @param {boolean} pause
         * @returns {void}
         */
        setPause : function(pause) {
            this.paused = pause;
            if (this.paused) {
                this.playing = false;
                this.stopped = false;
                this.unstarted = false;
                this.buffering = false;
                this.loading = false;
            }
        },
        
        /**
         * 
         * @returns {stop|Boolean}
         */
        isStopped : function() {
            return this.stopped;
        },
        /**
         * 
         * @param {boolean} stop
         * @returns {void}
         */
        setStop : function(stop) {
            this.stopped = stop;
            if (this.stopped) {
                this.playing = false;
                this.paused = false;
                this.unstarted = false;
                this.buffering = false;
                this.loading = false;
            }
        },
        
        /**
         * 
         * @returns {unstart|Boolean}
         */
        isUnstarted : function() {
            return this.unstarted;
        },
        /**
         * 
         * @param {boolean} unstart
         * @returns {void}
         */
        setUnstart : function(unstart) {
            this.unstarted = unstart;
            if (this.unstarted) {
                this.secFromStart = 0;
                this.playing = false;
                this.paused = false;
                this.stopped = false;
                this.buffering = false;
                this.loading = false;
            }
        },
        
        /**
         * 
         * @returns {buffering|Boolean}
         */
        isBuffering : function() {
            return this.buffering;
        },
        /**
         * 
         * @param {boolean} buffering
         * @returns {void}
         */
        setBuffering : function(buffering) {
            this.buffering = buffering;
            if (this.buffering) {
                this.secFromStart = 0;
                this.loading = false;
                this.playing = false;
                this.paused = false;
                this.stopped = false;
                this.unstarted = false;
            }
        },
        
        /**
         * 
         * @returns {loaded|Boolean}
         */
        isLoading : function() {
            return this.loading;
        },
        /**
         * 
         * @param {boolean} load
         * @returns {void}
         */
        setLoading : function(load) {
            this.loading = load;
            if (this.loading) {
                this.secFromStart = 0;
                this.playing = false;
                this.paused = false;
                this.stopped = false;
                this.unstarted = false;
                this.buffering = false;
            }
        },
        
        /**
         * 
         */
        printStatus : function() {
            console.log("secFromStart: " + this.getSecFromStart());
            console.log("playing: " + this.isPlaying());
            console.log("paused: " + this.isPaused());
            console.log("stopped: " + this.isStopped());
            console.log("unstarted: " + this.isUnstarted());
            console.log("buffering: " + this.isBuffering());
            console.log("loading: " + this.isLoading());
        }
    }
})