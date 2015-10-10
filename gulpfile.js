var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.copy('node_modules/bootstrap-sass/assets/fonts', 'public/fonts');
    mix.copy('node_modules/bootstrap-sass/assets/javascripts/bootstrap.js', 'public/js');
    
    mix.styles(
        [
            '../sass/variables.scss',
            '../sass/mixins.scss',
            '../sass/app.scss',
        ], 
        'resources/assets/sass/all.scss'
    );
            
    mix.sass('resources/assets/sass/all.scss', 'public/css/app.min.css')
    
    mix.scripts(
        [
            'resources/assets/js/variables.js',
            'resources/assets/js/utility.js',
            'resources/assets/js/helpers.js',
            'resources/assets/js/frontend.js',
            'resources/assets/js/app.js', 
            'resources/assets/js/filters.js', 
            'resources/assets/js/directives.js', 
            'resources/assets/js/controllers.js', 
            'resources/assets/js/services.js', 
        ], 
        'public/js/app.min.js'
    );
});
