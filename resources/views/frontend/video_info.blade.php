
<div id="floating_player" class="video-prev" ng-controller="pushpinCtrl" ng-onshow ng-hoverfloating>
    
    <div class="header bg-{??item.categories[0].slug??} text-right clearfix">
        <div class="pull-right" style="position: relative;">
            <button class="btn simple-button" ng-click="pushpinHide('#floating_player')"><i class="glyphicon glyphicon-remove"></i></button>
        </div>
        
        <div class="pull-right" style="position: relative;">
            <button class="btn simple-button"><i class="glyphicon glyphicon-play-circle"></i></button>&nbsp;&nbsp;
        </div>
    </div>
    
    <div class="img-prev-container" style="position: relative;">
        <img ng-src="{??item.mediafiles | imgByName: 'thubnail_medium'??}"> 
        <button id ="play-video-floating" data-videoid = "{??item.YT_id??}" class="simple-button" >
            <span class="glyphicon glyphicon-play" aria-hidden="true"></span>
        </button>
    </div>
    
    <div class = "video-info bg-{??item.categories[0].slug??}">
        <p class = "date">{??item.created_at | dateToISO | date:'dd/MM/yyyy'??}</p>
        <p class = "title"><a href = "#" title="">{??item.title??}</a></p>
        <p class = "author"><a href = "#">Autore</a> - <a href = "">Loader</a></p>
    </div>
</div> 

