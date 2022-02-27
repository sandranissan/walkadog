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

exports.logInCredentials = function(knownUser, callback){

	const query = `SELECT * FROM users WHERE userName = ? AND userPassword = ?`
	const values = [knownUser.userName, knownUser.userPassword]

	db.query(query,values, function(error, knownUser){
		userError = []
		if(knownUser.length == 0 ){
			userError.push("User not found.")
		}
		if(error || userError.length > 0){
			console.log(error, "error i account-repository.js")
			callback(userError, [])
		} else {
			callback([], knownUser[0])
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

