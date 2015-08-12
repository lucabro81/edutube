<?php

namespace App\Http\Controllers\common;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ParentController extends Controller {

    public $root;
    public $dashboard;

    public function __construct(){
        $this->root = URL::to('/');
    }

    /**
     * Setup the layout used by the controller.
     *
     * @return void
     */
    protected function setupLayout() {
        if ( ! is_null($this->layout)) {
            $this->layout = View::make($this->layout);
        }
    }

    protected function json_error($data, $messages, $redirect = null) {
        $alert = View::make('ajax/alert')
            ->with('alert','danger')
            ->with('error',true)
            ->with('messages',$messages)
        ->render();
        $response = array('alert'=>$alert, 'error'=>true, 'class'=>'danger', 'data'=>$data,'messages'=>$messages);
        if ($redirect!=null) {
            $response['redirect'] = $redirect;
        }
        return Response::json($response);
    }

    protected function json_success($data, $messages, $redirect = null) {
        $alert = View::make('ajax/alert')
                        ->with('alert','success')
                        ->with('error',false)
                        ->with('messages',$messages)
                        ->render();
        $response = array('alert'=>$alert, 'error'=>false, 'class'=>'success', 'data'=>$data,'messages'=>$messages);
        if ($redirect!=null) {
            $response['redirect'] = $redirect;
        }
        return Response::json($response);
    }

    public function make_response($data, $is_error = false, $messages=array(), $redirect = null) {
        if (Request::ajax()) {
            if ($is_error) {
                return $this->json_error($data, $messages, $redirect);
            } 
            else {
                return $this->json_success($data, $messages, $redirect);
            }
        } 
        else {
            if ($is_error) {
                return Redirect::to($redirect)
                    ->withInput()
                ->withErrors($messages);
            } 
            else {
                Session::flash('success',$messages);
                return Redirect::to($redirect);
            }
        }
    }
    
}