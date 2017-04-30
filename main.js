'use strict'
import Chatroom from './assets/js/chatroom'
import User from './assets/js/user'


$(document).ready(function(){
	const chatRoom = new Chatroom()
	// const c1 = new User('Jane')
	// const c2 = new User('Will')
	// const c3 = new User('Bobby')
	// const c4 = new User('Sophia')
	//
	// m1.subscribe(c1)
	// m1.subscribe(c2)
	// m1.subscribe(c3)
	// m1.subscribe(c4)
	//
	// console.log(c1.id, c1.name)
	// console.log(c2.id, c2.name)
	// console.log(c3.id, c3.name)
	// console.log(c4.id, c4.name)
	//
	// c1.globalChat("Hello World!")
	// c1.privateChat("Hi Bobby, I'm pretty cool ... right?", 2)

	const addUser = () => {
		const name = $('#new-name').val()
		const age = $('#new-age').val()

		// Validate Name and Age
		const error = (function(name, age) {
			'use strict';
			return name.length > 1 && age > 12 ? undefined : 1
		}(name, age));

		// Check Errors and Handle if it exists
		if(typeof error === 'undefined') {
			const newUser = new User(name, age)
			chatRoom.subscribe(newUser)
			$('.new-user-input').val('')
			$('#addUserModal').modal('close')
		} else {
			console.log('Name must be 2 or more characters and age must be over 12!');
		}
	}

	// Initialize Add Button focus
	$('.tap-target').tapTarget('open')

	// Initialize Modals
	$('#addUserModal').modal({
		dismissible: true,
		opacity: .7,
		inDuration: 400,
		outDuration: 200,
		startingTop: '2%',
		endingTop: '15%'
	})

	// Initialize submit user
	$('#submit-user').click(addUser)



})
