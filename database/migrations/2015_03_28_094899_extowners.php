<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Extowners extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('extowners', function(Blueprint $table) {
            $table->increments('id');
            
            $table->string('extowner_id', 200);
            $table->string('extowner_name', 200);
            
            $table->string('slug', 200);
            
            $table->string('url', 200);
            
            $table->integer('extsourcetype_id')->unsigned();
            $table->foreign('extsourcetype_id')->references('id')->on('extsourcetypes')->nullable()
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
        Schema::drop('extowners');
    }

}
