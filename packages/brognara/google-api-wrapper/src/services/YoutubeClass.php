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
    
    public function __call($method, $args) { //$results = NULL, $field = '') {
        
        // TODO:
        // controllo nome metodo
        
        $results = $args[0];
        $field = $args[1];
        
        $array_results = json_decode($results, TRUE);
        
        $array_result = array();
        $this->get_item_at_key($array_results, $field, $array_result);
        
        return $array_result;
    }
    
    private function get_item_at_key($heystack, $needle, &$array_tmp) {
        
        if (is_array($heystack)) {
            foreach($heystack as $key => $element) {
                if ($key === $needle) { return $element; }
                $result = $this->get_item_at_key($element, $needle, $array_tmp);
                if ($result != NULL) { $array_tmp[] = $result; }
            }
        }

        return NULL;
    }
}
