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
    mix.copy('node_modules/bootstrap-sass/assets/fonts', 'public/bootstrap/fonts');
    mix.copy('node_modules/bootstrap-sass/assets/javascripts/bootstrap.js', 'public/bootstrap/js');
    mix.copy('node_modules/angular/angular.js', 'public/angular');
    mix.copy('node_modules/angular/angular-csp.css', 'public/angular');
    mix.sass('app.scss');
});
