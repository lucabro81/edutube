<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Posts extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function(Blueprint $table) {
            $table->increments('id');
            $table->string('title', 200);
            $table->string('sub_title', 100);
            $table->text('description');
            $table->string('slug', 200);
            $table->boolean('main',false);
            $table->boolean('featured');
            $table->boolean('visible');
            $table->boolean('page');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->nullable()
                      ->onDelete('no action')
                      ->onUpdate('cascade');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('posts');
    }

}
