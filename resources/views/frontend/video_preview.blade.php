<div class="col-sm-2 video-prev" id="video-prev-{{$featured[$index]->id}}">
    
    <div class = "video-instruments">
        <div class = "row inner-video-instruments">
            <div class = "buttons col-xs-8">
                <i class="fa fa-ellipsis-v"></i>
            </div>
            <div class = "categories col-xs-4">
                Categoria/e
            </div>
        </div>
    </div>
                        
    @foreach ($featured[$index]->mediafiles as $mediafile)
        @if ($mediafile['nome'] === 'thubnail_medium')
            <img class="hidden-xs" src="{{$mediafile['url']}}">
        @endif
    @endforeach

    <div class = "video-info">
        <p class = "date">{{ date("d/m/Y",strtotime($featured[$index]->created_at)) }}</p>
        <p class = "title"><a href = "#" title="{{$featured[$index]->title}}">{{str_limit($featured[$index]->title, 60, '...')}}</a></p>
        <p class = "author"><a href = "#">Autore</a> - <a href = "">Loader</a></p>
    </div>

</div>