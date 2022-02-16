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

router.post('/signUp', function(request, response){
    console.log("postade en ny user request!")
    const newUser = {
        userName: request.body.username,
        userEmail: request.body.userEmail,
        userPassword: request.body.userPassword
    }
    console.log(newUser)
    accountManager.createNewUser(newUser, function(errors, user){

    })

})

module.exports = router