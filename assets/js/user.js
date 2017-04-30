import Colleague from './colleague'
class User extends Colleague {
    constructor(name, age) {
        super(name)
        this._age = age
    }

    globalChat(message) {
        this._mediator.globalChat(message, this._id)
    }

    privateChat(message, target) {
        this._mediator.privateChat(message, target, this._id)
    }

    receiveEmission(type, payload) {
        switch(type) {
            case 'globalMessage':
                if(payload.u_id !== this._id) console.log(`Username ${this.name} of Id ${this.id}\n\tMessage: ${payload.message}\n\tFrom User: ${payload.u_id}\n\n`)
                break
            case 'privateChat':
                if(payload.t_id == this._id) console.log(`Username ${this.name} of Id ${this.id}\n\tPrivate Message: ${payload.message}\n\tFrom User: ${payload.send_id}\n\n`);
                break
            default:
                console.log(`I apologize for the unhandled input!`);
        }
    }
}
export default User
