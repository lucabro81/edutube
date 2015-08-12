<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Helper
 *
 * @author root
 */
class Debug {
    /**
     * Fa il var_dump dell'argomento e lo mette tra i tag <pre></pre>
     *
     * @author Luca Brognara
     * @date Aprile 2015
     * @param $var parametro da stampare
     * @return void
     */

    public static function vardump($var) {
        echo "<pre>";
        var_dump($var);
        echo "</pre>";
    }

    /**
     * Last query performeds
     *
     * @author Luca Brognara
     * @date Aprile 2015
     *
     * @return void
     */

    public static function last_query() {
        $query = DB::getQueryLog();
        $last_query = end($query);

        echo "<pre>";
        print_r($last_query);
        echo "</pre>";
    }

    /**
     * Breakpoint after last query performed
     *
     * @author Luca Brognara
     * @date Aprile 2015
     * 
     * @return void
     */

    public static function break_point_last_query() {
        $this->last_query();
        exit(0);
    }
}
