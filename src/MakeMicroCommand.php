<?php declare(strict_types=1);

namespace BayAreaWebPro\LaravelMicroPreset;
use Illuminate\Console\Command;

class MakeMicroCommand extends Command
{

	/**
	 * The name and signature of the console command.
	 * @var string
	 */
	protected $signature = 'make:micro';

	/**
	 * The console command description.
	 * @var string
	 */
	protected $description = 'Create frontend scaffolding for LaravelMicro.js';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 * @return mixed
	 */
	public function handle()
	{
		$this->alert("LaravelMicro.js Installer");
		$this->info("You are about to modify this Laravel installation in a non-destructive manner. Summary of required changes:");

		$this->line("1) Merge required packages with your package.json file.");
		$this->line("2) Copy base scaffolding (micro-app directory) to the assets directory.");
		$this->line("3) Append a \"require\" statement to (bootstrap.js).");
		$this->line("4) Append options to bottom of webpack.mix.js - you may need to merge these options manually.");

		if($this->askWithCompletion("Are you sure?", ['yes', 'no']) === 'yes'){
			$results = Preset::install();

			foreach($results as $process => $value){
				$process = ucwords($process);
				$value = $value ? 'Completed' : 'Modification Already Exists - Skipping.';
				$this->info("$process: $value");
			}

			$this->info("Success! LaravelMicro.js has been configured.");
			$this->line("Next Steps:");
			$this->line("1) Verify: Changes to your project.");
			$this->line("2) Run: npm install.");
			$this->line("3) Run: npm run watch.");
			$this->line("4) View the documentation: https://github.com/bayareawebpro/laravel-micro.js/wiki");
		}
	}
}