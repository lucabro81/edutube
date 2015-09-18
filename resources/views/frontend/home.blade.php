@extends('frontend/layout')

@section("css_aggiuntivi")

@stop()

@section('content')

    <!--button id="signinButton">Sign in with Google</button>
    <button id = "playlistButton" style="display:none">Vediamo ste cazzo di playlist</button>
    <div id="result"></div-->
    
   <?php
   
   $featured = $posts['featured'];
   $count_featured = count($featured);
  
   
   $cols = 6;
   $rows = 0;
   
   $index = 0;
   
   $rows = ceil($count_featured/$cols);
   
   ?>
    <div class="js-isotope" 
         id="main" 
         data-isotope-options='{ "itemSelector": ".grid-item",  
                "percentPosition": true,
                "fitRows": {
                    gutter: ".gutter-sizer",
                }
            }'>
        @for($j = 1; $j<=$rows; $j++)
            <div class="video-prev-row" id="video-prev-row-{{$j}}">
                @for($i = 1; $i <= $cols; $i++)
                    @include('frontend/video_preview', ['post' => $featured[$index], 'index' => $index])
                    <?php $index += 1; ?>
                @endfor
            </div>
        @endfor
    </div>

@stop()

@section("js_aggiuntivi")
    <script>
        $('#main').isotope({
            // options...
            /*itemSelector: '.video-prev-row',
            masonry: {
                columnWidth: 200
            }*/
        });
    </script>
@stop()