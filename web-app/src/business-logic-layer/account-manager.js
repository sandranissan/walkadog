const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validator')


exports.getAllAccounts = function(callback){
	accountRepository.getAllAccounts(callback)
}

exports.createAccount = function(user, callback){
	
	// Validate the account.
	const errors = accountValidator.getErrorsNewAccount(user)
	
	if(0 < errors.length){
		callback(errors, null)
		return
	}
	
	accountRepository.createAccount(user, callback)
	
}