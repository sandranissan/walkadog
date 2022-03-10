

module.exports = function ({ accountRepository, accountValidator, accountRepositoryPostgres  }) {

	return {
		getAllAccounts(callback){
			accountRepositoryPostgres.getAllAccounts(callback)
		},

		createAccount(newUser, callback){
			accountValidator.getErrorsNewAccount(newUser, callback)
		
		},
		logInCredential(knownUser, callback){
			accountRepositoryPostgres.logInCredential(knownUser, callback)
		}

	}

}
