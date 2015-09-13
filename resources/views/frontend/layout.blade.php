<!DOCTYPE html>
<html itemscope itemtype="http://schema.org/Article">

<head>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
    {!!Html::style('css/app.css')!!}
    
    <!--{!!GW::google_js()!!}
    script src="https://www.youtube.com/player_api"></script>
    
    <script>  
        /*$(document).on('click', '#playlistButton', function() {
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: 'http://localhost/edutube/public/get-playlists',
                success: function(result) {
                    console.log(result);
                    $('#result').html('');
                    $.each(result.items, function(index, obj) {
                        $('#result').append('<a class="playlist" data-id="' + obj.id + '" href="#">' + obj.snippet.title + '</a><br>');
                    });
                },
                error: function(xhr, status, error){
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                }

            });
        });*/
        
        /*$(document).on('click', '.playlist', function() {
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: 'http://localhost/edutube/public/get-playlist/' + $(this).data('id'),
                success: function(result) {
                    console.log(result);
                    $('#result').html('');
                    $.each(result.items, function(index, obj) {
                        $('#result').append('<a class="video" data-id="' + obj.snippet.resourceId.videoId + '" href="#">' + obj.snippet.title + '</a><br>');
                    });
                },
                error: function(xhr, status, error){
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                }

            });
        });*/
        
        /*$(document).on('click', '.video', function() {
            var id = $(this).data('id');
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: 'http://localhost/edutube/public/get-video/' + id,
                success: function(result) {
                    $('#result').html('<img src="' + result.default.url + '" />');
                    
                    
                    //var player;
                    //player = new YT.Player('result', {
                    //    height: '390',
                    //    width: '640',
                    //    videoId: id
                    //});
                    
                },
                error: function(xhr, status, error){
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                }

            });
        });*/
        
        /*function signInCallback(authResult) {
            if (authResult['code']) {
                
                $.ajax({
                    type: 'post',
                    url: 'http://localhost/edutube/public/storeauthcode',
                    success: function(result) {
                        $('#result').html('<pre>' + result + '</pre>');
                        $('#signinButton').attr('style', 'display: none');
                        $('#playlistButton').attr('style', 'display: block');
                    },
                    error: function(xhr, status, error){
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                    },
                    processData: true,
                    data: { code: authResult['code'], _token: "<?php echo csrf_token() ?>" }
        
                });
            } else {
                console.log('qualche cazzo di errore');
            }
        
        }*/
    
    </script-->
    
    @yield('css_aggiuntivi')
        
</head>

<body ng-app="edutube">
    @include('frontend/header')

    @yield('content')

    @include('frontend/footer')

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.js"></script>
    {!!Html::script('bootstrap/js/bootstrap.js')!!}
    {!!Html::script('angular/angular.js')!!}
    {!!Html::script('js/app.min.js')!!}
    
    @yield('js_aggiuntivi')
</body>

</html>