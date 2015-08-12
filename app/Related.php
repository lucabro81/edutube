<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Related extends Model
{
    protected $table = 'relateds';
    
    public function posts() {
        return $this->hasMany('Post', 'post_id', 'id');
    }
}
