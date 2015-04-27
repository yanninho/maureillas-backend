# maureillas-backend

Interfaces : 

GET /users/{ID} : {
	description : return user by id
	return : {
		id : ...,
		platform : ...
		feeds : [
			name : ...,
			suscriber : ...
		],
		active : ...
	}
}

GET /users : {
	description : return list of users stored on database
	return : {
		[
			id : ...,
			platform : ...
			feeds : [
				name : ...,
				suscriber : ...
			]
		]
	}
}

PUT /users/{ID}/{PLATFORM} : {
	description : register a user with ID and PLATFORM
	return : {
		code : ...,
		message : ...
	}
}

DELETE /users/{ID} : {
	description : unregister a user
	return : {
		code : ...,
		message : ...
	}
}

POST /users/{ID} : {
	description : update user datas
	params obtionnal : {
		active : ...
		feeds : [
			name : ...,
			suscriber : ...			
		]

	}
	return : {
		code : ...,
		message : ...
	}
}

POST /messages/{feed} : {
	{feed} : feed id for send to suscribers
	description : send a message 
	return : {
		code : ...,
		message : ...		
	}
}

GET /feeds : {
	description : return list of feeds
	return : {
		[
			id : ...
			name : ...
		]
	}
}

PUT /feeds/{feed} : {
	description : create a new feed
	
}
