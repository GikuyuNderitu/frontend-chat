/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Colleague {
    constructor(name) {
        this._name = name;
        this._id = undefined;
        this._mediator = {};
    }

    set name(name) {
        if (name) this._name = name;
    }

    get name() {
        return this._name;
    }

    set id(id) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    set mediator(m) {
        this._mediator = m;
    }

    receiveEmission(type, payload) {
        console.log("received message");
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Colleague);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__colleague__ = __webpack_require__(0);

class Bot extends __WEBPACK_IMPORTED_MODULE_0__colleague__["a" /* default */] {
	constructor(name, creator, wheels) {
		super(name);
		this._creator = creator;
		this._wheels = wheels;
		this._messages = [];
		this._parentDomNode = $('#chat-area');
		this._textarea_id = '';
	}

	get creator() {
		return this._creator;
	}

	set textarea_id(id) {
		this._textarea_id = id;
	}

	get textarea_id() {
		return this._textarea_id;
	}

	static transform_messages(messages) {
		return messages.reduce((prev, cur) => {
			return prev + `<li>${cur}</li>`;
		}, '<ul>') + '</ul>';
	}

	render() {
		return undefined;
	}

	renderMessages() {
		const ele = $("#" + this.id + "_messages");
		ele.html(Bot.transform_messages(this._messages));
	}

	display() {
		const ele = this._parentDomNode;
		ele.append();
	}

	globalChat(message) {
		const ele = $('#' + this.textarea_id);
		const newMess = ele.val();
		this._mediator.globalChat(newMess, this._id, () => {
			ele.val('');
			ele.trigger('autoresize');
		});
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
				`;
			case '/hello':
				return `Hello World`;
			default:
				return `I'm sorry, that's not a valid command`;
		}
	}

	privateChat(message, target) {
		const ele = $('#' + this.textarea_id);
		const newMess = ele.val();
		this._mediator.privateChat(newMess, target, this._id, () => {
			ele.val('');
			ele.trigger('autoresize');
			ele.focus();
		});
	}

	receiveEmission(type, payload) {
		switch (type) {
			case 'globalMessage':
				if (payload.message[0] === '/') {
					this._mediator.privateChat('Bot says: ' + Bot.transformCommand(payload.message), payload.u_id, this._id);
					// this._messages.unshift(Bot.transformCommand(payload.message))
					// this.renderMessages()
					//if(payload.u_id !== this._id) console.log(`Botname ${this.name} of Id ${this.id}\n\tMessage: ${payload.message}\n\tFrom Bot: ${payload.u_id}\n\n`)
				}
				break;
			case 'privateChat':
				if (payload.t_id == this._id) console.log(`Botname ${this.name} of Id ${this.id}\n\tPrivate Message: ${payload.message}\n\tFrom Bot: ${payload.send_id}\n\n`);
				break;
			default:
				console.log(`I apologize for the unhandled input!`);
		}
	}
}
/* harmony default export */ __webpack_exports__["a"] = (Bot);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mediator__ = __webpack_require__(4);

class Chatroom extends __WEBPACK_IMPORTED_MODULE_0__mediator__["a" /* default */] {
    constructor() {
        super();
        this._curId = 0;
        this._children = [];
        this._messages = [];
    }

    set curId(val) {
        this._curId = val;
    }

    set children(arr) {
        this._children = arr;
    }

    subscribe(obj) {
        this._children.push(obj);
        obj.id = this._curId++;
        obj.mediator = this;
        obj.textarea_id = obj.id + '_textarea_id';
        obj.render();
    }
}

Chatroom.prototype.privateChat = function (message, target_id, sender_id, callback) {
    if (typeof callback === 'function') callback();
    this.emit('privateChat', { message: message, target_id: target_id, sender_id: sender_id });
};

Chatroom.prototype.globalChat = function (message, id, callback) {
    if (typeof callback === 'function') callback();
    this._messages.push(message);
    this.emit('globalMessage', { message: message, u_id: id });
};

/* harmony default export */ __webpack_exports__["a"] = (Chatroom);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__colleague__ = __webpack_require__(0);

class User extends __WEBPACK_IMPORTED_MODULE_0__colleague__["a" /* default */] {
	constructor(name, age) {
		super(name);
		this._age = age;
		this._messages = [];
		this._parentDomNode = $('#chat-area');
		this._textarea_id = '';
	}

	get age() {
		return this._age;
	}

	set textarea_id(id) {
		this._textarea_id = id;
	}

	get textarea_id() {
		return this._textarea_id;
	}

	static transform_messages(messages) {
		return messages.reduce((prev, cur) => {
			return prev + `<li>${cur}</li>`;
		}, '<ul>') + '</ul>';
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
				<section id="${this.id}_messages" class="mini-messages no-x with-y"> ${User.transform_messages(this._messages)}</section>
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
			</div>`);
		$(document).on('click', '#' + this._textarea_id + ' ~ button', null, this.globalChat.bind(this));
	}

	renderMessages() {
		const ele = $("#" + this.id + "_messages");
		ele.html(User.transform_messages(this._messages));
	}

	display() {
		const ele = this._parentDomNode;
		ele.append();
	}

	globalChat(message) {
		const ele = $('#' + this.textarea_id);
		const newMess = ele.val();
		this._mediator.globalChat(newMess, this._id, () => {
			ele.val('');
			ele.trigger('autoresize');
		});
	}

	privateChat(message, target) {
		const ele = $('#' + this.textarea_id);
		const newMess = ele.val();
		this._mediator.privateChat(newMess, target, this._id, () => {
			ele.val('');
			ele.trigger('autoresize');
			ele.focus();
		});
	}

	receiveEmission(type, payload) {
		switch (type) {
			case 'globalMessage':
				this._messages.unshift(payload.message);
				this.renderMessages();
				if (payload.u_id !== this._id) console.log(`Username ${this.name} of Id ${this.id}\n\tMessage: ${payload.message}\n\tFrom User: ${payload.u_id}\n\n`);
				break;
			case 'privateChat':
				console.log(payload);
				if (payload.target_id === this._id) {
					this._messages.unshift(payload.message);
					this.renderMessages();
				}
				if (payload.t_id == this._id) console.log(`Username ${this.name} of Id ${this.id}\n\tPrivate Message: ${payload.message}\n\tFrom User: ${payload.send_id}\n\n`);
				break;
			default:
				console.log(`I apologize for the unhandled input!`);
		}
	}
}
/* harmony default export */ __webpack_exports__["a"] = (User);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Mediator = function () {
    this.emit = (type, payload) => this._children.forEach(child => {
        child.receiveEmission(type, payload);
    });
};

