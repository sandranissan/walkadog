const e = require('express')
const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')

const router = express.Router()


router.get('/', function (request, response) {

    response.render('logIn.hbs')
})

router.get('/signUp', function (request, response) {

    response.render('signUp.hbs')
})

<<<<<<< HEAD

=======
router.post('/signUp', function(request, response){
    console.log("postade en nu user request!")
    const newUser = {
        name: request.params.username,
        userEmail: request.params.email,
        userPassword: request.params.password
    }
    console.log(newUser)
    accountManager.createNewUser(newUser, function(errors, user){

    })

})
>>>>>>> 602ee78a8b0f5f26ba641ed332528728eaadb39b

module.exports = router