<div id="myModal" class="modal modal-info-video" data-open = "false" ng-controller="modalInfoCtrl" ng-onshow>

    <div class = "modal-dialog modal-dialog-info-video" id = "video-info-0">
        <div class = "modal-content-info-video">
            
            <div class="header bg-{??item.categories[0].slug??} text-right clearfix" ng-mousedown='mouseDown("up")' ng-mouseup='mouseUp()'>
                <div class="pull-right" style="position: relative;">
                    <button class="btn simple-button" data-dismiss="modal"><i class="glyphicon glyphicon-remove"></i></button>
                </div>
                <div class="pull-left" style="position: relative;">
                    <button class="btn simple-button"
                            data-toggle="dropdown" 
                            role="button" 
                            aria-haspopup="true" 
                            aria-expanded="false"><i class="glyphicon glyphicon-menu-hamburger"></i></button>&nbsp;&nbsp;
                    <ul class="dropdown-menu bg-{??item.categories[0].slug??}">
                        <li><a href="#" ng-click="showBox('.description-box')"><i class="glyphicon glyphicon-align-justify"></i>&nbsp;&nbsp;&nbsp;Descrizione</a></li>
                        <li><a href="#" ng-click="showBox('.comments-box')"><i class="glyphicon glyphicon-comment"></i>&nbsp;&nbsp;&nbsp;Commenti</a></li>
                        <li><a href="#" ng-click="showBox('.relateds-box')"><i class="glyphicon glyphicon-film"></i>&nbsp;&nbsp;&nbsp;Correlati</a></li>
                    </ul>
                </div>
                
                <div class="pull-left" >
                    <button class="btn simple-button"><i class="glyphicon glyphicon-pushpin" ng-click="pushpin('#floating_player')"></i></button>
                </div>
                
                <div class="pull-right" style="position: relative;">
                    <button class="btn simple-button"
                            data-toggle="dropdown" 
                                    role="button" 
                                    aria-haspopup="true" 
                                    aria-expanded="false"><i class="glyphicon glyphicon-play-circle"></i></button>&nbsp;&nbsp;
                    <ul class="dropdown-menu bg-{??item.categories[0].slug??}">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="#">One more separated link</a></li>
                                </ul>
                </div>
                <div class="pull-right" style="position: relative;">
                    <button class="btn simple-button"
                            data-toggle="dropdown" 
                                    role="button" 
                                    aria-haspopup="true" 
                                    aria-expanded="false"><i class="glyphicon glyphicon-flag"></i></button>&nbsp;&nbsp;
                    <ul class="dropdown-menu bg-{??item.categories[0].slug??}">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="#">One more separated link</a></li>
                                </ul>
                </div>
                <div class="pull-right" style="position: relative;">
                    <button class="btn simple-button"
                            data-toggle="dropdown" 
                                    role="button" 
                                    aria-haspopup="true" 
                                    aria-expanded="false"><i class="glyphicon glyphicon-cog"></i></button>&nbsp;&nbsp;
                    <ul class="dropdown-menu bg-{??item.categories[0].slug??}">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="#">One more separated link</a></li>
                                </ul>
                </div>
            </div>
            
            <div class="row body">
                <div class="col-xs-12" style="position: relative;
                                              height: 100%;
                                              width: 100%;
                                              margin: 0px;
                                              padding: 0px;
                                              overflow: hidden;">
                    <div class="img-video">
                        <img id="img-prev-video" src="#">
                        <div class="sfondo-grid">
                            <button id ="play-video" data-videoid = "{??item.YT_id??}" class="simple-button" style="font-size: 150px; 
                                         color:#ffffff;
                                         display: block;
                                         margin: 0 auto;
                                         position: relative;
                                         top: 50%;
                                         margin-top: -75px" ><span class="glyphicon glyphicon-play" 
                                  aria-hidden="true" 
                                  ></span></button>
                        </div>
                    </div>
                    <div class="video-info-modal bg-{??item.categories[0].slug??}">
                        <p class = "date">Postato il {??item.created_at | dateToISO | date:'dd/MM/yyyy'??} in <button ng-repeat="cat in item.categories" class="bg-{??cat.slug??}-dark">{??cat.name??}</button></p>
                        <p class = "title">{??item.title??}</p>
                        <p class = "author"><a href = "">Autore youtube</a></p>
                    </div>
                </div>
            </div>
            
            <div class="row dati-video">
                <div class="col-xs-12">
                    <div class="description">
                        <div class="row">
                            <div class="col-xs-6 img-if-auth">
                                <img src="http://placehold.it/100x100"><a href="#">asdffasd</a> <span class="if">97%</span> <button class="btn btn-default btn-smd ropdown-toggle" ><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>Segui</button>
                            </div>
                            <div class="col-xs-6 text-right visioni-punteggio">
                                
                                Visto <span class="n-visioni">12345</span> volte</br>
                                <span class="glyphicon glyphicon-triangle-bottom"></span><span class="points">4321</span><span class="glyphicon glyphicon-triangle-top"></span>
                            </div>
                                
                        </div>
                        
                    </div>
                </div>
                    
                    
            </div>
           
            
        </div>
    </div>
    
    <div class="description-box draggable-box" ng-click="focus('.description-box', '.draggable-box')">
        <div class="header bg-{??item.categories[0].slug??} text-right clearfix">
            <div class="pull-right" style="position: relative;">
                <button class="btn simple-button" ng-click="hideBox('.description-box')"><i class="glyphicon glyphicon-remove"></i></button>
            </div>
            <div class="pull-left" style="position: relative;">
                Descrizione
            </div>
        </div>

        <div class="content">
            <h3>{??item.title??}</h3>
            <p>{??item.description??}</p>
        </div>

    </div>
    <div class="comments-box draggable-box" ng-click="focus('.comments-box', '.draggable-box')">
        <div class="header bg-{??item.categories[0].slug??} text-right clearfix">
            <div class="pull-right" style="position: relative;">
                <button class="btn simple-button" ng-click="hideBox('.comments-box')"><i class="glyphicon glyphicon-remove"></i></button>
            </div>
            <div class="pull-left" style="position: relative;">
                Commenti
            </div>
        </div>

        <div class="content">
            contenuti
        </div>

    </div>
    <div class="relateds-box draggable-box" ng-click="focus('.relateds-box', '.draggable-box')">
        <div class="header bg-{??item.categories[0].slug??} text-right clearfix">
            <div class="pull-right" style="position: relative;">
                <button class="btn simple-button" ng-click="hideBox('.relateds-box')"><i class="glyphicon glyphicon-remove"></i></button>
            </div>
            <div class="pull-left" style="position: relative;">
                Correlati
            </div>
        </div>

        <div class="content">
            contenuti
        </div>

    </div>
</div>