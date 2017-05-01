import Colleague from './colleague'
class Bot extends Colleague {
    constructor(name, creator, wheels) {
        super(name)
        this._creator = creator
		this._wheels = wheels
	   this._messages = []
	   this._parentDomNode = $('#chat-area')
	   this._textarea_id = ''
    }

	get creator() { return this._creator}

	set textarea_id(id) {this._textarea_id = id}

	get textarea_id() {return this._textarea_id}

	static transform_messages(messages) {
		return messages.reduce((prev, cur) => {
			return prev + `<li>${cur}</li>`
		}, '<ul>') + '</ul>'
	}

	render() {
		return undefined
	}

	renderMessages() {
		const ele = $("#"+this.id+"_messages")
		ele.html(Bot.transform_messages(this._messages))
	}

    display() {
	    const ele = this._parentDomNode
	    ele.append()
    }

    globalChat(message) {
	   const ele = $('#'+this.textarea_id)
	   const newMess = ele.val()
        this._mediator.globalChat(newMess, this._id, () => {
		   ele.val('')
		   ele.trigger('autoresize')
	   })
    }

	static transformCommand(message) {
		switch (message.split(' ')[0]) {
			case '/help':
				return `
					Here are the following commands:\n
					/help: Display all of the commands
					/giphy: Get random gif from the internet
					/randomize: Display a random Sentence
					/hello: Hello World
				`
			case '/hello':
				return `Hello World`
			default:
				return `I'm sorry, that's not a valid command`
		}
	}

    privateChat(message, target) {
	   const ele = $('#'+this.textarea_id)
	   const newMess = ele.val()
	   this._mediator.privateChat(newMess, target, this._id, () => {
		   ele.val('')
		   ele.trigger('autoresize')
		   ele.focus()
	   })
    }

    receiveEmission(type, payload) {
        switch(type) {
            case 'globalMessage':
				if(payload.message[0] === '/') {
					this._mediator.privateChat('Bot says: '+Bot.transformCommand(payload.message), payload.u_id, this._id)
					// this._messages.unshift(Bot.transformCommand(payload.message))
					// this.renderMessages()
					//if(payload.u_id !== this._id) console.log(`Botname ${this.name} of Id ${this.id}\n\tMessage: ${payload.message}\n\tFrom Bot: ${payload.u_id}\n\n`)
				}
                break
            case 'privateChat':
                if(payload.t_id == this._id) console.log(`Botname ${this.name} of Id ${this.id}\n\tPrivate Message: ${payload.message}\n\tFrom Bot: ${payload.send_id}\n\n`);
                break
            default:
                console.log(`I apologize for the unhandled input!`);
        }
    }
}
export default Bot
