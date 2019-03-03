<?php declare(strict_types=1);

namespace BayAreaWebPro\LaravelMicroPreset;
use Illuminate\Foundation\Console\Presets\Preset as BasePreset;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class Preset extends BasePreset
{
	/**
	 * Install Preset.
	 * @return array
	 */
	public static function install(){
		$results = collect();
		$results->put('micro-app', self::addApp());
		$results->put('bootstrap', self::addBootstrap());
		$results->put('webpack', self::addWebpack());
		self::updatePackages(true);
		return $results;
	}

	/**
	 * Add App Directory
	 * @return bool
	 */
	public static function addApp(){
		$path = resource_path('js/micro-app');
		if(!File::isDirectory($path)){
			File::copyDirectory(__DIR__.'/stubs/micro-app', $path);
			return true;
		}
		return false;
	}

	/**
	 * Add Bootstrap Directory
	 * @return bool
	 */
	public static function addBootstrap(){
		$path = resource_path('js/bootstrap.js');
		$bootstrap = File::get($path);
		if(!Str::contains($bootstrap, 'micro-app/bootstrap')){
			File::append($path, "require('./micro-app/bootstrap')");
			return true;
		}
		return false;
	}

	/**
	 * Add Webpack Config
	 * @return bool
	 */
	public static function addWebpack(){
		$path = base_path('webpack.mix.js');
		$webpack = File::get($path);
		if(!Str::contains($webpack, 'laravel-micro')){
			File::append($path, File::get(__DIR__.'/stubs/webpack.mix.js'));
			return true;
		}
		return false;
	}

	/**
	 * Update Package Array.
	 * @param $packages
	 * @return array
	 */
	public static function updatePackageArray($packages){
		return array_merge($packages, [
			"laravel-micro.js"=> "^1.0.1",
			"vue-router"=> "^3.0.2"
		]);
	}

}