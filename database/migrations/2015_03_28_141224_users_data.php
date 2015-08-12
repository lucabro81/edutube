<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UsersData extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_data', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')
                      ->onDelete('cascade')
                      ->onUpdate('cascade');

            $table->date('birth_date');
            $table->string('address', 100);
            $table->string('CAP', 100);
            $table->string('city', 100);
            $table->string('prov', 2);
            $table->string('phone', 15);
            $table->string('mobile', 10);
            $table->string('gender', 1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
            Schema::drop('users_data');
    }

}
