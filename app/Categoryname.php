<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categoryname extends Model
{
    public function posts(){
        $this->belongsToMany('Post');
    }
}
