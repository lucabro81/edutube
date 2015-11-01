
/**
 * Ritorna il baseurl del sito
 * 
 * @returns {String}
 */
function baseUrl() {
    var win_loc = window.location;
    if (win_loc.host === 'localhost') {
        return win_loc.protocol + "//" + win_loc.host + "/edutube/public/";
    }
    return win_loc.protocol + "//" + win_loc.host + "/remote/host/path/";
};

/**
 * Scrive in console solo se siamo su localhost
 * 
 * @param {String} msg
 * @returns {void}
 */
function debug_console(msg) {
    var win_loc = window.location;
    if (win_loc.host === 'localhost') {
        console.log(msg);
    }
}

/**
 * Scrive in console la risposta delle richieste via ajax
 * 
 * @param {type} xhr
 * @param {type} status
 * @param {type} error
 * @returns {undefined}
 */
function errorResponse(xhr, status, error) {
    debug_console(xhr);
    debug_console(status);
    debug_console(error);
}

/**
 * Ridimensiona e centra l'immagine contenuta in container passando le dimensione e il contenitore della stesa
 * 
 * @param {int} width_img
 * @param {int} height_img
 * @param {jQuery} container
 * @returns {Object}
 
function resizeImage(width_img, height_img, container) {
    
    var new_h_img_width_cont = (height_img/width_img)*container.width();
    console.log(container.height());
    
    var css = new Object();

    if (new_h_img_width_cont <= container.height()) {
        var width_num = ((width_img/height_img)*container.height());
        var height_num = container.height();
        css['width']       = width_num + 'px';
        css['height']      = height_num + 'px';
        css['margin-top']  = '0px';
        css['margin-left'] = (-(width_num-container.width())/2) + 'px';
    }
    else {
        css['width']       = container.width() + 'px';
        css['height']      = new_h_img_width_cont + 'px';
        css['margin-top']  = (-(new_h_img_width_cont - container.height())/2) + 'px';
        css['margin-left'] = '0px';
    }

    return css;
};*/

/**
 * Ritorna la distanza dal bordo top della finestra dell'elemento passato
 * 
 * @param {int} elem
 * @returns {int}
 */
function dist_from_top(elem) {
    var scrollTop     = $(window).scrollTop();
    var elementOffset = elem.offset().top;
    
    return (elementOffset - scrollTop);
}