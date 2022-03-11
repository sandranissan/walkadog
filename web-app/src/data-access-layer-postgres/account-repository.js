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

        logInCredential(){

        },
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