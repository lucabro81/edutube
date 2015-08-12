<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Relateds extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('relateds', function(Blueprint $table) {

            $table->integer('related_id')->unsigned();
            $table->index('related_id');
            $table->foreign('related_id')->references('id')->on('posts')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->integer('post_id')->unsigned();
            $table->foreign('post_id')->references('id')->on('posts')
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
        Schema::drop('relateds');
    }

}
