<div class="video-prev" id="video-prev-{{$featured[$index]->id}}">
    
    <!--div class="row video-img"-->
        <!--div class="inner-video-img"-->
            @foreach ($featured[$index]->mediafiles as $mediafile)
                @if ($mediafile['nome'] === 'thubnail_medium')
                    <img src="{{$mediafile['url']}}">
                @endif
            @endforeach
        <!--/div-->
    <!--/div-->
    
    <div class = "video-instruments bg-{{str_slug($featured[$index]->categories[0]->name)}}-dark">
        <a href="#"><i class="glyphicon glyphicon-cog"></i></a>&nbsp;&nbsp;
        <a href="#"><i class="glyphicon glyphicon-play-circle"></i></a>&nbsp;&nbsp;
        <a href="#"><i class="glyphicon glyphicon-flag"></i></a>
    </div>
    
    <div class="frame-prev bd-{{str_slug($featured[$index]->categories[0]->name)}}-dark" align="center">
        <div class="cover-prev-img bg-{{str_slug($featured[$index]->categories[0]->name)}}-50perc">
            <a href="#" 
               class="modal-info" 
               data-slug="{{$featured[$index]->slug}}" 
               data-video="{{$featured[$index]->id}}"><i class="glyphicon glyphicon-info-sign"></i></a>&nbsp;&nbsp;
            <a href="#" 
               class="modal-play" 
               data-slug="{{$featured[$index]->slug}}" 
               data-video="{{$featured[$index]->id}}"><i class="glyphicon glyphicon-play"></i></a>
        </div>
    </div>
    
    <div class = "video-info bg-{{str_slug($featured[$index]->categories[0]->name)}}">
        <p class = "date">{{ date("d/m/Y",strtotime($featured[$index]->created_at)) }}</p>
        <p class = "title"><a href = "#" title="{{$featured[$index]->title}}">{{$featured[$index]->title}}{{--str_limit($featured[$index]->title, 60, '...')--}}</a></p>
        <p class = "author"><a href = "#">Autore</a> - <a href = "">Loader</a></p>
    </div>

</div>