import Vue from 'vue'
import VueRouter from "vue-router"
import {ServiceProvider} from "laravel-micro.js"
import Unauthorized from '@pages/Unauthorized'
import Protected from '@pages/Protected'
import Edit from '@pages/Edit'
import Root from '@pages/Root'

export default class VueServiceProvider extends ServiceProvider{
    constructor(App) {
        super(App)
        this.app = App
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
        this.app.bind('Events', () => new Vue)
    }

    /**
     * Boot any application services.
     * @return void
     */
    boot() {
        this.app.bind('Router', () => new VueRouter({
            mode: 'hash',
            base: '/',
            routes: [
                {
                    path: '/',                  component: Root,
                    children:[
                        {path: '',              component: Edit },
                        {path: 'super-root',    component: Protected },
                        {path: 'unauthorized',  component: Unauthorized },
                        {path: '*',             component: Unauthorized },
                    ]
                },
            ]
        }))
        this.app.bind('VueRoot', (Router, Events) => {

            Router.beforeEach((to, from, next) => {
                Events.$emit('route:before', {to, from, next})
                this.app.dispatch({to, from, next})
            })

            Router.afterEach((to, from) => {
                Events.$emit('route:after', {to, from})
                this.app.terminate({to, from})
            })

            return new Vue({
                router: Router,
                template: `<router-view/>`
            })
        })
    }

    /**
     * Declare the aliases for the provided services.
     * @return {Array}
     */
    get provides() {
        return [
            'Vue',
            'VueRoot',
            'Router',
        ]
    }
}
