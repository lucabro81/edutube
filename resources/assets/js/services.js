/**
 * 
 * @param {type} param1
 * @param {type} param2
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

app.service('autoPlayer', function() {
    return {
        play: false
    }
});