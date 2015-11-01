@extends('frontend/layout')

@section("css_aggiuntivi")

@stop()

@section('content')

    <!--button id="signinButton">Sign in with Google</button>
    <button id = "playlistButton" style="display:none">Vediamo ste cazzo di playlist</button>
    <div id="result"></div-->
    
    @include('frontend/header')
    <div id="main-news" class="fluid-container" style="height:500px">
        <img ng-src="{{ asset('img/ambiente.jpg')}}" jn-fit-img>
    </div>
    
    <div style="width: 100%; height: 40px;"></div>
    
    <div id="main-cont" style="width:100%; overflow: hidden;" ng-controller="ItemsCtrl">
        
        <div style="width:auto; margin: 0 -160px 0 -160px;">
            <div class="js-isotope" id="main" data-iso-repeat="collection">

            </div>
        </div>
        
        @include('frontend/video_info')
        
    </div>
    
    <div id="queue-box" 
         class="fluid-container" 
         style="position:fixed; bottom:0px; width:100%; z-index:1000; height:auto"
         ng-controller="QeueboxCtrl">
        <div id="handle-queue-box" class="trapezoid text-center" ng-click="openCloseQueueBox()">
            <span class="glyphicon glyphicon-menu-up" aria-hidden="true"></span>
        </div>
        
        <div class="row" ng-controller="QeueCtrl" style="margin:0px">
            <div class="col-xs-12" id ="queue-box-cont" jn-queue-slide style="padding:0px">
                
                <!--div ng-repeat = "video in queue track by $index" data-videoid="{??video.YT_id??}">
                    {??video.YT_id??}
                </div-->
                
                <div class      = "video-prev" 
                     id         = "video-prev-{?? video.id ??}" 
                     ng-repeat  = "video in queue track by $index" 
                     style      = "float:left; position: relative;"
                     jn-hover
                     jn-queue-slide-element>
    
                    <img ng-src="{?? video.mediafiles | imgByName: 'thubnail_medium' ??}"> 

                    <div class = "video-instruments bg-{?? item.categories[0].slug ??}-dark">
                        <div class="pull-left dropup">
                            <button class="btn simple-button dropdown-toggle" 
                                    data-toggle="dropdown" 
                                    role="button" 
                                    aria-haspopup="true" 
                                    aria-expanded="false">
                                <i class="glyphicon glyphicon-cog"></i></button>
                            <ul class="dropdown-menu bg-{?? video.categories[0].slug ??}-dark">
                                <li><a href="#"><i class="glyphicon glyphicon-share-alt"></i>&nbsp;&nbsp;&nbsp;Condividi</a></li>
                                <li><a href="#"><i class="glyphicon glyphicon-plus"></i>&nbsp;&nbsp;&nbsp;Aggingi a Playlist</a></li>
                            </ul>&nbsp;&nbsp;
                        </div>
                        <button class="btn simple-button"><i class="glyphicon glyphicon-flag"></i></button>&nbsp;&nbsp;
                    </div>

                    <div class="frame-prev bd-{?? video.categories[0].slug ??}-dark" align="center">
                        <div class="cover-prev-img bg-{?? video.categories[0].slug ??}-50perc">
                            <button class       = "btn modal-play" 
                                    data-slug   = "" 
                                    data-video  = "" 
                                    data-toggle = "modal" 
                                    data-target = "#myModal"
                                    ng-click    = "modalInfoShow(video, '.modal-info-video')">
                                <span class="glyphicon glyphicon-play"></span>
                            </button>
                        </div>
                    </div>

                    <div class = "video-info bg-{?? video.categories[0].slug ??}">
                        <p class = "date">{?? video.created_at | dateToISO | date:'dd/MM/yyyy' ??}</p>
                        <p class = "title"><a href = "#" title="">{?? video.title ??}</a></p>
                        <p class = "author"><a href = "#">Autore</a> - <a href = "">Loader</a></p>
                    </div>

                </div>
                
                <!--div id="floating_player" class="video-prev" ng-controller="pushpinCtrl" jn-on-show-floating jn-hover-floating  ng-repeat="video in queue track by $index">
    
                    <div class="header bg-{??video.categories[0].slug??} text-right clearfix">
                        <div class="pull-right" style="position: relative;">
                            <button class="btn simple-button" ng-click="pushpinHide()"><i class="glyphicon glyphicon-remove"></i></button>
                        </div>

                        <div class="pull-right" style="position: relative;">
                            <button class="btn simple-button" ng-click="addVideoToQueue()"><i class="glyphicon glyphicon-play-circle"></i></button>&nbsp;&nbsp;
                        </div>

                        <div class="pull-left" >
                            <button class="btn simple-button" 
                                    data-toggle="modal" 
                                    data-target="#myModal"
                                    ng-click="showModal()"><i class="glyphicon glyphicon-resize-full"></i></button>
                        </div>
                    </div>

                    <div class="img-prev-container" style="position: relative;">
                        <img ng-src="{??item.mediafiles | imgByName: 'thubnail_medium'??}"> 
                        <button id ="play-video-floating" class="simple-button" ng-click="playVideo()">
                            <span class="glyphicon glyphicon-play" aria-hidden="true"></span>
                        </button>
                        <youtube videoid="{??item.YT_id??}" status = "{??yt.playerStatus??}"></youtube>
                    </div>

                    <div class = "video-info bg-{??item.categories[0].slug??}">
                        <p class = "date">{??video.created_at | dateToISO | date:'dd/MM/yyyy'??}</p>
                        <p class = "title"><a href = "#" title="">{??video.title??}</a></p>
                        <p class = "author"><a href = "#">Autore</a> - <a href = "">Loader</a></p>
                    </div>
                </div-->
                
            </div>
        </div>
    </div>

@stop()

@section("js_aggiuntivi")
@stop()