
const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 10


module.exports = function createAdvert_router({ accountRepository }) {

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

            accountRepository.createAccount(newUser, function(errors, newUser){
        
                if(errors.length > 0) {
                }
                else {
                    callback([], newUser)
                }
            })
        },



        checklogInCredentials(knownUser, callback){
            //

            accountRepository.logInCredentials(knownUser, function(errors, knownUser){
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

// const MIN_USERNAME_LENGTH = 3
// const MAX_USERNAME_LENGTH = 10


// module.exports = function createAdvert_router({ accountRepository }) {

//     return {
//         getErrorsNewAccount(newUser, callback) {

//             const errors = []
        
//             if (!newUser.hasOwnProperty("username")) {
//                 errors.push("usernameMissing")
//             }
//             if (newUser.userName.length < MIN_USERNAME_LENGTH) {
//                 errors.push("usernameTooShort")
//             }
//             if (MAX_USERNAME_LENGTH < newUser.userName.length) {
//                 errors.push("usernameTooLong")
//             }
//             if(errors.length > 0){
//                 callback( errors, [])
//             }

//             accountRepository.createAccount(newUser, function(errors, newUser){
        
//                 if(errors.length > 0) {
//                 }
//                 else {
//                     callback([], newUser)
//                 }
//             })
//         },



//         checklogInCredentials(knownUser, callback){
//             //

//             accountRepository.logInCredentials(knownUser, function(errors, knownUser){
//                 if(errors.length > 0){
//                     console.error(errors)
//                     console.log("error i account-validator")
//                     callback(errors, [])
//                 } else {
//                     callback([], knownUser)
//                 }
//             })
//         }

//     }
// }



// // module.exports = function createAdvert_router({ accountRepository }) {

// //     return {
// //         getErrorsNewAccount(newUser, callback) {
// //             const errorsCreate = []

// //             accountRepository.createAccount(newUser, function(error, newUser){
// //                 if(error){
// //                     errorsCreate.push("databaseError")
// //                     callback(errorsCreate)
// //                 }else{ 
// //                     callback([], newUser)}
// //             })
// //         },

// //         checklogInCredentials(knownUser, callback){
// //             const errorsLogIn = []

// //             accountRepository.logInCredentials(knownUser, function(error, knownUser){
// //                 if(error){
// //                     errorsLogIn.push("databaseError")
// //                     callback(errorsLogIn)

// //                 } else if(!knownUser){
// //                     errorsLogIn.push("No account found with that email and password")
// //                     callback(errorsLogIn)

// //                 }else{
// //                     callback([], knownUser)
// //                 }
// //             })
// //         }

// //     }
// // }
