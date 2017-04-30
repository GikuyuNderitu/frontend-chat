class Colleague {
    constructor(name) {
        this._name = name
        this._id = undefined
        this._mediator = {}
    }

    set name(name) {
        if(name) this._name = name
    }

    get name() {
        return this._name
    }

    set id(id) {
        this._id = id
    }

    get id() {
        return this._id
    }

    set mediator(m) {
        this._mediator = m
    }

    receiveEmission(type, payload) {console.log("received message");}
}

export default Colleague
