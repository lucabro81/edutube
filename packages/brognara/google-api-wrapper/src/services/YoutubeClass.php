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
    
    public function __call($method, $args) {
        
        $results = $args[0];
        $field = $args[1];
        
        // $path = (count(explode("/", $field))>1) ? explode("/", $field) : $field;
                            
        // TODO:
        // forse una specie di xPath
        
        $path = explode("/", $field);
        
        $array_results = json_decode($results, TRUE);
                
        $array_result = array();
        if (count($path)>1) {
            $array_result = $this->get_items_by_path($path, $array_results);
        }
        else {
            $this->get_item_at_key($array_results, $path[0], $array_result);
        }
        
        //print_r($array_result);
        
        return $array_result;
    }
    
    /**
     * 
     * @param type $path
     * @param type $array_da_cercare
     * @param type $array_result
     * @param type $i
     * @return type
     */
    private function get_items_by_path($path, $array_da_cercare, &$array_result = array(), $i = 0) {
        
        if (isset($path[$i])) {
            foreach ($array_da_cercare as $key => $item) {
                if (($key === $path[$i])||($path[$i] === '*')) {

                    if ($i == (count($path)-1)) { 
                    //if (count($path) == 1) { 
                        $array_result[] = $item;
                    }

                    $this->get_items_by_path($path, $item, $array_result, $i+1);
                    //get_items_by_path(array_slice($path, 1), $item, $array_result, $i+1);
                }
            }
	}

	return $array_result;
    }
    
    private function get_item_at_key($heystack, $needle, &$array_tmp) {
        
        if (is_array($heystack)) {
            foreach($heystack as $key => $element) {
                
                if ($key === $needle) { 
                    return $array_tmp[] = $element; 
                }
                
                $result = $this->get_item_at_key($element, $needle, $array_tmp);
                
                if ($result != NULL) { 
                    $array_tmp[] = $result; 
                }
                
            }
        }

        return NULL;
    }
}
