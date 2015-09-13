<?php namespace Brognara\GoogleAPIWrapper;

class ArrayClass implements \ArrayAccess, \Iterator {
    
    private $result = array();
    private $position = 0;
    private $result_key = 0;
    
    /**
     * Constructor
     * 
     * @param type $items
     * @throws \Exception
     */
    public function __construct($items) {
        
        if (!is_array($items)) {
            if ($this->has_json_data($items)) {
                $this->result = json_decode($items, true);
            }
            else if (is_string($items)) {
                $this->result = $items;
            }
            else {
                throw new \Exception('No JSON or Array data to parse');
            }
        }
        else {
            $this->result = $items;
        }
        
    }
    
    /*
     * ##################
     * # PUBLIC METHODS #
     * ##################
     */
    
    /**
     * 
     * @return JSON
     */
    public function toJson() {
        return json_encode($this->result);
    }
    
    /**
     * Scorre un array secondo un path fornito nel formato 
     * "path/to/search"
     * Se un livello ha più sotto-elementi, o si sceglie quale elemento includere nel path, per esempio:
     * "path/to/1/search"
     * O si selezionano tutti:
     * "path/to/[*]/search" (senza le parentesi quadre, se no mi si sminchiano i commenti)
     * 
     * TODO: 
     * miglirare con array_slice e array_shift
     * 
     * @param string     $path              Da fornire nel formato "path/to/search"
     * @param array      $array_da_cercare  per uso interno, NON UTIlIZZARE
     * @param array      $array_result      per uso interno, NON UTIlIZZARE
     * @param integer    $i                 per uso interno, NON UTIlIZZARE
     * @return mixed può tornare una stringa o un array a seconda di cosa di cerca o NULL se non c'è una fava
     */
    public function get_items_by_path($path, $array_da_cercare = array(), &$array_result = array(), $i = 0) {
        
        if ($i==0) {
            $array_da_cercare = $this->result;
            $path = explode("/", $path);
        }
        
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
    
    /**
     * Scorre ricorsivamente un array per recuperare il valore ad una data chiave
     * 
     * TODO: 
     * vedere di togliere la necessità di specificare anche $array_tmp
     * 
     * @param array  $heystack
     * @param string $needle
     * @param array  $array_tmp
     * @return mixed può tornare una stringa o un array a seconda di cosa di cerca o NULL se non c'è una fava
     */
    public function get_item_at_key($heystack, $needle, &$array_tmp) {
        
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
    
    /*
     * ##############################
     * # ArrayAccess implementation #
     * ##############################
     */
    
    public function offsetExists ($offset) { return isset($this->result[$offset]); }
    public function offsetGet ($offset) { return isset($this->result[$offset]) ? $this->result[$offset] : NULL; }
    public function offsetSet ($offset, $value) {
        if (is_null($offset)) {
            $this->result[] = $value;
        } 
        else {
            $this->result[$offset] = $value;
        }
    }
    public function offsetUnset ($offset) { unset($this->result[$offset]); }
    
    /*
     * ###########################
     * # Iterator implementation #
     * ###########################
     */

    function rewind() { 
        $this->position = 0; 
        $this->result_key = $this->get_array_key(0);
    }
    
    function current() { 
        return $this->result[$this->result_key];
    }
    
    function key() { 
        return $this->get_array_key($this->position);
    }
    
    function next() { 
        $this->result_key = $this->get_array_key(++$this->position);
    }
    
    function valid() { 
        return isset($this->result[$this->get_array_key($this->position)]);         
    }
    
    /*
     * ###################
     * # PRIVATE METHODS #
     * ###################
     */
    
    /**
     * 
     * @param type $string
     * @return type
     */
    private function has_json_data($string) {
        $array = json_decode($string, true);
        return !empty($string) && is_string($string) && is_array($array) && !empty($array) && json_last_error() == 0;
    }
    
    /**
     * 
     * @param type $position
     * @return type
     */
    private function get_array_key($position) {
        $keys = array_keys($this->result);
        if (isset($keys[$position])) {
            return array_keys($this->result)[$position];
        }
        return NULL;
    }
}