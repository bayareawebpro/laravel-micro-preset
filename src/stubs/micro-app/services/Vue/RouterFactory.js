import VueRouter from "vue-router"

export default class Router {

	constructor(App, Vue) {
		Vue.use(VueRouter)
		this._app = App
	}

	/**
	 * Make Router.
	 * @param routes {*}
	 * @return {VueRouter}
	 */
	make(routes) {
		const router = new VueRouter(routes)

		router.beforeEach((to, from, next) => {
			this._app.dispatch({to, from, next})
		})
		router.afterEach((to, from) => {
			this._app.terminate({to, from})
		})

		return router
	}
}
