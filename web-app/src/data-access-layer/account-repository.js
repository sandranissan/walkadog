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