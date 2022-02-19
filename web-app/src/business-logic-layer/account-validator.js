const accountRepository = require('../data-access-layer/account-repository')

const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 10

exports.getErrorsNewAccount = function (newUser, callback) {

    const errors = []

   // console.log("account validator!")
   // console.log(newUser)
    // Validate username.
    if (!newUser.hasOwnProperty("username")) {
        errors.push("usernameMissing")
       // console.log("vali")
    }
    if (newUser.userName.length < MIN_USERNAME_LENGTH) {
        errors.push("usernameTooShort")
      //  console.log("errors")
      //  console.log("dö")
    }
    if (MAX_USERNAME_LENGTH < newUser.userName.length) {
        errors.push("usernameTooLong")
    }
    if(errors.length > 0){
        callback( errors, [])
    }
    accountRepository.createAccount(newUser, function(errors, newUser){

        if(errors.length > 0) {

        }
        else {
            callback(errors, newUser)

        }


    })
    //console.log("skickade till repo")
}