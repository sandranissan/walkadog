
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

			accountRepository.logInCredentials(knownUser, function(errors, userPlainTextPassword, userCredentials) {
				hashManager.comparedPassword(userPlainTextPassword, userCredentials.userPassword,function(result){
					if(result){
						callback([],userCredentials)
					}else {
						callback(["wrong password"], null)
					}
				})
			})
		}

	}

}

