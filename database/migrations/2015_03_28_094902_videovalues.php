<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Videovalues extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('videovalues', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('post_id')->unsigned();
            $table->foreign('post_id')->references('id')->on('posts')->nullable()
                      ->onDelete('cascade')
                      ->onUpdate('cascade');
            
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->nullable()
                      ->onDelete('cascade')
                      ->onUpdate('cascade');
            
            $table->string('extowner_id', 200);
            
            $table->integer('extsourcetype_id')->unsigned();
            $table->foreign('extsourcetype_id')->references('id')->on('extsourcetypes')
                      ->onDelete('cascade')
                      ->onUpdate('cascade');

            $table->string('duration');
            
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
        Schema::drop('videovalues');
    }

}
