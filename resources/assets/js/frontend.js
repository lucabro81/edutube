// HANDLERS

var items = {
    'videoPrev'     : null
}

var utils = {
    'width_window'  : 0,
    'height_window' : 0
}

// HANDLERS

function resizeImage(width_img, height_img, container) {

	var new_h_img_width_cont = (height_img/width_img)*container.width();
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

// LISTENERS

//TODO: da rivedere
$(window).resize(function() {
    items.videoPrev.css({'min-height':0});
    
    if (this.resizeTO) {
        clearTimeout(this.resizeTO);
    }
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 500);
});

$(window).on('load resizeEnd', function(event){

    utils.width_window = $(window).width();
    utils.height_window = $(window).height();

    if (event.type==='load') {
        // INIT
        
    }
 
    items.videoPrev.each(function(){
        var img = $(this).find('img').eq(0);
        img.css(resizeImage(img.width(),img.height(),$(this)));
    });

});

$(document).ready(function(){
    items.videoPrev = $('.video-prev');

    items.videoPrev.hover(
        function() {
            $(this).children('.video-info').stop(true).animate({
                'bottom' : 0
            }, 200);
            
            $(this).children('.video-instruments').stop(true).animate({
                'top' : 0
            }, 200);
        },
        function() {
            $(this).children('.video-info').stop(true).animate({
                'bottom' : '-50%'
            }, 200); 
            
            $(this).children('.video-instruments').stop(true).animate({
                'top' : '-25%'
            }, 200);
            
            // dropdown categories collapse
            $(this).find('.first-category').attr('aria-expanded',false);
            $(this).find('.first-category').parent().removeClass('open');
            
            // dropdown video options
            $(this).find('.video-options').attr('aria-expanded',false);
            $(this).find('.video-options').parent().removeClass('open');
        }
    );
});