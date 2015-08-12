<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\common\ParentController;
use App\Http\Controllers\core\PostContainer;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

use \GW as GW;

use App\Http\Requests;

class HomeController extends ParentController {
    
    public function __construct() {
        
    }
    
    public function index() {
        
        $post_obj = new PostContainer();
        
        try {
            $posts = $post_obj->read();
        } 
        catch (Exception $ex) {
            
        }
        
        return view('frontend/home')->with('posts', $posts);
    }
    
    public function storeauthcode(Request $request) {
        
        $decode_results = GW::get_access_token(Input::get('code'));
        $request->session()->put('access_token', $decode_results['access_token']);
        
        return($decode_results['access_token']);
    }
    
    public function get_playlists(Request $request) {
        
        $args = array('mine'         => 'true',
                      'part'         => 'snippet',
                      'access_token' => $request->session()->get('access_token'));
        
        $results = GW::youtube('playlists')
                    ->with($args)
                    ->get();
        
        return $results->toJson();
    }
    
    public function get_playlist(Request $request, $playlist_id) {
        
        $args = array('mine'         => 'true',
                      'part'         => 'snippet',
                      'playlistId'   => $playlist_id,
                      'access_token' => $request->session()->get('access_token'));
        
        $results = GW::youtube('playlistItems')
                    ->with($args)
                    ->get();
        
        return $results->toJson();
    }
    
    public function get_video(Request $request, $video_id) {
        
        $args = array('mine'         => 'true',
                      'part'         => 'snippet',
                      'id'           => $video_id,
                      'access_token' => $request->session()->get('access_token'));
        
        $results = GW::youtube('videos')
                    ->with($args)
                    ->get('thumbnails');
        
        return $results->toJson();
    }
    
}