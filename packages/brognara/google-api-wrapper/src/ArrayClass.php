<?php namespace Brognara\GoogleAPIWrapper;

class ArrayClass implements \ArrayAccess {
    
    private $result = array();
    private $items;
    
    public function __construct($items) {
        $this->items = $items;
        
        //var_dump($items);
        
        if (!is_array($this->items)) {
            if ($this->has_json_data($this->items)) {
                $this->result = json_decode($this->items, true);
            }
            else {
                throw new \Exception('No JSON or Array data to parse');
            }
        }
        else {
            $this->result = $this->items;
        }
        
        //var_dump($this->result);
        //echo "ArrayClass<br/>";
    }
    
    public function toJson() {
        return json_encode($this->result);
    }
    
    /*
     * ##############################
     * # ArrayAccess implementation #
     * ##############################
     */
    
    /*
     * 
     */
    public function offsetExists ($offset) {
        return isset($this->result[$offset]);
    }
    
    /*
     * 
     */
    public function offsetGet ($offset) {
        return isset($this->result[$offset]) ? $this->result[$offset] : NULL;
    }
    
    /*
     * 
     */
    public function offsetSet ($offset, $value) {
        if (is_null($offset)) {
            $this->result[] = $value;
        } 
        else {
            $this->result[$offset] = $value;
        }
    }
    
    /*
     * 
     */
    public function offsetUnset ($offset) {
        unset($this->result[$offset]);
    }
    
    /*
    public function toObject($obj = null, $items = null) {
        if (is_array($items)) {
            foreach($items as $key => $value) {
                $obj->{$key} = $this->toObject($obj, $value);
            }
            return $obj;
        }
        return $items;
    }
    */
    
    /*
     * ###################
     * # PRIVATE METHODS #
     * ###################
     */
    
    private function has_json_data($string) {
        $array = json_decode($string, true);
        return !empty($string) && is_string($string) && is_array($array) && !empty($array) && json_last_error() == 0;
    }
}