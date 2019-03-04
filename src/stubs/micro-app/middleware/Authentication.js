export default class Authentication {

	constructor(App) {
		this.app = App
	}

	/**
	 * Handle Next.
	 * @param to
	 * @param from
	 * @param next
	 * @param nextPipe
	 * @return {*}
	 */
	handle({to, from, next}, nextPipe) {

		console.log('middleware:auth:handle', {to, from, next})

		const request = {to, from, next}

		const user = this.app.make('currentUser')

		//Hook Into Next.
		if (to.path.includes('super-root') && !user.isAdmin) {
			request.next = () => {
				console.log('middleware:auth:handle:next:unauthorized')
				next('/unauthorized') //redirect route
			}
		} else {
			request.next = () => {
				console.log('middleware:auth:handle:next')
				next() //next route
			}
		}

		return nextPipe(request)
	}

	/**
	 * Terminate Next.
	 * @param to
	 * @param from
	 * @param nextPipe
	 * @return {*}
	 */
	terminate({to, from}, nextPipe) {

		console.log('middleware:auth:terminate', {to, from})

		const request = {to, from}

		//Add Optional Next.
		request.next = () => {
			console.log('middleware:auth:terminate:next')
		}

		return nextPipe(request)
	}
}
