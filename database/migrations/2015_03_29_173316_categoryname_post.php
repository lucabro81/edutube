<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CategorynamePost extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categoryname_post', function(Blueprint $table) {
            $table->increments('id');
            
            $table->integer('post_id')->unsigned();
            $table->foreign('post_id')->references('id')->on('posts')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->integer('categoryname_id')->unsigned();
            $table->foreign('categoryname_id')->references('id')->on('categorynames')
                ->onDelete('cascade')
                ->onUpdate('cascade');

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
        Schema::drop('categoryname_post');
    }

}
