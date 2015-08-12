<?php

namespace App\Http\Controllers\core;

use App\Post;

/*
 * CRUD per posts
 */
class PostContainer extends RecordContainer {

    public function __construct(){
        parent::__construct();
    }
    
    //////////
    // CRUD //
    //////////

    public function create($input) {

    }

    public function read($args = array('featured' => 3,
                                   'not_featured' => 15,
                                           'main' => true)) {
        
        // selezione di un unico post
        if (isset($args['id'])) {
            return Post::where('id',$args['id'])->with('author')->first();
        }
        
        //selezione di tutti i posts
        
        $posts = array();
        
        if ($args['featured'] > 0) {
            $posts['featured'] = $this->featured($args['featured']);
        }
        if ($args['not_featured'] > 0) {
            $posts['not_featured'] = $this->not_featured($args['not_featured']);
        }
        if ($args['main']) {
            $posts['main'] = $this->main_post();
        }
        
        return $posts;
    }

    public function update($input) {

    }
    
    public function delete($args) {

    }
    
    /////////////
    // UTILITY //
    /////////////
    
    public function restore_dati() {
        $this->create();
    }

    /////////////
    // PRIVATE //
    /////////////
    
    private function featured($limit=3) {
        return Post::where('featured',true)
            ->with('author')
            ->take($limit)
        ->get();
    }
    
    private function not_featured($limit=15) {
        return Post::where('featured',false)
            ->where('visible',true)
            ->where('page',false)
            ->with('author')
	->paginate($limit);
    }
    
    private function main_post() {
        return Post::where('main',true)
            ->with('author')
	->first();
    }
    

}