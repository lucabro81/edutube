<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="https://apis.google.com/js/client:platform.js?onload=start" async defer></script>

<script>
    function start() {
        gapi.load('auth2', function() {
            auth2 = gapi.auth2.init({
                client_id: '{{$client_id}}',
                scope: '{{$scope}}'
            });
        });
    }

    $(document).ready(function(){
        $('{{$button_id}}').click(function() {
            auth2.grantOfflineAccess({'redirect_uri': 'postmessage'}).then({{$callback}});
        });
    });
</script>