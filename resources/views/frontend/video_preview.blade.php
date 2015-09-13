<div class="col-sm-2 video-prev" id="video-prev-{{$featured[$index]->id}}">
    
    <div class = "video-instruments">
        <div class = "row inner-video-instruments">
            <div class = "buttons col-xs-8">
                fav - share - enqueue
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
        Data - {{$featured[$index]->title}}<br>
        Autore - Loader<br>
    </div>

</div>