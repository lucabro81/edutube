<?php namespace Brognara\GoogleAPIWrapper\Facades;
/**
 * Created by PhpStorm.
 * User: n0impossible
 * Date: 6/14/15
 * Time: 1:47 PM
 */


use Illuminate\Support\Facades\Facade;

class GoogleAPIWrapperFacade extends Facade{
    protected static function getFacadeAccessor() { return 'GoogleAPIWrapper'; }
}