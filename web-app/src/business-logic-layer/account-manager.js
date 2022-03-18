const bcrypt = require('bcrypt')
module.exports = function ({ accountRepository, accountValidator, hashManager  }) {

	return {
		getAllAccounts(callback){
			accountRepository.getAllAccounts(callback)
		},

		createAccount(newUser, callback){
			hashPassword = hashManager.getHashPassword(newUser.userPassword)
			newUser.userPassword = hashPassword
			accountValidator.getErrorsNewAccount(newUser, callback)
		
		},
		logInCredentials(knownUser, callback){
			// const userName = knownUser.userName
 		 	// const fetchedUserPassword = userPassword[0]
			// bcrypt.compare(knownUser.userPassword, fetchedUserPassword, function(error, success){
			// 	if(error){
			// 		console.log("error in bycrypt.compare", error)
            //         callback(error)

			// 	}else if(success){
			// 		callback([],userName)
			// 	}
			// })
			accountRepository.logInCredentials(knownUser, callback)
		}

	}

}



// const bcrypt = require('bcrypt')
// const MIN_USERNAME_LENGTH = 2
// const MAX_USERNAME_LENGTH = 15
// const MIN_PASSWORD_LENGTH = 3
// const MAX_PASSWORD_LENGTH = 15

// module.exports = function ({ accountRepository, hashManager  }) {

// 	return {
// 		getAllAccounts(callback){
// 			accountRepository.getAllAccounts(callback)
// 		},

// 		createAccount(newUser, callback){
// 			const validateErr = []
// 			var regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// 			if(newUser.userEmail == null){
// 				if(newUser.userEmail == ""){ validateErr.push("Please enter an email") }

// 				if(!regEx.test(String(newUser.userEmail).toLowerCase())) { validateErr.push("Invalid email") }

// 				if(newUser.userName.length < MIN_USERNAME_LENGTH || newUser.userName.length > MAX_USERNAME_LENGTH) { validateErr.push("Invalid Username") }

// 				if(newUser.userPassword.length < MIN_PASSWORD_LENGTH || newUser.userPassword.length > MAX_PASSWORD_LENGTH) { validateErr.push("Wrong password") }

// 				if(validateErr == 0){
// 					newUser.userPassword = hashManager.getHashPassword(newUser.userPassword)
// 					accountRepository.createAccount(newUser, function(error, createdAccount){
// 						if(error){
// 							validateErr.push("databaseError")
// 							callback(validateErr)
// 						} else{
// 							callback([],createdAccount)
// 						}
// 					})
// 				} else {
// 					callback(validateErr)
// 				}
					
// 			} else {
// 				validateErr.push("Can't create account while logged in")
// 				callback(validateErr)
// 			}
// 		},

// 		logInCredentials(knownUser, callback){
// 			const validateErrors = []

// 			if(knownUser.username == "" || knownUser.userPassword == "") {validateErrors.push("Username and password cant be empty") }

// 			if(validateErrors ==0){
// 				accountRepository.logInCredentials(knownUser, function(error, knownUser){
// 					if(error){
// 						validateErrors.push("databaseError")
// 						callback(validateErrors)

// 					} else if(!knownUser){
// 						validateErrors.push("Account doesn't exist")
// 						callback(validateErrors)

// 					}else {
// 						const userName = knownUser[0].username
// 		 				const fetchedUserPassword = knownUser[0].userPassword
// 						bcrypt.compare(userPassword, fetchedUserPassword, function(error, success){
// 							if(error){
// 								console.log("error in bycrypt.compare", error)
// 								callback(error)

// 							} else if(success){
// 								callback([],userName)

// 							} else {
// 								validateErrors.push("Wrong password")
// 								callback(validateErrors)
// 							}
// 						})

// 					}
// 				})
// 			} else {
// 				callback(validateErrors)
// 			}

// 		}   
// 	}
// }

