import {ServiceProvider} from "laravel-micro.js"
import User from "./User"

export default class UserServiceProvider extends ServiceProvider {

	constructor(App) {
		super(App)
		this.app = App
		this.deferred = true
	}

	/**
	 * Register any application services.
	 * @return void
	 */
	register() {
		this.app.bind('User', User)
		this.app.bind('currentUser', (User, Vue) => {
			return Vue.observable(User.setInstance({
				email: 'test@test.com',
			}))
		})
	}

	/**
	 * Boot any application services.
	 * @return void
	 */
	boot() {
	}

	/**
	 * Declare the aliases for the provided services.
	 * @return {Array}
	 */
	get provides() {
		return [
			'User',
			'currentUser',
		]
	}
}
