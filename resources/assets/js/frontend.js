
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
    'incomplete_cover_dx' : false,
    'biggerMediafiles'    : null,
    'x'                   : null,
    'y'                   : null
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
};


function dist_from_top(elem) {
    var scrollTop     = $(window).scrollTop();
    var elementOffset = elem.offset().top;
    
    return (elementOffset - scrollTop);
}

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

$(window).on('load', function(event){
/*
    utils.width_window = $(window).width();
    utils.height_window = $(window).height();

    $('#main').isotope({
        masonry : {
            columnWidth : 320,
            isFitWidth: true,
            gutter: 10
        }
    });
*/
});

$(window).on('resize', function(){
    
    ///TODO aggiustare solo l'altezza
    /*var modal       = $('.modal-info-video');
    var img_header  = modal.find('#img-prev-video');
    
    var height = (modal.find('.img-video').width()/16)*9;
    var total_height = height + $('.video-info-modal ').outerHeight() + $('.dati-video').outerHeight() + $('.header').outerHeight() + 60;

    if (total_height > $(window).height()) {
        height = height - (total_height-$(window).height());
    }
    
    modal.find('.img-video').css({'height':height+'px'})
    img_header.css(resizeImage(utils.biggerMediafiles.width, utils.biggerMediafiles.height, modal.find('.img-video')));*/
    
});

$(document).ready(function(){
    /*$( ".modal-info-video" ).scroll(function(){
        console.log(dist_from_top($('.modal-dialog-info-video')));
        
        if (dist_from_top($('.modal-dialog-info-video'))<=0) {
            $(this).find(".header").css({'position': 'fixed', 'z-index': 1000, 'top': '0px'});
        }
        else {
            $(this).find(".header").css({'position': 'relative', 'z-index': 1});
        }
    });*/
    
    
    var player = null;
    
    $('#myModal').on('hidden.bs.modal', function (e) {
        console.log('stai qui?');
        stopVideo();
    })
    
    $(document).on('click', '#play-video', function() {
        console.log($(this));
        
        $(".sfondo-grid").append("<div id='video-cont' style='position: absolute; width:100%; height:100%; top:0px; padding-bottom:inherit'></div>");
        
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        var id = $(this).attr("data-videoid");
        console.log(id);
        player = new YT.Player('video-cont', {
            videoId: id,
            playerVars: {
                'showinfo': 0,
                'modestbranding': 0,
                'rel': 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });/**/
        
    });
    
    function onPlayerStateChange(event) {
        
        switch (event.data) {
            case -1: return null; break;
            case 0 : 
                console.log('stooooooooop');
                stopVideo(); 
                break;
            default: return null; break;
        }
        
        /*var max_quality = event.target.getAvailableQualityLevels()[0];
        var current_quality = event.target.getPlaybackQuality();
        
        console.log(max_quality);
        console.log(current_quality);
        
        if (current_quality !== max_quality) {
            event.target.setPlaybackQuality(max_quality);
        }*/
        
    }
    
    function onPlayerReady(event) {
        console.log('play');
        //event.target.setPlaybackQuality('default');
        event.target.playVideo();
    }
    
    function stopVideo() {
        if (player != null) {
            player.stopVideo();
            player.clearVideo();
            player.destroy();
            $("#video-cont").remove();
            player = null;
        }
    }
    
    $(document).on('mousemove mouseenter', function(event) {
        utils.x = event.pageX;
        utils.y = event.pageY;
    }); 
    

    /*$('#floating_player').click(function(e){
        console.log(e)
    })*/
    
});