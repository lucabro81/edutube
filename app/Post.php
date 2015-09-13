<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;
    
    protected $table = 'posts';
    
    public function author() {
        return $this->belongsTo('App\User');
    }
    
    public function relateds() {
        return $this->hasMany('App\Related', 'related_id', 'id');
    }
    
    public function mediafiles() {
        return $this->belongsToMany('App\Mediafile');
    }
}
