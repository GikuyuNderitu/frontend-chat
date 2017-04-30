'use strict'
import Chatroom from './assets/js/chatroom'
import User from './assets/js/user'
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

const m1 = new Chatroom()
const c1 = new User('Jane')
const c2 = new User('Will')
const c3 = new User('Bobby')
const c4 = new User('Sophia')

m1.subscribe(c1)
m1.subscribe(c2)
m1.subscribe(c3)
m1.subscribe(c4)

console.log(c1.id, c1.name)
console.log(c2.id, c2.name)
console.log(c3.id, c3.name)
console.log(c4.id, c4.name)

c1.globalChat("Hello World!")
c1.privateChat("Hi Bobby, I'm pretty cool ... right?", 2)
