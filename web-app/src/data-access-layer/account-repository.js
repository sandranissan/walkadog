<<<<<<< HEAD
const db = require('./db.js')
=======
const db = require('../data-access-layer/db.js')
const { use } = require('../presentation-layer/routers/various-router.js')





module.exports = {

    createNewUser(newUser, callback){

        const query = "INSERT INTO users (userName, userEmail, userPassword) VALUES(?,?,?)"
        const values = [newUser.name, newUser.email, newUser.password] 

        db.query(query,values, function(errors,user){
            if(errors){
                console.log(errors)
            }else{
                console.log("Lyckades lägga in ny användare!")
                callback(errors,user)
            }
        })

    },

}





//router,bus, data



>>>>>>> 602ee78a8b0f5f26ba641ed332528728eaadb39b

