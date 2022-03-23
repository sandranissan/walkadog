
module.exports = function createAccount_repository() {
	const db = require('./db.js')

	return {
		getAllAccounts (callback) {

			const query = `SELECT * FROM users ORDER BY userName`
			const values = []

			db.query(query, values, function (error, users) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], users)
				}
			})

		},

		logInCredentials(knownUser, callback) {

			const query = `SELECT * FROM users WHERE userName = ? LIMIT 1`
			const values = [knownUser.userName]

			db.query(query, values, function (error, resultUser) {
				userError = []
				if (resultUser.length == 0) {
					userError.push("User not found.")
				}
				if (error || userError.length > 0) {
					console.log(userError)
					console.log(error, "error i account-repository.js")
					callback(resultUser, [])
					
				} else {
					callback([], knownUser.userPassword, resultUser[0])

				}
			})
		}, 


		createAccount (newUser, callback) {

			const query = `INSERT INTO users (userName, userEmail, userPassword) VALUES (?, ?, ?)`
			//ska jag få in ett hash value här?
			const values = [newUser.userName, newUser.userEmail, newUser.userPassword]

			console.log(newUser)

			// console.log("repo")

			db.query(query, values, function (error, newUser) {
				if (error) {
					// TODO: Look for usernameUnique violation.
					callback(['databaseError'], null)
				} else {
					callback([], newUser)
				}
			})
		}

	}

}

