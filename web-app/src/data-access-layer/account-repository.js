const db = require('./db.js')

exports.getAllAccounts = function(callback){
	
	const query = `SELECT * FROM users ORDER BY userName`
	const values = []
	
	db.query(query, values, function(error, users){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], users)
		}
	})
	
}

exports.logInAccountByUsername = function(user1, callback){

	const query = `SELECT * FROM users WHERE userName = ? LIMIT 1`
	const value = [user1.userName]

	db.query(query,value, function(error, user1){
		if (error){
			callback(['databaseError'], null)
		}else {
			callback([[], user1[0]])
		}

	})
}


exports.createAccount = function(newUser, callback){
	
	const query = `INSERT INTO users (userName, userEmail, userPassword) VALUES (?, ?, ?)`
	//ska jag få in ett hash value här?
	const values = [newUser.userName, newUser.userEmail , newUser.userPassword]

   // console.log("repo")
	
	db.query(query, values, function(error, newUser){
		if(error){
			// TODO: Look for usernameUnique violation.
			callback(['databaseError'], null)
		}else{
			callback([], newUser)
		}
      //  console.log("db")
	})

}

