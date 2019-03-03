<?php declare(strict_types=1);

namespace BayAreaWebPro\LaravelMicroPreset;
use Illuminate\Foundation\Console\PresetCommand;
use Illuminate\Support\ServiceProvider;
class LaravelMicroPresetServiceProvider extends ServiceProvider
{
	public function boot()
	{
		PresetCommand::macro('laravelmicro', function(){
			Preset::install();
		});

		$this->commands([
			MakeMicroCommand::class
		]);
	}
}