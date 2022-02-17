const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validator')


exports.getAllAccounts = function(callback){
	accountRepository.getAllAccounts(callback)
}

exports.createAccount = function(newUser, callback){

    console.log("kom fram till account manager")
	
	// Validate the account.
	accountValidator.getErrorsNewAccount(newUser, callback)

    

	console.log("test!!")
	

    console.log("Skickade till data-access")
	
}