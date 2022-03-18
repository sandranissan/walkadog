const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = function ({}) {
    return {
        getHashPassword(plainTextPassword) {
            
            hashedPassword = bcrypt.hashSync(plainTextPassword, saltRounds)
            return hashedPassword

        },
    }

}