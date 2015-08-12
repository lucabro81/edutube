<?php

namespace App\Http\Controllers\core;

/**
 * Description of RecordContiner
 *
 * @author root
 */
class RecordContainer {
    public static $id_record_corrente; ///< int quello che il nome suggerisce
    private $bkp_record; ///< array contenente i dati commessa salvati prima di un update.
    
    public function __construct() {
        
    }
    
    private function bkp_dati_record($idr) {
        
    }
    
    private function force_delete ($obj) {

    }
    
    private function soft_delete($obj) {

    }
}
