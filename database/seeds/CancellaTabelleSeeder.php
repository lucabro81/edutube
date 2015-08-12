<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class CancellaTabelleSeeder extends Seeder {

	public function run() {

            DB::table('post_statusname')->delete();
            DB::table('statusname_user')->delete();
            DB::table('mediafile_post')->delete();
            DB::table('categoryname_post')->delete();
            DB::table('post_tag')->delete();
            DB::table('relateds')->delete();
            
            DB::table('posts')->delete();
            
            DB::table('categorynames')->update(array('parent_id'=>NULL));
            DB::table('categorynames')->delete();
            DB::table('statusnames')->delete();
            DB::table('statustypes')->delete();
            DB::table('tags')->delete();
            DB::table('mediafiles')->delete();
            DB::table('mediatypes')->delete();

            DB::table('users_data')->delete();
            DB::table('users')->delete();
            DB::table('persistences')->delete();
            DB::table('activations')->delete();
            DB::table('reminders')->delete();
            DB::table('role_users')->delete();
            DB::table('roles')->delete();
            DB::table('throttle')->delete();/**/
	}

}