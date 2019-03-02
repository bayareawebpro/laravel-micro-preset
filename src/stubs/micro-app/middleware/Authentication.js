export default class Authentication{
    constructor(App){
        this.app = App
    }

    /**
     * Handle Next.
     * @param to
     * @param from
     * @param next
     * @param nextMiddleware
     * @return {*}
     */
    handle({to, from, next}, nextMiddleware){

        console.log('middleware:auth:handle', {to, from, next})

        const response = {to, from, next}


        //Hook Into Next.
        if(to.path.includes('super-root') && this.app.make('currentUser').state.isAdmin === false){
            response.next = ()=>{
                console.log('middleware:auth:handle:next:unauthorized')
                next('/unauthorized') //redirect route
            }
        }else{
            response.next = ()=>{
                console.log('middleware:auth:handle:next')
                next() //next route
            }
        }

        return nextMiddleware(response)
    }

    /**
     * Terminate Next.
     * @param to
     * @param from
     * @param nextMiddleware
     * @return {*}
     */
    terminate({to, from}, nextMiddleware){

        console.log('middleware:auth:terminate', {to, from})

        const response = {to, from}

        //Add Optional Next.
        response.next = ()=>{
            console.log('middleware:auth:terminate:next')
        }

        return nextMiddleware(response)
    }
}
