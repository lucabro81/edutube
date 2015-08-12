<?php namespace Brognara\GoogleAPIWrapper\services;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of YoutubeClass
 *
 * @author root
 */
class YoutubeClass {
    
    public function __construct() {
        
    }
    
    public function get_thumbnails($results = NULL) {
        $array_results = json_decode($results, TRUE);
        
        //var_dump($this->get_item_at_key($array_results, 'thumbnails'));
        
        return $this->get_item_at_key($array_results, 'thumbnails');
    }
    
    private function get_item_at_key($heystack, $needle) {
        
        if (is_array($heystack)) {
            foreach($heystack as $key => $element) {
                if ($key === $needle)  {
                    return $element;
                }
                
                $result = $this->get_item_at_key($element, $needle);
                if ($result != NULL) {
                    return $result;
                }
            }
        }

        return NULL;
    }
}
