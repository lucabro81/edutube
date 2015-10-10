
$(window).on('load', function(event){
});

$(window).on('resize', function(){
});

$(document).ready(function(){
    // HANDLERS

    

    /**
     * 
     * @returns {undefined}
     */
    function dismissModal() {
        stopVideo('modal');
        $('div#video-cont').remove();
    }

    /**
     * 
     * @param {type} event
     * @returns {void}
     */
    function mousePosition(event) {
        utils.x = event.pageX;
        utils.y = event.pageY;
    }

    /**
     *  
     * @returns {void}
     */
    function playerManage() {
        playerManageHelper($(this), 'video-cont', 'modal', 0);
    }
    
    /**
     * 
     * @returns {void}
     */
    function playerManageFloating() {
        playerManageHelper($(this), 'video-cont-floating', 'floating', 0);
    }
    
    // LISTENERS
    
    $(document).on('hidden.bs.modal', '#myModal', dismissModal);
    $(document).on('click', '#play-video', playerManage);
    $(document).on('click', '#play-video-floating', playerManageFloating);
    $(document).on('mousemove mouseenter', mousePosition);
});