import Colleague from './colleague'
class User extends Colleague {
    constructor(name, age) {
		super(name)
		this._age = age
		this._messages = []
		this._parentDomNode = $('#chat-area')
		this._textarea_id = ''
		this._chat_client = ''
    }

	get age() { return this._age}

	set textarea_id(id) {this._textarea_id = id}

	get textarea_id() {return this._textarea_id}

	static transform_messages(messages) {
		return messages.reduce((prev, cur) => {
			return prev + `<li>${cur}</li>`
		}, '<ul>') + '</ul>'
	}

	render() {
		$('#chat-area').append(`
			<div class="card large col s12 m4 l3 marg-20">
				<section class="card-content">
					<span class="my-card-title">
						${this.name}
					 	<i class="material-icons small">perm_identity</i>
						Id: ${this._id}
						<i class="material-icons small">perm_identity</i>
					 	Age: ${this.age}
					 </span>
					</section>
				<section id="messages-for-${this.id}" class="mini-messages no-x with-y"> ${User.transform_messages(this._messages)}</section>
				<div class="divider"></div>
				<div class="card-content">
					<div class="input-field inline">
						<textarea id="${this.textarea_id}" class="materialize-textarea user-message"></textarea>
						<label for="">New Message</label>
						<button class="btn waves-effect waves-light" type="submit">Submit
							<i class="material-icons right">send</i>
						</button>
					</div>
				</div>
			</div>`
		)
		let button = document.querySelector(`#${this._textarea_id} ~ button`)
		button.addEventListener('click', this.globalChat.bind(this))
	}

	renderMessages() {
		const ele = document.querySelector(`#messages-for-${this._id}`)
		console.log(User.transform_messages(this._messages));
		ele.innerHTML = User.transform_messages(this._messages)
	}

    display() {
	    const ele = this._parentDomNode
	    ele.append()
    }

    globalChat(message) {
	   
		const ele = $('#'+this.textarea_id)
		const newMess = ele.val()
		console.log(newMess);
		this._mediator.globalChat(newMess, this._id, () => {
			ele.val('')
			ele.trigger('autoresize')
		})
    }

	// Refactor this to receive incoming private messages from users
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
				this._messages.unshift(payload.message)
				this.renderMessages(payload.message)
                if(payload.u_id !== this._id) console.log(`Username ${this.name} of Id ${this.id}\n\tMessage: ${payload.message}\n\tFrom User: ${payload.u_id}\n\n`)
                break
            case 'privateChat':
				console.log(payload);
				if(payload.target_id === this._id) {
					this._messages.unshift(payload.message)
					this.renderMessages()
				}
                if(payload.t_id == this._id) console.log(`Username ${this.name} of Id ${this.id}\n\tPrivate Message: ${payload.message}\n\tFrom User: ${payload.send_id}\n\n`);
                break
            default:
                console.log(`I apologize for the unhandled input!`);
        }
    }
}
export default User
