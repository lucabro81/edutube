<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Mediafiles extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mediafiles', function(Blueprint $table) {
            $table->increments('id');

            $table->string('url', 200);
            $table->integer('width');
            $table->integer('height');
            $table->string('nome', 100);
            $table->string('slug', 100);

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->nullable()
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->integer('mediatype_id')->unsigned();
            $table->foreign('mediatype_id')->references('id')->on('mediatypes')->nullable()
                ->onDelete('cascade')
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
        Schema::drop('mediafiles');
    }

}
