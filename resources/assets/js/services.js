/**
 * Permetter di passare i dati tra la griglia e la modale e tra la modal e la floating
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
 * Da utilizzare per comunicare lo stato del player tra la modale la floating.
 * In questo modo la floating può eventualmente aprtire da dove ha finito la modale
 */
app.service('playerStatus', function() {
    
    var secFromStart = 0;
    var playing      = false;
    var paused       = false;
    var stopped      = false;
    
    return {
        getSecFromStart : function() {
            return secFromStart;
        },
        setSecFromStart : function(sec) {
            secFromStart = sec;
        },
        
        isPlaying : function() {
            return playing;
        },
        setPlay : function(play) {
            playing = play;
            if (playing) {
                this.setPause(false);
                this.setStop(false);
            }
        },
        
        isPaused : function() {
            return paused;
        },
        setPause : function(pause) {
            paused = pause;
            if (paused) {
                this.setPlay(false);
                this.setStop(false);
            }
        },
        
        isStopped : function() {
            return stopped;
        },
        setStop : function(stop) {
            stopped = stop;
            if (stopped) {
                this.setPlay(false);
                this.setPause(false);
            }
        }
    }
})