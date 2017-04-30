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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mediator__ = __webpack_require__(3);

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
    }
}

Chatroom.prototype.privateChat = function (message, target_id, sender_id) {
    this.emit('privateChat', { message: message, t_id: target_id, send_id: sender_id });
};

Chatroom.prototype.globalChat = function (message, id) {
    this._messages.push(message);
    this.emit('globalMessage', { message: message, u_id: id });
};

/* harmony default export */ __webpack_exports__["a"] = (Chatroom);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__colleague__ = __webpack_require__(2);

class User extends __WEBPACK_IMPORTED_MODULE_0__colleague__["a" /* default */] {
    constructor(name, age) {
        super(name);
        this._age = age;
    }

    globalChat(message) {
        this._mediator.globalChat(message, this._id);
    }

    privateChat(message, target) {
        this._mediator.privateChat(message, target, this._id);
    }

    receiveEmission(type, payload) {
        switch (type) {
            case 'globalMessage':
                if (payload.u_id !== this._id) console.log(`Username ${this.name} of Id ${this.id}\n\tMessage: ${payload.message}\n\tFrom User: ${payload.u_id}\n\n`);
                break;
            case 'privateChat':
                if (payload.t_id == this._id) console.log(`Username ${this.name} of Id ${this.id}\n\tPrivate Message: ${payload.message}\n\tFrom User: ${payload.send_id}\n\n`);
                break;
            default:
                console.log(`I apologize for the unhandled input!`);
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (User);

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Mediator = function () {
    this.emit = (type, payload) => this._children.forEach(child => {
        child.receiveEmission(type, payload);
    });
};

/* harmony default export */ __webpack_exports__["a"] = (Mediator);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_js_chatroom__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_js_user__ = __webpack_require__(1);




// const Mediator = function() {
//     this.emit = (type, payload) => this._children.forEach( child => {
//         child.receiveEmission(type, payload)
//     })
// }
//
// class Colleague {
//     constructor(name) {
//         this._name = name
//         this._id = undefined
//         this._mediator = {}
//     }
//
//     set name(name) {
//         if(name) this._name = name
//     }
//
//     get name() {
//         return this._name
//     }
//
//     set id(id) {
//         this._id = id
//     }
//
//     get id() {
//         return this._id
//     }
//
//     set mediator(m) {
//         this._mediator = m
//     }
//
//     receiveEmission(type, payload) {console.log("received message");}
// }
//
// class Chatroom extends Mediator {
//     constructor() {
//         super()
//         this._curId = 0
//         this._children = []
//         this._messages = []
//     }
//
//     set curId(val) {
//         this._curId = val
//     }
//
//     set children(arr) {
//         this._children = arr
//     }
//
//     subscribe (obj) {
//         this._children.push(obj)
//         obj.id = this._curId++
//         obj.mediator = this
//     }
// }
//
// Chatroom.prototype.privateChat = function(message, target_id, sender_id){
//         this.emit('privateChat', {message: message, t_id: target_id, send_id: sender_id})
// }
//
// Chatroom.prototype.globalChat = function(message, id){
//     this._messages.push(message)
//     this.emit('globalMessage', {message: message, u_id: id})
// }
//
// class User extends Colleague {
//     constructor(name, age) {
//         super(name)
//         this._age = age
//     }
//
//     globalChat(message) {
//         this._mediator.globalChat(message, this._id)
//     }
//
//     privateChat(message, target) {
//         this._mediator.privateChat(message, target, this._id)
//     }
//
//     receiveEmission(type, payload) {
//         switch(type) {
//             case 'globalMessage':
//                 if(payload.u_id !== this._id) console.log(`Username ${this.name} of Id ${this.id}\n\tMessage: ${payload.message}\n\tFrom User: ${payload.u_id}\n\n`)
//                 break
//             case 'privateChat':
//                 if(payload.t_id == this._id) console.log(`Username ${this.name} of Id ${this.id}\n\tPrivate Message: ${payload.message}\n\tFrom User: ${payload.send_id}\n\n`);
//                 break
//             default:
//                 console.log(`I apologize for the unhandled input!`);
//         }
//     }
// }

const m1 = new __WEBPACK_IMPORTED_MODULE_0__assets_js_chatroom__["a" /* default */]();
const c1 = new __WEBPACK_IMPORTED_MODULE_1__assets_js_user__["a" /* default */]('Jane');
const c2 = new __WEBPACK_IMPORTED_MODULE_1__assets_js_user__["a" /* default */]('Will');
const c3 = new __WEBPACK_IMPORTED_MODULE_1__assets_js_user__["a" /* default */]('Bobby');
const c4 = new __WEBPACK_IMPORTED_MODULE_1__assets_js_user__["a" /* default */]('Sophia');

m1.subscribe(c1);
m1.subscribe(c2);
m1.subscribe(c3);
m1.subscribe(c4);

console.log(c1.id, c1.name);
console.log(c2.id, c2.name);
console.log(c3.id, c3.name);
console.log(c4.id, c4.name);

c1.globalChat("Hello World!");
c1.privateChat("Hi Bobby, I'm pretty cool ... right?", 2);

/***/ })
/******/ ]);