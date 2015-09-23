@extends('frontend/layout')

@section("css_aggiuntivi")

@stop()

@section('content')

    <!--button id="signinButton">Sign in with Google</button>
    <button id = "playlistButton" style="display:none">Vediamo ste cazzo di playlist</button>
    <div id="result"></div-->
    
   <?php
   
   /*$featured = $posts['featured'];
   $count_featured = count($featured);
  
   $cols = 6;
   $rows = 0;
   
   $index = 0;
   
   $rows = ceil($count_featured/$cols);*/
   
   ?>
    <div style="width:100%; overflow: hidden;" ng-controller="ItemsCtrl">
        <div style="width:auto; margin: 0 -160px 0 -160px;">
            <div class="js-isotope" id="main" data-iso-repeat="collection">
                @include('frontend/video_info')
            </div>
        </div>
        @include('frontend/video_info')
    </div>

@stop()

@section("js_aggiuntivi")
@stop()