
var items = {
    videoPrev       : null,
    this_video_prev : null,
    framePrev       : null,
    modalInfo       : null
}

var utils = {
    'width_window'        : 0,
    'height_window'       : 0,
    'left_dist'           : 0,
    'right_dist'          : 0,
    'incomplete_cover_dx' : false
}

var html = {
    'prev_cover' : "<div class='prev_cover'></div>",
    'ombra_dx'   : "<div class='ombra_dx'></div>",
    'ombra_sx'   : "<div class='ombra_sx'></div>"
}

// HANDLERS

/**
 * 
 * @param {type} width_img
 * @param {type} height_img
 * @param {type} container
 * @returns {resizeImage.css|Object}
 */
function resizeImage(width_img, height_img, container) {
    
    var new_h_img_width_cont = (height_img/width_img)*container.width();
    //console.log(new_h_img_width_cont + " = " + "(" + height_img + "/" + width_img + ")*" + container.width());
    
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
};

/**
 * 
 * @param {type} this_video_prev
 * @param {type} ombra
 * @param {type} left_mod
 * @param {type} cover
 * @returns {undefined}
 */
function show_incomplete_prev(this_video_prev, ombra, left_mod, cover) {
    
    $(this_video_prev).css({'z-index': 200});
    $(this_video_prev).append(ombra);
    cover.append(html.prev_cover);

    $(this_video_prev).stop(true).animate({
        'left': left_mod
    }, 
    {
        duration : 100,
        start: function() {
            cover.find(".prev_cover").hide();

            $(this_video_prev).find($(ombra).attr("class")).hide();

            cover.find(".prev_cover").fadeTo(100, 0.5);
            $(this_video_prev).find($(ombra).attr("class")).fadeTo(100, 1);
        }
    });
}

/**
 * 
 * @param {type} this_video_prev
 * @param {type} ombra
 * @param {type} left_mod
 * @param {type} cover
 * @returns {undefined}
 */
function hide_incomplete_prev(this_video_prev, ombra, left_mod, cover) {
    
    $(this_video_prev).stop(true).animate({
        'left': left_mod
    }, 
    {
        duration : 100,
        start: function() {

            cover.find(".prev_cover").fadeTo(100, 0, function(){
                $(this).remove();
            });

            $(this_video_prev).find("."+$(ombra).attr("class")).fadeTo(100, 0, function() {
                $(this).remove();
            });
        },
        end: function() {
            $(this_video_prev).css({'z-index': 0});
        }
    });
}

// LISTENERS

/*$(window).on('load', function(event){

    utils.width_window = $(window).width();
    utils.height_window = $(window).height();

    $('#main').isotope({
        masonry : {
            columnWidth : 320,
            isFitWidth: true,
            gutter: 10
        }
    });

});*/

$(document).ready(function(){
    /*items.videoPrev = $('.video-prev');
    items.framePrev = $('.frame-prev');
    items.modalInfo = $('.modal-info');

    items.videoPrev.hover(
        function() {
            
            utils.left_dist       = $(this).offset().left;
            utils.right_dist      = $(window).width() - ($(this).offset().left + $(this).width());
            items.this_video_prev = this;
            
            if (utils.left_dist<0) {
                
                // elemento a sinistra parzialmente visibile
                
                var ombra = html.ombra_dx;
                var left_mod = "+=" + ((-utils.left_dist) + 10) + "px";
                var cover = $(items.this_video_prev).next();
                
                show_incomplete_prev(items.this_video_prev, ombra, left_mod, cover);
            }
            else if (utils.right_dist<0) {
                
                // elemento a destra parzialmente visibile
                
                var ombra = html.ombra_sx;
                var left_mod = "-=" + ((-utils.right_dist) + 10)  + "px";
                var cover = $(items.this_video_prev).prev();
                
                show_incomplete_prev(items.this_video_prev, ombra, left_mod, cover);    
            }
        },
        function() {
            
            if (utils.left_dist<0) {
                
                var ombra = html.ombra_dx;
                var left_mod = 0;
                var cover = $(items.this_video_prev).next();
                
                hide_incomplete_prev(items.this_video_prev, ombra, left_mod, cover);
            }
            else if (utils.right_dist<0) {
                
                var ombra = html.ombra_sx;
                var left_mod = $(items.this_video_prev).prev().position().left + $(items.this_video_prev).width() + 10 + "px";
                var cover = $(items.this_video_prev).prev();
                
                hide_incomplete_prev(items.this_video_prev, ombra, left_mod, cover);
            }
            
            
        }
    );*/
    
    /*items.videoPrev.hover(
        function() {
            
            $(this).find('.frame-prev').stop(true).animate({
                'border-width' : '4px'
            },100);
            
            $(this).find('.video-instruments').stop(true).animate({
                'top' : -$(this).find('.video-instruments').innerHeight() + 'px'
            },100);
            
            $(this).find('.cover-prev-img').fadeTo(100, 1);
            
        },
        function() {
            $(this).find('.frame-prev').stop(true).animate({
                'border-width' : '0px'
            },100);
            
            $(this).find('.video-instruments').stop(true).animate({
                'top' : '0px'
            },100);
            
            $(this).find('.cover-prev-img').fadeTo(100, 0);
        }
    );*/
    
    /*$(document).on('click', '.modal-info, .close-modal-info-video', function() {
        var modal = $('.modal-info-video');
        var videoId = $(this).data('video');
        var videoSlug = $(this).data('slug');
        var modalOpen = modal.data('open');
        
        if (modalOpen === true) {
            
            // chiude modal
            
            modal.fadeTo(200, 0, function() {
                modal.data('open', false);
                modal.css({'z-index': -1000});
            });
        }
        else {
            
            // apre modal
            
            // INIT MODAL
            modal.css({'z-index': 1000});
            modal.find('img').attr('src', '');
            
            $.ajax({
                dataType: 'json',
                type: 'GET',
                url: baseUrl() + 'post/' + videoId + '/' + videoSlug,
                success: function(response) {
                    var title            = response.title;
                    var mediafiles       = response.mediafiles;
                    var biggerMediafiles = null;
                    var categories       = response.categories;
                    var description      = response.mediafiles;
                    
                    // si cerca l'ultimo file che dovrebbe essere il più grande possible
                    // TODO: da verificare
                    $.each(mediafiles, function(index, obj) {
                        biggerMediafiles = obj;
                    });
                    
                    modal.find('img').attr('src', biggerMediafiles.url);
                    modal.find('img').css(resizeImage(biggerMediafiles.width, biggerMediafiles.height, modal.find('.img-video')));
                    modal.find('.img-video').find('p').text(title);
                },
                error: function(xhr, status, error){
                    errorResponse(xhr, status, error);
                }
            });
            
            modal.data('open', true);
            modal.fadeTo(200, 1);
        }
    });*/
});