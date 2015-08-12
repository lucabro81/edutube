<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

use App\Statustype;
use App\Statusname;
use App\Mediatype;
use App\Categoryname;

class InitTabelleTipologieSeeder extends Seeder {

    public function run() {

        // STATUS TYPES

        $status_type = new Statustype;
        $status_type->type = Config::get('constants.STATUS_TYPE_POST');
        $status_type->slug = Str::slug(Config::get('constants.STATUS_TYPE_POST'));
        $status_type->save();
        
        $status_type1 = new Statustype;
        $status_type1->type = Config::get('constants.STATUS_TYPE_USER');
        $status_type1->slug = Str::slug(Config::get('constants.STATUS_TYPE_USER'));
        $status_type1->save();

	// STATUS NAMES

        $status_name = new Statusname;
        $status_name->name = Config::get('constants.STATUS_POST_INATTESAMODERAZIONE');
	$status_name->slug = Str::slug(Config::get('constants.STATUS_POST_INATTESAMODERAZIONE'));
	$status_name->statustype_id = Statustype::where('type',Config::get('constants.STATUS_TYPE_POST'))->first()->id;
        $status_name->save();
        
        $status_name1 = new Statusname;
        $status_name1->name = Config::get('constants.STATUS_POST_INATTESAPUBBLICAZIONE');
	$status_name1->slug = Str::slug(Config::get('constants.STATUS_POST_INATTESAPUBBLICAZIONE'));
	$status_name1->statustype_id = Statustype::where('type',Config::get('constants.STATUS_TYPE_POST'))->first()->id;
        $status_name1->save();
        
        $status_name2 = new Statusname;
        $status_name2->name = Config::get('constants.STATUS_POST_PUBBLICATO');
	$status_name2->slug = Str::slug(Config::get('constants.STATUS_POST_PUBBLICATO'));
	$status_name2->statustype_id = Statustype::where('type',Config::get('constants.STATUS_TYPE_POST'))->first()->id;
        $status_name2->save();
        
        $status_name3 = new Statusname;
        $status_name3->name = Config::get('constants.STATUS_USER_INATTESAATTIVAZIONE');
	$status_name3->slug = Str::slug(Config::get('constants.STATUS_USER_INATTESAATTIVAZIONE'));
	$status_name3->statustype_id = Statustype::where('type',Config::get('constants.STATUS_TYPE_USER'))->first()->id;
        $status_name3->save();
        
        $status_name4 = new Statusname;
        $status_name4->name = Config::get('constants.STATUS_USER_ATTIVATO');
	$status_name4->slug = Str::slug(Config::get('constants.STATUS_USER_ATTIVATO'));
	$status_name4->statustype_id = Statustype::where('type',Config::get('constants.STATUS_TYPE_USER'))->first()->id;
        $status_name4->save();
        
        $status_name5 = new Statusname;
        $status_name5->name = Config::get('constants.STATUS_USER_BANNATO');
	$status_name5->slug = Str::slug(Config::get('constants.STATUS_USER_BANNATO'));
	$status_name5->statustype_id = Statustype::where('type',Config::get('constants.STATUS_TYPE_USER'))->first()->id;
        $status_name5->save();
                
        // MEDIA TYPES
        
        $media_type = new Mediatype;
        $media_type->name = Config::get('constants.MEDIA_TYPE_IMGJPG');
        $media_type->slug = Str::slug(Config::get('constants.MEDIA_TYPE_IMGJPG'));
        $media_type->ext = Config::get('constants.MEDIA_TYPE_IMGJPG_EXT');
        $media_type->save();
        
        $media_type1 = new Mediatype;
        $media_type1->name = Config::get('constants.MEDIA_TYPE_IMGGIF');
        $media_type1->slug = Str::slug(Config::get('constants.MEDIA_TYPE_IMGGIF'));
        $media_type1->ext = Config::get('constants.MEDIA_TYPE_IMGGIF_EXT');
        $media_type1->save();
        
        $media_type2 = new Mediatype;
        $media_type2->name = Config::get('constants.MEDIA_TYPE_IMGPNG');
        $media_type2->slug = Str::slug(Config::get('constants.MEDIA_TYPE_IMGPNG'));
        $media_type2->ext = Config::get('constants.MEDIA_TYPE_IMGPNG_EXT');
        $media_type2->save();
        
        $media_type3 = new Mediatype;
        $media_type3->name = Config::get('constants.MEDIA_TYPE_IMGBMP');
        $media_type3->slug = Str::slug(Config::get('constants.MEDIA_TYPE_IMGBMP'));
        $media_type3->ext = Config::get('constants.MEDIA_TYPE_IMGBMP_EXT');
        $media_type3->save();
        
        $media_type4 = new Mediatype;
        $media_type4->name = Config::get('constants.MEDIA_TYPE_IMGTIFF');
        $media_type4->slug = Str::slug(Config::get('constants.MEDIA_TYPE_IMGTIFF'));
        $media_type4->ext = Config::get('constants.MEDIA_TYPE_IMGTIFF_EXT');
        $media_type4->save();
        
        $media_type5 = new Mediatype;
        $media_type5->name = Config::get('constants.MEDIA_TYPE_PDF');
        $media_type5->slug = Str::slug(Config::get('constants.MEDIA_TYPE_PDF'));
        $media_type5->ext = Config::get('constants.MEDIA_TYPE_PDF_EXT');
        $media_type5->save();
        
        $media_type6 = new Mediatype;
        $media_type6->name = Config::get('constants.MEDIA_TYPE_MPG');
        $media_type6->slug = Str::slug(Config::get('constants.MEDIA_TYPE_MPG'));
        $media_type6->ext = Config::get('constants.MEDIA_TYPE_MPG_EXT');
        $media_type6->save();
        
        $media_type7 = new Mediatype;
        $media_type7->name = Config::get('constants.MEDIA_TYPE_MP3');
        $media_type7->slug = Str::slug(Config::get('constants.MEDIA_TYPE_MP3'));
        $media_type7->ext = Config::get('constants.MEDIA_TYPE_MP3_EXT');
        $media_type7->save();
        
        // CATEGORIES
        
        $categories = new Categoryname;
        $categories->name = 'Storia';
        $categories->slug = Str::slug('Storia');
        $categories->parent_id = null;
        $categories->save();
        
        $categories1 = new Categoryname;
        $categories1->name = 'Scienza';
        $categories1->slug = Str::slug('Scienza');
        $categories1->parent_id = null;
        $categories1->save();
        
        $categories2 = new Categoryname;
        $categories2->name = 'Tecnologia';
        $categories2->slug = Str::slug('Tecnologia');
        $categories2->parent_id = null;
        $categories2->save();
        
        $categories3 = new Categoryname;
        $categories3->name = 'Storia della scienza';
        $categories3->slug = Str::slug('Storia della scienza');
        $categories3->parent_id = Categoryname::where('name','Storia')->first()->id;
        $categories3->save();
        
        $categories4 = new Categoryname;
        $categories4->name = 'Fisica';
        $categories4->slug = Str::slug('Fisica');
        $categories4->parent_id = Categoryname::where('name','Scienza')->first()->id;
        $categories4->save();
        
        $categories5 = new Categoryname;
        $categories5->name = 'Chimica';
        $categories5->slug = Str::slug('Chimica');
        $categories5->parent_id = Categoryname::where('name','Scienza')->first()->id;
        $categories5->save();
		
    }

}