const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validator')






exports.getAllAccounts = function(callback){
	accountRepository.getAllAccounts(callback)
}

exports.createAccount = function(newUser, callback){
	accountValidator.getErrorsNewAccount(newUser, callback)

}

exports.logInAccountByUsername = function(userName, callback){
	accountRepository.logInAccountByUsername(userName, callback)
}