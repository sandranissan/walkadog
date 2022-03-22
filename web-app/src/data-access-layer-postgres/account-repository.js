const { users } = require('./db.js')
const db = require('./db.js')

module.exports = function createPostgresAccountRepository(){
    return {

        getAllAccounts(callback){
            db.users.findAll({
                order: [ userName , 'ASC']
            }) // constarins här
            .then(allUsers, () => {
                callback([], users)
            }).catch(error, () => {
                callback(['databaseError'], null)
            })
        },

        /*getAllAccounts (callback) {

			const query = `SELECT * FROM users ORDER BY userName`
			const values = []

			db.query(query, values, function (error, users) {
				if (error) {
					callback(['databaseError'], null)
				} else {
					callback([], users)
				}
			})

		},*/

        logInCredential(knownUser, callback){
            users.findAll({ 
                where: {
                    userName: knownUser.userName,
                    userPassword: knownUser.userPassword
                }
            }).then(foundUser =>
                callback([], foundUser[0])
                ).catch(userError => {
                    console.log("fel i logInCredentials"),
                    callback(userError,[])
                }
                )

        },



       /* logInCredential(knownUser, callback) {

			const query = `SELECT * FROM users WHERE userName = ? AND userPassword = ?`
			const values = [knownUser.userName, knownUser.userPassword]

			db.query(query, values, function (error, knownUser) {
				userError = []
				if (knownUser.length == 0) {
					userError.push("User not found.")
				}
				if (error || userError.length > 0) {
					console.log(error, "error i account-repository.js")
					callback(userError, [])
				} else {
					callback([], knownUser[0])
				}

			})
		}*/
        createAccount(newUser, callback){
            const seqCreate = db.users.create({
                userName: newUser.userName,
                userEmail: newUser.userEmail,
                userPassword: newUser.userPassword
                //IsAdmin ??
            }, { 
                fields: [ // fields ???
                    'userName',
                    'userEmail',
                    'userPassword'
                ]
            })
            .then(allAccounts => 
                callback([], allAccounts)
            ).catch(error => 
                callback(['databaseError'], null)
            )
        }
    }
}