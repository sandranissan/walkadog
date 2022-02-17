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


exports.createAccount = function(newUser, callback){
	
	const query = `INSERT INTO users (userName, userEmail, userPassword) VALUES (?, ?, ?)`
	const values = [newUser.userName, newUser.userEmail , newUser.userPassword]

    console.log("repo")
	
	db.query(query, values, function(error, newUser){
		if(error){
			// TODO: Look for usernameUnique violation.
			callback(['databaseError'], null)
		}else{
			callback([], newUser)
		}
        console.log("db")
	})
	
}