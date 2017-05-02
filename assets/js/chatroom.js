import Mediator from './mediator'
class Chatroom extends Mediator {
    constructor() {
        super()
        this._curId = 0
        this._children = []
        this._messages = []
    }

    set curId(val) {
        this._curId = val
    }

    set children(arr) {
        this._children = arr
    }

    subscribe (obj) {
		this._children.push(obj)
		obj.id = this._curId++
		obj.mediator = this
		obj.textarea_id = 'textarea_id_'+obj.id
		obj.render()
    }
}

Chatroom.prototype.privateChat = function(message, target_id, sender_id, callback){
	if(typeof callback === 'function') callback()
     this.emit('privateChat', {message: message, target_id: target_id, sender_id: sender_id})
}

Chatroom.prototype.globalChat = function(message, id, callback){
	if(typeof callback === 'function') callback()
    this._messages.push(message)
    this.emit('globalMessage', {message: message, u_id: id})
}


export default Chatroom
