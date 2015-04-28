# maureillas-backend

Interfaces : 
---------------


---------------
	Users
---------------

GET /users/{ID} : {
	description : return user by id
	return : {
		_id : ...,
		platform : ...
		feeds : [
			{
			  name : ...,
			  suscriber : ...
			}
		],
		active : ...
	}
}

GET /users : {
	description : return list of users stored on database
	return : {
		[
			{
				_id : ...,
				platform : ...
				feeds : [
				  {
					name : ...,
					suscriber : ...
				  }
				]
			}
		]
	}
}

PUT /users/{ID}/{PLATFORM} : {
	description : register a user with ID and PLATFORM
	return : 200 OK
}

DELETE /users/{ID} : {
	description : unregister a user
	return : 200 OK
}

POST /users/{ID} : {
	description : update user datas
	params obtionnal : {
		active : ...
		feeds : [
			{
			  name : ...,
			  suscriber : ...	
			}		
		]

	}
	return : 200 OK
}

---------------
	Platforms
---------------

GET /platforms : {
	description : return list of platforms
	return : {
		[
			{
				name: ...
			}
		]
	}
}

PUT /platforms/{PLATFORM} : {
	description : create a platform
	return : 200 OK
}

DELETE /platforms/{PLATFORM} : {
	description : delete a platform
	return : 200 OK	
}

---------------
	Feeds
---------------

GET /feeds : {
	description : return list of feeds
	return : {
		[
			{
				name: ...
			}
		]
	}
}

PUT /feeds/{FEED} : {
	description : create a feed
	return : 200 OK
}

DELETE /feeds/{FEED} : {
	description : delete a platform
	return : 200 OK	
}


---------------
	Messages
---------------


POST /messages/{feed}/{date} : {
	{feed} : feed id for send to suscribers
	{date} : date for schedule message
	description : send a message at date
	return : 200 OK
}

POST /messages/{feed} : {
	{feed} : feed id for send to suscribers
	description : send a message immediatly
	return : 200 OK
}

POST /messages : {
	description : check messages stored, if date equal today, send message and delete from database
	return : 200 OK
}

