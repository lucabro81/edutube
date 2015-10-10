/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
app.filter('dateToISO', function() {
    return function(input) {
        if (input != undefined) {
            var goodTime = input.replace(/(.+) (.+)/, "$1T$2Z");
            return goodTime;
        }
        return null;
    };
});

/**
 * 
 */
app.filter('imgByName', function(){
    return function(input, name) {
        
        var imgUrl = '';
        
        if (input) {
            $.each(input, function(i, obj) {
                if (obj.nome === name) {
                    imgUrl = obj.url;
                    return false;
                }
            });

            if (imgUrl === '') {
                return 'placeholder';
            }
            return imgUrl;
        }
        return null
    };
});