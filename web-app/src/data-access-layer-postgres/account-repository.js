const { users } = require('./db.js')
const db = require('./db.js')

module.exports = function createPostgresAccountRepository() {
    return {

        getAllAccounts(callback) {
            db.users.findAll({
                order: [userName, 'ASC']
            }) // constarins här
                .then(allUsers, () => {
                    callback([], users)
                }).catch(error, () => {
                    callback(['databaseError'], null)
                })
        },

 

        logInCredentials(knownUser, callback) {
            db.users.findAll({
                where: {
                    userName: knownUser.userName
                }
            }).then(foundUser => {
                console.log(foundUser.dataValues)
                callback([], knownUser.userPassword, foundUser[0].dataValues)
            }).catch(userError => {
                console.log(knownUser.userPassword),
                console.log("Fel i logInCredentials")
                callback(userError, [])
            }) 
 
        },

 
        createAccount(newUser, callback) {
            db.users.create({
                userName: newUser.userName, 
                userEmail: newUser.userEmail,
                userPassword: newUser.userPassword
            }, {
                fields: [ 
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