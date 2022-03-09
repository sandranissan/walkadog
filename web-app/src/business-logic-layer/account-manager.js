

module.exports = function ({ accountRepository, accountValidator }) {

	return {
		getAllAccounts(callback){
			accountRepository.getAllAccounts(callback)
		},

		createAccount(newUser, callback){
			accountValidator.getErrorsNewAccount(newUser, callback)
		
		},
		logInCredential(knownUser, callback){
			accountRepository.logInCredential(knownUser, callback)
			console.log("account manager fuuuuuckar")
		}

	}

}