/* harmony default export */ __webpack_exports__["a"] = (Mediator);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_js_chatroom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_js_user__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_js_bot__ = __webpack_require__(1);






$(document).ready(function () {
	const chatRoom = new __WEBPACK_IMPORTED_MODULE_0__assets_js_chatroom__["a" /* default */]();
	chatRoom.subscribe(new __WEBPACK_IMPORTED_MODULE_2__assets_js_bot__["a" /* default */]());

	const addUser = () => {
		const name = $('#new-name').val();
		const age = $('#new-age').val();

		// Validate Name and Age
		const error = function (name, age) {
			'use strict';

			return name.length > 1 && age > 12 ? undefined : 1;
		}(name, age);

		// Check Errors and Handle if it exists
		if (typeof error === 'undefined') {
			const newUser = new __WEBPACK_IMPORTED_MODULE_1__assets_js_user__["a" /* default */](name, age);
			chatRoom.subscribe(newUser);
			$('.new-user-input').val('');
			$('#addUserModal').modal('close');
		} else {
			console.log('Name must be 2 or more characters and age must be over 12!');
		}
	};

	// Initialize Add Button focus
	$('.tap-target').tapTarget('open');

	// Initialize Modals
	$('#addUserModal').modal({
		dismissible: true,
		opacity: .7,
		inDuration: 400,
		outDuration: 200,
		startingTop: '2%',
		endingTop: '15%'
	});

	// Initialize submit user
	$('#submit-user').click(addUser);
});

/***/ })
/******/ ]);