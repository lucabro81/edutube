<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Mediafile extends Model
{
    use SoftDeletes;
    
    protected $table = 'mediafiles';
    
    public function posts(){
        $this->belongsToMany('Post');
    }
}
