<?php namespace Brognara\GoogleAPIWrapper;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Request;

class GoogleAPIWrapperServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        
        $this->loadViewsFrom(__DIR__.'/views', 'GoogleAPIWrapper');
        $this->publishes([
            __DIR__.'/views' => base_path('resources/views/brognara/GoogleAPIWrapper')
        ]);
        $this->publishes([
            __DIR__.'/config' => base_path('app/config')
        ]);
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        \App::bind('GoogleAPIWrapper', function()
        {
            return new GoogleAPIWrapperClass();
        });
        
        $this->app->make('Brognara\GoogleAPIWrapper\GoogleAPIWrapperClass');
        //include __DIR__.'/routes.php';
    }
}
