/**
 * Example of Separation of Concerns.
 * Smart Objects with Dumb Views.
 */
export default class User{
    /**
     * User Constructor
     */
    constructor() {
        this._state = {
            email: '',
            isAdmin: false,
        }
    }

    /**
     * Get State
     * @return {{email: string}|*}
     */
    get state(){
        return this._state
    }

    /**
     * Set State.
     * @param value
     * @return void
     */
    set state(value){
        Object.assign(this._state, value)
    }

    /**
     * Set New Instance.
     * @param instance
     * @return {User}
     */
    setInstance(instance){
        this.state = instance
        return this
    }

    /**
     * Update Method
     * @return void
     */
    update(){
        //Send Request to Laravel.
        this._state.isAdmin = !this._state.isAdmin
    }
}
