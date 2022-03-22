const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = function ({}) {
    return {
        getHashPassword(plainTextPassword) {
            
            hashedPassword = bcrypt.hashSync(plainTextPassword, saltRounds)
            return hashedPassword

        },

        comparedPassword(userPlainTextPassword, fetshedPassword, callback){
            bcrypt.compare(userPlainTextPassword, fetshedPassword, function(error, isValid){
                if(error){
                    //todo
                }else {
                    callback(isValid)
                }
            })

        }

  


    }

}