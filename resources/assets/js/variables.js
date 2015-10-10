var items = {
    videoPrev       : null,
    this_video_prev : null,
    framePrev       : null,
    modalInfo       : null,
    videoCont       : null
}

var utils = {
    'width_window'        : 0,
    'height_window'       : 0,
    'left_dist'           : 0,
    'right_dist'          : 0,
    'incomplete_cover_dx' : false,
    'biggerMediafiles'    : null,
    'x'                   : null,
    'y'                   : null,
    'player'              : {
        'modal'     : null,
        'floating'  : null
    }
}

var html = {
    'prev_cover' : "<div class='prev_cover'></div>",
    'ombra_dx'   : "<div class='ombra_dx'></div>",
    'ombra_sx'   : "<div class='ombra_sx'></div>"
}