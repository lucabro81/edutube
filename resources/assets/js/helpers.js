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

/**
* 
* @param {type} event
* @returns {unresolved}
*/
function onPlayerStateChange(event, playerType) {

    if (utils.player['floating'] != null) {
        $('#floating_player').attr('ng-statuslistener', event.data);
    }
    
    if (utils.player['modal'] != null) {
        $('#myModal').attr('ng-statuslistener', event.data);
    }

    console.log('event.data' + event.data);

    switch (event.data) {
        case -1: return null; break;
        case 0 : 
            console.log('stop video');
            stopVideo(playerType); 

            /*if ($('#queue-box-cont').find('div').length > 0) {
                playerManageHelper($('#play-video-floating'), 'video-cont-floating', 'floating', 0);
            }*/

        break;
        case 2:
            console.log('pause video');
        break;
        case 5:
            console.log('cued video');
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

/**
* 
* @param {type} event
* @returns {undefined}
*/
function onPlayerReady(event, start) {
    console.log('play');
    
    if (start>0) {
        event.target.seekTo(start, false);
    }
    
    event.target.playVideo();
}

/**
* 
* @param {type} cont
* @returns {Boolean}
*/
function stopVideo(playerType){
    
    if (utils.player[playerType] !== null) {

        utils.player[playerType].stopVideo();
        //utils.player[playerType].clearVideo();
        //utils.player[playerType].destroy();
        
        //utils.player[playerType] = null;
        
        return true;
    }
    return false;
}

/**
 * 
 * @param {type} playButton
 * @param {type} idVideoCont
 * @returns {undefined}
 */
function playerManageHelper(playButton, idVideoCont, playerType, start) {

    playButton.parent().append("<div id='" + idVideoCont + "' style='position: absolute; width:100%; height:100%; top:0px; padding-bottom:inherit'></div>");

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var id = playButton.attr("data-videoid");

    utils.player[playerType] = new YT.Player(idVideoCont, {
        videoId: id,
        playerVars: {
            'showinfo': 0,
            'modestbranding': 0,
            'rel': 0
        },
        events: {
            'onReady': function(event) {
                onPlayerReady(event, start);
            },
            'onStateChange': function(event) {
                onPlayerStateChange(event, playerType);
            }
        }
    });/**/

}