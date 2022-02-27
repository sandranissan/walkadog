const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validator')


exports.getAllAccounts = function(callback){
	accountRepository.getAllAccounts(callback)
}

exports.createAccount = function(newUser, callback){
	accountValidator.getErrorsNewAccount(newUser, callback)

}

exports.logInCredentials = function(knownUser, callback){
	accountRepository.logInCredentials(knownUser, callback)
}