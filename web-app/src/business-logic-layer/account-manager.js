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
		logInCredential(knownUser, callback){
			accountRepository.logInCredential(knownUser, callback)
		}

	}

}
