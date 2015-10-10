@extends('frontend/layout')

@section("css_aggiuntivi")

@stop()

@section('content')

    <!--button id="signinButton">Sign in with Google</button>
    <button id = "playlistButton" style="display:none">Vediamo ste cazzo di playlist</button>
    <div id="result"></div-->
    
    @include('frontend/header')
    <div id="main-news" class="fluid-container" style="height:500px">
        <img src="{{ asset('img/ambiente.jpg')}}">
    </div>
    <div style="width: 100%; height: 40px;">

    </div>
    <div id="main-cont" style="width:100%; overflow: hidden;" ng-controller="ItemsCtrl">
        <div style="width:auto; margin: 0 -160px 0 -160px;">
            <div class="js-isotope" id="main" data-iso-repeat="collection">

            </div>
        </div>
        @include('frontend/video_info')
    </div>
    
    <div id="queue-box" class="fluid-container" style="position:fixed; bottom:0px; width:100%; z-index:1000; height:0px">
        <div id="handle-queue-box" class="trapezoid text-center">
            <span class="glyphicon glyphicon-menu-up" aria-hidden="true"></span>
        </div>
        <div class="row">
            <div class="col-xs-12">aasadasda</div>
        </div>
    </div>

@stop()

@section("js_aggiuntivi")
@stop()