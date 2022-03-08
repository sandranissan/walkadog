

module.exports = function createAdvert_router({ accountRepository, accountValidator }) {

	return {
		getAllAccounts(callback){
			accountRepository.getAllAccounts(callback)
		},

		createAccount(newUser, callback){
			accountValidator.getErrorsNewAccount(newUser, callback)
		
		},
		logInCredentials(knownUser, callback){
			accountRepository.logInCredentials(knownUser, callback)
		}

	}

}
