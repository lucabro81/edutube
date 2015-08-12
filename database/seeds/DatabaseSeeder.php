<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call('CancellaTabelleSeeder');
        $this->call('InitTabelleTipologieSeeder');
        /*$this->call('SentrySeeder');
        $this->call('MediaTagsSeeder');
        $this->call('PostSeeder');*/

        Model::reguard();
    }
}
