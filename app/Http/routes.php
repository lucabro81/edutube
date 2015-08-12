<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::get('/', 'frontend\HomeController@index');
Route::post('storeauthcode', 'frontend\HomeController@storeauthcode');
Route::post('get-playlists', 'frontend\HomeController@get_playlists');
Route::post('get-playlist/{playlist_id}', 'frontend\HomeController@get_playlist');
Route::post('get-video/{video_id}', 'frontend\HomeController@get_video');