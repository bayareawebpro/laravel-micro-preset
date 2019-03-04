import Vue from 'vue'
import {ServiceProvider} from "laravel-micro.js"
import Routes from "./Routes"
import VueRouter from "vue-router"

export default class VueServiceProvider extends ServiceProvider {

	constructor(App) {
		super(App)
		this.deferred = false
	}

	/**
	 * Register any application services.
	 * @return void
	 */
	register() {
		Vue.use(VueRouter)
		Vue.prototype.$app = this.app

		this.app.bind('Vue', () => Vue)
		this.app.bind('Events', new Vue)
		this.app.bind('Router', () => {
			const router = new VueRouter(Routes)
			router.beforeEach((to, from, next) => {
				this.app.dispatch({to, from, next})
			})
			router.afterEach((to, from) => {
				this.app.terminate({to, from})
			})
			return router
		})

		this.app.bind('VueRoot', (Router) => {
			return new Vue({
				router: Router,
				template: `<router-view/>`
			})
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
			'Vue',
			'Events',
			'Router',
			'VueRoot',
		]
	}
}
