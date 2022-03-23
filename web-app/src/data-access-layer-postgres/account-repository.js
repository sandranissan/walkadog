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

        logInCredentials(knownUser, callback){
            db.users.findAll({ 
                where: {
                    userName: knownUser.userName,
                    userPassword: knownUser.userPassword
                }
            }).then(foundUser =>
                callback([], knownUser.userPassword ,foundUser[0].dataValues)
                ).catch(userError => {
                    console.log(knownUser.userPassword),
                    console.log("Fel i logInCredentials")
                    callback(userError,[])
                }
                ) 

        },
        
        createAccount(newUser, callback){
            db.users.create({
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