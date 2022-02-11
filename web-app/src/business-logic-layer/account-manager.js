const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validator')


module.exports = {

    createNewUser(newUser, callback){
        accountRepository.createNewUser(newUser, callback)
    },
}