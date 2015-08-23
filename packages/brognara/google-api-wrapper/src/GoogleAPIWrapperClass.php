<?php namespace Brognara\GoogleAPIWrapper;

/*use Illuminate\Http\Request;


 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Lesser General Public License
 * (LGPL) version 2.1 which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/lgpl-2.1.html
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 * 
 */

/**
 * Description of class GoogleAPIWrapperClass 
 *
 * @author Luca Brognara
 */

/*
 * TODO
 * Do some tests
 */
class GoogleAPIWrapperClass {
    
    private $config_data = array();
    private $curl_opt    = array();
    
    private $base_url = '';
    private $request  = '';
    private $service  = '';
    private $query    = '';
    
    /*
     * Constructor
     */
    public function __construct() {
        
        /*if (empty($config_data)) {
            $this->config_data = require __DIR__.'/config/config.php';
        }
        else {
            $this->config_data = $config_data;
        }*/
        
        $this->config_data = require __DIR__.'/config/config.php';
        
        
    }
    
    function __call($method, $arguments) {
        
        $norm_method = strtoupper($method);
        
        
        if (ServiceEnum::isValidName($norm_method)) {
            
            
            $this->service = strtolower($norm_method);
            $this->base_url = 'https://www.googleapis.com/'.$this->service.'/v3/'.$arguments[0];

            return $this;
        }
        
        throw new \Exception("Service ".$norm_method." not enbled or invalid");
    }
    
    /*
     * Create necessary js to use google apis
     */
    public function google_js($config_data = array()) {
        
        if (empty($config_data)) {
            return view('GoogleAPIWrapper::google_js')
                ->with('button_id', $this->config_data['button_id'])
                ->with('client_id', $this->config_data['client_id'])
                ->with('scope',     $this->config_data['scope'])
                ->with('callback',  $this->config_data['callback']);
        }
        
        return view('GoogleAPIWrapper::google_js')
            ->with('button_id', $config_data['button_id'])
            ->with('client_id', $config_data['client_id'])
            ->with('scope',     $config_data['scope'])
            ->with('callback',  $config_data['callback']);
        
    }
    
    /*
     * 
     */
    public function get_refresh_token() {
        
    }
    
    /*
     * 
     */
    public function get_access_token($auth_code) {
        $post = array(
            "grant_type"    => "authorization_code", 
            "code"          => $auth_code, 
            "client_id"     => $this->config_data['client_id'], 
            "client_secret" => $this->config_data['client_secret'], 
            //"redirect_uri"  => "postmessage"
            "redirect_uri" => "http://localhost/edutube/public/popola_db_callback"
        );

        $postText = http_build_query($post);

        $url = "https://accounts.google.com/o/oauth2/token";

        $args_curl = array(CURLOPT_URL            => $url,
                           CURLOPT_RETURNTRANSFER => true,
                           CURLOPT_POST           => true,
                           CURLOPT_POSTFIELDS     => $postText,
                           CURLOPT_SSL_VERIFYPEER => false,
                           CURLOPT_SSL_VERIFYHOST => false);
        
        
        return new ArrayClass($this->cURL($args_curl));
    }
    
    /*
     * ###################
     * # CHAINED METHODS #
     * ###################
     */
    
    
    /*
     * Which api?
     */
    public function get($field = '') {
        
        
        $this->curl_opt[CURLOPT_POST]           = false;
        $this->curl_opt[CURLOPT_CONNECTTIMEOUT] = 2;
        $this->curl_opt[CURLOPT_RETURNTRANSFER] = 1;
        $this->curl_opt[CURLOPT_URL]            = $this->base_url.'?'.$this->query;
        
        $results = $this->cURL($this->curl_opt);
        
        if ($field == '') {
            return new ArrayClass($results);
        }
        
        $classname = "Brognara\\GoogleAPIWrapper\\services\\".ucfirst(strtolower($this->service)).'Class';
        $service = new $classname;
        
        $get_field = $service->{'get_'.$field}($results, $field);
        
        return (count($get_field) == 1) ? $get_field : new ArrayClass($get_field);
    }
    
    public function post() {
        
        $this->curl_opt[CURLOPT_POSTFIELDS]     = $this->query;
        $this->curl_opt[CURLOPT_POST]           = true;
        $this->curl_opt[CURLOPT_CONNECTTIMEOUT] = 2;
        $this->curl_opt[CURLOPT_RETURNTRANSFER] = 1;
        $this->curl_opt[CURLOPT_URL]            = $this->base_url;
        
        return new ArrayClass(($this->cURL($this->curl_opt)));
    }
    
    /*
     * Which arguments?
     */
    public function with($args) {
        $this->query = http_build_query($args);
        return $this;
    }
    
    /*
     * ###################
     * # PRIVATE METHODS #
     * ###################
     */
    
    private function cURL($args) {
        $ch = curl_init();
        
        foreach($args as $key => $value) {
            curl_setopt($ch, $key, $value);
        }
        
        $results = curl_exec($ch);
        
        curl_close($ch);
        
        return $results;
    }
}
