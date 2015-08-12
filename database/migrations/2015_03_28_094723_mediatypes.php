<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Mediatypes extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mediatypes', function(Blueprint $table) {
            $table->increments('id');
            $table->string('ext', 4);
            $table->string('name', 100);
            $table->string('slug', 100);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('mediatypes');
    }

}
