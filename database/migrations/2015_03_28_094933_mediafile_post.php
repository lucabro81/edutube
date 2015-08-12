<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MediafilePost extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mediafile_post', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('post_id')->unsigned();
            $table->foreign('post_id')->references('id')->on('posts')
                      ->onDelete('cascade')
                      ->onUpdate('cascade');

            $table->integer('mediafile_id')->unsigned();
            $table->foreign('mediafile_id')->references('id')->on('mediafiles')
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
        Schema::drop('mediafile_post');
    }

}
