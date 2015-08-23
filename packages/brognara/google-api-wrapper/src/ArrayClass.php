<?php namespace Brognara\GoogleAPIWrapper;

/*
 * TODO: usare http://php.net/manual/en/class.arrayiterator.php
 */

class ArrayClass implements \ArrayAccess, \Iterator {
    
    private $result = array();
    private $position = 0;
    
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
    public function offsetExists ($offset) { return isset($this->result[$offset]); }
    
    /*
     * 
     */
    public function offsetGet ($offset) { return isset($this->result[$offset]) ? $this->result[$offset] : NULL; }
    
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
    public function offsetUnset ($offset) { unset($this->result[$offset]); }
    
    /*
     * ###########################
     * # Iterator implementation #
     * ###########################
     */

     /*
      * 
      */
    function rewind() { $this->position = 0; }
    
     /*
      * 
      */
    function current() { return $this->result[$this->position]; }
    
     /*
      * 
      */
    function key() { return $this->position; }
    
     /*
      * 
      */
    function next() { ++$this->position; }
    
     /*
      * 
      */
    function valid() { return isset($this->result[$this->position]); }
    
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