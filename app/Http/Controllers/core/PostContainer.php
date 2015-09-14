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

    /**
     * 
     * @param type $input
     */
    public function create($input) {

    }

    /**
     * 
     * @param type $args
     * @return type
     */
    public function read($args = array('featured' => 3,
                                   'not_featured' => 15,
                                           'main' => true)) {
                
        // selezione di un unico post
        if (isset($args['id'])) {
            return Post::where('id',$args['id'])->with('author')->first();
        }
        
        //selezione di tutti i posts
        
        $posts = array();
        
        if (isset($args['featured'])) {
            $posts['featured'] = $this->featured($args['featured']);
        }
        
        if (isset($args['not_featured'])) {
            $posts['not_featured'] = $this->not_featured($args['not_featured']);
        }
        
        if (isset($args['main']) && ($args['main'])) {
            $posts['main'] = $this->main_post();
        }
        
        return $posts;
    }

    /**
     * 
     * @param type $input
     */
    public function update($input) {

    }
    
    /**
     * 
     * @param type $args
     */
    public function delete($args) {

    }
    
    /////////////
    // UTILITY //
    /////////////
    
    /**
     * 
     */
    public function restore_dati() {
        $this->create();
    }

    /////////////
    // PRIVATE //
    /////////////
    
    /**
     * 
     * @param type $limit
     * @return type
     */
    private function featured($limit = 3) {
        
        $posts = Post::where('featured',true)
            ->where('page',false)
            ->with('author')
            ->with('mediafiles')
            ->with('categories');
        
        if ($limit>-1) {
            $posts->take($limit);
        }
        
        return $posts->get();
    }
    
    /**
     * 
     * @param type $limit
     * @return type
     */
    private function not_featured($paginate = 15) {
        
        $posts = Post::where('featured',false)
            ->where('visible',true)
            ->where('page',false)
            ->with('author')
            ->with('mediafiles')
            ->with('categoryname');
        
        if ($paginate>-1) {
            return $posts->paginate($paginate);
        }
        
        return $posts->get();
    }
    
    /**
     * 
     * @return type
     */
    private function main_post() {
        return Post::where('main',true)
            ->with('author')
	->first();
    }
    

}