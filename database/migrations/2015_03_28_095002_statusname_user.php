<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StatusnameUser extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('statusname_user', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')
                      ->onDelete('cascade')
                      ->onUpdate('cascade');

            $table->integer('statusname_id')->unsigned();
            $table->foreign('statusname_id')->references('id')->on('statusnames')
                      ->onDelete('cascade')
                      ->onUpdate('cascade');

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
        Schema::drop('statusname_user');
    }

}
