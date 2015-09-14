<div class="col-sm-2 video-prev" id="video-prev-{{$featured[$index]->id}}" style="overflow:visible">
    
    <div class = "video-instruments" style="z-index: 1000000">
        <div class = "row inner-video-instruments">
            <div class = "buttons col-xs-6">
                <a href="#" 
                   accesskey=""
                   class="dropdown-toggle video-options" 
                   data-toggle="dropdown" 
                   role="button" 
                   aria-haspopup="true" 
                   aria-expanded="false"><i class="glyphicon glyphicon-option-vertical"></i></a>
                   
                <ul class="dropdown-menu dropdown-video-options {{str_slug($featured[$index]->categories[0]->name)}}">
                    <li><a href="#">Info</a></li>
                    <li><a href="#">Accoda</a></li>
                    <li><a href="#">Favoriti</a></li>
                    <li><a href="#">Aggiungi a... </a></li>
                    <li><a href="#">Segnala</a></li>
                    <li><a href="#">Correlati</a></li>
                    <li><a href="#">Condividi</a></li>
                </ul>
            </div>
            <div class = "categories col-xs-6">
                <a href="#" 
                   accesskey=""
                   class="dropdown-toggle first-category btn btn-primary btn-xs {{str_slug($featured[$index]->categories[0]->name)}}" 
                   data-toggle="dropdown" 
                   role="button" 
                   aria-haspopup="true" 
                   aria-expanded="false">@if (count($featured[$index]->categories)>1)<i class="glyphicon glyphicon-triangle-bottom"></i>@endif {{$featured[$index]->categories[0]->name}}</a>
                
                @if (count($featured[$index]->categories)>1)
                    <ul class="dropdown-menu dropdown-category">
                        @for($i=1; $i<count($featured[$index]->categories); $i++)
                            <li>
                                <a href="#" 
                                   class="dropdown-toggle categories btn btn-primary btn-xs {{str_slug($featured[$index]->categories[$i]->name)}}">
                                    {{$featured[$index]->categories[$i]->name}}</a>
                            </li>
                        @endfor
                    </ul>
                @endif
                
            </div>
        </div>
    </div>
    
    <div class="row">
        <div class="col-xs-12" style="overflow:hidden">
            @foreach ($featured[$index]->mediafiles as $mediafile)
                @if ($mediafile['nome'] === 'thubnail_medium')
                    <img class="hidden-xs" src="{{$mediafile['url']}}">
                @endif
            @endforeach
        </div>
    </div>

    <div class = "video-info">
        <p class = "date">{{ date("d/m/Y",strtotime($featured[$index]->created_at)) }}</p>
        <p class = "title"><a href = "#" title="{{$featured[$index]->title}}">{{str_limit($featured[$index]->title, 60, '...')}}</a></p>
        <p class = "author"><a href = "#">Autore</a> - <a href = "">Loader</a></p>
    </div>

</div>