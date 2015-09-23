<div class="modal modal-info-video" data-open = "false" ng-controller="modalInfoCtrl" ng-onshow>
    
    {??ItemsCtrl.items??}
    
    <div class = "modal-dialog modal-lg modal-dialog-info-video" id = "video-info-0">
        <div class = "modal-content-info-video">
            
            <div class="header bg-{??item.categories[0].slug??} text-right">
                <a href="#"><i class="glyphicon glyphicon-cog"></i></a>&nbsp;&nbsp;
                <a href="#"><i class="glyphicon glyphicon-play-circle"></i></a>&nbsp;&nbsp;
                <a href="#"><i class="glyphicon glyphicon-flag"></i></a>&nbsp;&nbsp;
                <a href="#" class="close-modal-info-video" ng-click="modalInfoHide('.modal-info-video')"><i class="glyphicon glyphicon-remove"></i></a>
            </div>
            
            <div class="body">
                <div class="img-video">
                    <img id="img-prev-video" src="#">
                    <div class="sfondo-grid">
                    </div>
                    <div class="video-info-modal bg-{??item.categories[0].slug??}">
                        <p class = "date">{??item.created_at | dateToISO | date:'dd/MM/yyyy'??}</p>
                        <p class = "title">{??item.title??}</p>
                        <p class = "author"><a href = "">Autore youtube</a></p>
                    </div>
                </div>
                <div class="description">
                    <div class="row">
                        <div class="col-xs-8 img-if-auth">
                            <img src="http://placehold.it/100x100"><a href="#">asdffasd</a> <span class="if">97%</span> <button class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>Segui</button></div>
                        <div class="col-xs-4 text-right visioni-punteggio">
                            Visto <span class="n-visioni">12345</span> volte</br>
                            <span class="glyphicon glyphicon-triangle-bottom"></span><span class="points">4321</span><span class="glyphicon glyphicon-triangle-top"></span></div>
                    </div>
                    <div class="row categorie">
                        <div class="col-xs-2 titolo-categorie"><span>Categorie</span></div>
                        <div class="col-xs-10 lista-categorie">
                            <button ng-repeat="cat in item.categories" class="bg-{??cat.slug??}">{??cat.name??}</button>
                        </div>
                    </div>
                    <div class="row testo-descrizione">
                        <div class="col-xs-2 titolo-descrizione">Descrizione</div>
                        <div class="col-xs-10 testo">{??item.description??}</div>
                    </div>
                    <div class="row tags">
                        <div class="col-xs-2 titolo-tags">Tags</div>
                        <div class="col-xs-10 lista-tags">
                            
                            <a href="#" ng-repeat="tag in item.tags">{??tag.slug??}</a>
                        </div>
                    </div>
                </div>
                <div class="comments">
                    commenti
                </div>
            </div>
            
            <!--div class = "footer">
                footer
            </div-->
            
        </div>
    </div>
</div>