const Mediator = function() {
    this.emit = (type, payload) => this._children.forEach( child => {
        child.receiveEmission(type, payload)
    })
}

export default Mediator
