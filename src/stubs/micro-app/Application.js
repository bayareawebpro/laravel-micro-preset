import LaravelMicro, {ErrorHandler, AppServiceProvider, ConfigServiceProvider} from 'laravel-micro.js'
import Authentication from "./middleware/Authentication"

export default class Application extends LaravelMicro {
	constructor() {
		super()
		this.errorHandler(ErrorHandler)
		this._stack = [
			Authentication
		]
	}

	/**
	 * Load Service Providers
	 * @return void
	 */
	boot() {
		this.bootProviders()
		this.make('VueRoot').$mount('#app')
	}

	/**
	 * Overwrite parent method for auto-loading.
	 */
	bootProviders() {
		this.register(AppServiceProvider)
		this.register(ConfigServiceProvider)

		//AutoLoad All Services in "services" directory.
		const services = require.context('./services', true, /ServiceProvider\.js$/i)
		services.keys().map(key => {
			this.register(services(key).default)
		})
		super.bootProviders()
	}

	/**
	 * Dispatch Route Request through Middleware Stack.
	 * @return void
	 */
	dispatch(request) {
		this
			.make('Kernel')
			.setMiddleware(this._stack.slice())
			.handle(request, (response) => {
				console.log('dispatch:response', response)
				if (this.isCallable(response.next)) {
					response.next()
				}
			})
	}

	/**
	 * Dispatch Route Request in Reverse Order through Middleware Stack via Terminate.
	 * @return void
	 */
	terminate(request) {
		this
			.make('Kernel')
			.setMiddleware(this._stack.slice().reverse())
			.terminate(request, (response) => {
				console.log('terminate:response', response)
				if (this.isCallable(response.next)) {
					response.next()
				}
			})
	}
}
