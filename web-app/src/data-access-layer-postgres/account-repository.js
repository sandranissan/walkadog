const db = require('./db.js')

module.exports = function createPostgresAccountRepository(){
    return {

        getAllAccounts(){

        },

        logInCredential(){

        },
        createAccount(newUser, callback){
            const seqCreate = db.newUser.create({
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
            if(error){
                callback(['database', null])
            }
            else {
                callback([], newUser)
            }
        }
    }
}