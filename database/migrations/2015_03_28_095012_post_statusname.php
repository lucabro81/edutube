<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PostStatusname extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('post_statusname', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('post_id')->unsigned();
            $table->foreign('post_id')->references('id')->on('posts')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->integer('statusname_id')->unsigned();
            $table->foreign('statusname_id')->references('id')->on('statusnames')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->string('titolo', 200);
            $table->string('first_name', 100);
            $table->string('last_name', 100);

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
        Schema::drop('post_statusname');
    }

}
