<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\common\ParentController;
use App\Http\Controllers\core\PostContainer;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;

use \GW;
use \DB;
use \Sentinel;
use App\Statustype;
use App\Statusname;
use App\Mediatype;
use App\Categoryname;

use App\Http\Requests;

class HomeController extends ParentController {
    
    public function __construct() {
        parent::__construct();
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
    
    /***********************************************************
     ***************** SOLO PER TEST # START # *****************
     ***********************************************************/
    
    public function popola_db() {
        return redirect('https://accounts.google.com/o/oauth2/auth?client_id=842729598744-52ssftbrnhioj2iso2v2qmr9qsl7qk2v.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%2Fedutube%2Fpublic%2Fpopola_db_callback&scope=https://www.googleapis.com/auth/youtube&response_type=code&access_type=offline');
    }
    
    public function popola_db_callback(Request $request) {
        
        $decode_results = GW::get_access_token($request->get('code'));
        $request->session()->put('access_token', $decode_results['access_token']);
        
        $args = array('mine'         => 'true',
                      'part'         => 'snippet',
                      'maxResults'   => 50,
                      'access_token' => $request->session()->get('access_token'));
        
        $playlists_id = GW::youtube('playlists')
            ->with($args)
            ->get("id");
        
        foreach($playlists_id as $id) {
            $args = array('mine'         => 'true',
                          'part'         => 'snippet',
                          'playlistId'   => $id,
                          'maxResults'   => 50,
                          'access_token' => $request->session()->get('access_token'));
        
            $results = GW::youtube('playlistItems')
                ->with($args)
                ->get("id");
            
            echo "<pre>";
            print_r($results);
            echo "</pre>";
            
            /*foreach ($results as $result) {
                echo "<pre>";
                print_r($result);
                echo "</pre>";
            }*/
        }
        
    }
    
    public function crea_utenti() {
        
        // cancello tabelle
            DB::table('post_statusname')->delete();
            DB::table('statusname_user')->delete();
            DB::table('mediafile_post')->delete();
            DB::table('categoryname_post')->delete();
            DB::table('post_tag')->delete();
            DB::table('relateds')->delete();

            DB::table('posts')->delete();

            DB::table('categorynames')->update(array('parent_id'=>NULL));
            DB::table('categorynames')->delete();
            DB::table('statusnames')->delete();
            DB::table('statustypes')->delete();
            DB::table('tags')->delete();
            DB::table('mediafiles')->delete();
            DB::table('mediatypes')->delete();

            DB::table('users_data')->delete();
            DB::table('users')->delete();
            DB::table('persistences')->delete();
            DB::table('activations')->delete();
            DB::table('reminders')->delete();
            DB::table('role_users')->delete();
            DB::table('roles')->delete();
            DB::table('throttle')->delete();
         
        // STATUS TYPES
            
            $status_type = new Statustype;
            $status_type->type = Config::get('constants.STATUS_TYPE_POST');
            $status_type->slug = Str::slug(Config::get('constants.STATUS_TYPE_POST'));
            $status_type->save();

            $status_type1 = new Statustype;
            $status_type1->type = Config::get('constants.STATUS_TYPE_USER');
            $status_type1->slug = Str::slug(Config::get('constants.STATUS_TYPE_USER'));
            $status_type1->save();

	// STATUS NAMES

            $status_name = new Statusname;
            $status_name->name = Config::get('constants.STATUS_POST_INATTESAMODERAZIONE');
            $status_name->slug = Str::slug(Config::get('constants.STATUS_POST_INATTESAMODERAZIONE'));
            $status_name->statustype_id = Statustype::where('type',Config::get('constants.STATUS_TYPE_POST'))->first()->id;
            $status_name->save();

            $status_name1 = new Statusname;
            $status_name1->name = Config::get('constants.STATUS_POST_INATTESAPUBBLICAZIONE');
            $status_name1->slug = Str::slug(Config::get('constants.STATUS_POST_INATTESAPUBBLICAZIONE'));
            $status_name1->statustype_id = Statustype::where('type',Config::get('constants.STATUS_TYPE_POST'))->first()->id;
            $status_name1->save();

            $status_name2 = new Statusname;
            $status_name2->name = Config::get('constants.STATUS_POST_PUBBLICATO');
            $status_name2->slug = Str::slug(Config::get('constants.STATUS_POST_PUBBLICATO'));
            $status_name2->statustype_id = Statustype::where('type',Config::get('constants.STATUS_TYPE_POST'))->first()->id;
            $status_name2->save();

            $status_name3 = new Statusname;
            $status_name3->name = Config::get('constants.STATUS_USER_INATTESAATTIVAZIONE');
            $status_name3->slug = Str::slug(Config::get('constants.STATUS_USER_INATTESAATTIVAZIONE'));
            $status_name3->statustype_id = Statustype::where('type',Config::get('constants.STATUS_TYPE_USER'))->first()->id;
            $status_name3->save();

            $status_name4 = new Statusname;
            $status_name4->name = Config::get('constants.STATUS_USER_ATTIVATO');
            $status_name4->slug = Str::slug(Config::get('constants.STATUS_USER_ATTIVATO'));
            $status_name4->statustype_id = Statustype::where('type',Config::get('constants.STATUS_TYPE_USER'))->first()->id;
            $status_name4->save();

            $status_name5 = new Statusname;
            $status_name5->name = Config::get('constants.STATUS_USER_BANNATO');
            $status_name5->slug = Str::slug(Config::get('constants.STATUS_USER_BANNATO'));
            $status_name5->statustype_id = Statustype::where('type',Config::get('constants.STATUS_TYPE_USER'))->first()->id;
            $status_name5->save();
                
        // MEDIA TYPES
        
            $media_type = new Mediatype;
            $media_type->name = Config::get('constants.MEDIA_TYPE_IMGJPG');
            $media_type->slug = Str::slug(Config::get('constants.MEDIA_TYPE_IMGJPG'));
            $media_type->ext = Config::get('constants.MEDIA_TYPE_IMGJPG_EXT');
            $media_type->save();

            $media_type1 = new Mediatype;
            $media_type1->name = Config::get('constants.MEDIA_TYPE_IMGGIF');
            $media_type1->slug = Str::slug(Config::get('constants.MEDIA_TYPE_IMGGIF'));
            $media_type1->ext = Config::get('constants.MEDIA_TYPE_IMGGIF_EXT');
            $media_type1->save();

            $media_type2 = new Mediatype;
            $media_type2->name = Config::get('constants.MEDIA_TYPE_IMGPNG');
            $media_type2->slug = Str::slug(Config::get('constants.MEDIA_TYPE_IMGPNG'));
            $media_type2->ext = Config::get('constants.MEDIA_TYPE_IMGPNG_EXT');
            $media_type2->save();

            $media_type3 = new Mediatype;
            $media_type3->name = Config::get('constants.MEDIA_TYPE_IMGBMP');
            $media_type3->slug = Str::slug(Config::get('constants.MEDIA_TYPE_IMGBMP'));
            $media_type3->ext = Config::get('constants.MEDIA_TYPE_IMGBMP_EXT');
            $media_type3->save();

            $media_type4 = new Mediatype;
            $media_type4->name = Config::get('constants.MEDIA_TYPE_IMGTIFF');
            $media_type4->slug = Str::slug(Config::get('constants.MEDIA_TYPE_IMGTIFF'));
            $media_type4->ext = Config::get('constants.MEDIA_TYPE_IMGTIFF_EXT');
            $media_type4->save();

            $media_type5 = new Mediatype;
            $media_type5->name = Config::get('constants.MEDIA_TYPE_PDF');
            $media_type5->slug = Str::slug(Config::get('constants.MEDIA_TYPE_PDF'));
            $media_type5->ext = Config::get('constants.MEDIA_TYPE_PDF_EXT');
            $media_type5->save();

            $media_type6 = new Mediatype;
            $media_type6->name = Config::get('constants.MEDIA_TYPE_MPG');
            $media_type6->slug = Str::slug(Config::get('constants.MEDIA_TYPE_MPG'));
            $media_type6->ext = Config::get('constants.MEDIA_TYPE_MPG_EXT');
            $media_type6->save();

            $media_type7 = new Mediatype;
            $media_type7->name = Config::get('constants.MEDIA_TYPE_MP3');
            $media_type7->slug = Str::slug(Config::get('constants.MEDIA_TYPE_MP3'));
            $media_type7->ext = Config::get('constants.MEDIA_TYPE_MP3_EXT');
            $media_type7->save();
        
        // CATEGORIES
        
            $categories = new Categoryname;
            $categories->name = 'Storia';
            $categories->slug = Str::slug('Storia');
            $categories->parent_id = null;
            $categories->save();

            $categories1 = new Categoryname;
            $categories1->name = 'Scienza';
            $categories1->slug = Str::slug('Scienza');
            $categories1->parent_id = null;
            $categories1->save();

            $categories2 = new Categoryname;
            $categories2->name = 'Tecnologia';
            $categories2->slug = Str::slug('Tecnologia');
            $categories2->parent_id = null;
            $categories2->save();

            $categories3 = new Categoryname;
            $categories3->name = 'Storia della scienza';
            $categories3->slug = Str::slug('Storia della scienza');
            $categories3->parent_id = Categoryname::where('name','Storia')->first()->id;
            $categories3->save();

            $categories4 = new Categoryname;
            $categories4->name = 'Fisica';
            $categories4->slug = Str::slug('Fisica');
            $categories4->parent_id = Categoryname::where('name','Scienza')->first()->id;
            $categories4->save();

            $categories5 = new Categoryname;
            $categories5->name = 'Chimica';
            $categories5->slug = Str::slug('Chimica');
            $categories5->parent_id = Categoryname::where('name','Scienza')->first()->id;
            $categories5->save();
        
        // creo utente
            
            $credentials = [
                'email'    => 'lucabro_2000@yahoo.it',
                'password' => 'password',
            ];

            $user = Sentinel::registerAndActivate($credentials);

            echo "<pre>";
            print_r($user);
            echo "</pre>";
    }
    
    /*********************************************************
     ***************** SOLO PER TEST # END # *****************
     *********************************************************/
}