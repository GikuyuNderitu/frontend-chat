'use strict'
import Chatroom from './assets/js/chatroom'
import User from './assets/js/user'
import Bot from './assets/js/bot'


$(document).ready(function(){
	const chatRoom = new Chatroom()
	chatRoom.subscribe(new Bot())


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
		endingTop: '35%'
	})

	// Initialize submit user
	$('#submit-user').click(addUser)



})
