
const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')

const router = express.Router()


router.get('/', function (request, response) {
    accountManager.getAllAccounts(function (errors, users) {
        const model = {
            errors: errors,
            users: users
        }
        response.render("logIn.hbs", model)
    })

})

router.get('/signUp', function (request, response) {

    response.render('signUp.hbs')
})

router.post('/signUp', function (request, response) {
    console.log("postade en ny user request!")
    console.log(request.body)
    const newUser = {
        userName: request.body.username,
        userEmail: request.body.userEmail,
        userPassword: request.body.userPassword
    }
    console.log(newUser)
    accountManager.createAccount(newUser, function (errors, user) {

        if (0 < errors.length) {
            console.log(errors)
        }
        else {
            console.log(user)
			response.redirect("/adverts")

        }
    })


})

module.exports = router

// (rouyer - presentioson) - bhussinsn logic - data access 