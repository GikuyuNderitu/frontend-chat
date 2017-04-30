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
	   obj.textarea_id = obj.id+'_textarea_id'
	   obj.render()
	   $(document).on('click','#'+obj.textarea_id+' ~ button', null, obj.globalChat.bind(obj))
    }
}

Chatroom.prototype.privateChat = function(message, target_id, sender_id, callback){
	callback()
     this.emit('privateChat', {message: message, t_id: target_id, send_id: sender_id})
}

Chatroom.prototype.globalChat = function(message, id, callback){
	callback()
    this._messages.push(message)
    this.emit('globalMessage', {message: message, u_id: id})
}


export default Chatroom
