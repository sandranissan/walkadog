

const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 10

module.exports = function createAdvert_router({ accountRepository, accountRepositoryPostgres }) {

    return {
        getErrorsNewAccount(newUser, callback) {

            const errors = []
        
            if (!newUser.hasOwnProperty("username")) {
                errors.push("usernameMissing")
            }
            if (newUser.userName.length < MIN_USERNAME_LENGTH) {
                errors.push("usernameTooShort")
            }
            if (MAX_USERNAME_LENGTH < newUser.userName.length) {
                errors.push("usernameTooLong")
            }
            if(errors.length > 0){
                callback( errors, [])
            }

            accountRepositoryPostgres.createAccount(newUser, function(errors, newUser){
        
                if(errors.length > 0) {
                }
                else {
                    callback([], newUser)
                }
            })
        },

        checklogInCredentials(knownUser, callback){

            accountRepositoryPostgres.logInCredentials(knownUser, function(errors, knownUser){
                if(errors.length > 0){
                    console.error(errors)
                    console.log("error i account-validator")
                    callback(errors, [])
                } else {
                    callback([], knownUser)
                }
            })
        }

    }
}
