const express = require('express')
const session = require('express-session')
const accountManager = require('../../business-logic-layer/account-manager')
const router = express.Router()
router.use(express.urlencoded({ extended: false }))



router.get('/', function (request, response) {
    response.render("logIn.hbs")
    
    })

router.post('/', function(request, response){

    const logInKnownUser = {
        userName: request.body.username,
        userPassword: request.body.userPassword
    }

    accountManager.logInCredentials(logInKnownUser, function(errors, knownUser){
        console.log(knownUser)

        if(errors.length > 0){
            response.render("start.hbs")
            request.session.isLoggedIn = false
        } else {
            request.session.userId = knownUser.userId
            request.session.isLoggedIn = true
            
            if(knownUser.isAdmin == 1) {
                request.session.isAdmin = true

            }else {
                request.session.isAdmin = false
            }

            console.log(request.session)
            console.log("log in funkade")
            response.redirect("/adverts")
        }
    })

})
router.get('/signUp', function (request, response) {

    response.render('signUp.hbs')
})

router.post('/signUp', function (request, response) {
 
    const newUser = {
        userName: request.body.username,
        userEmail: request.body.userEmail,
        userPassword: request.body.userPassword
    }

        accountManager.createAccount(newUser, function (errors, user) {
            const model = {
                errors: errors,
                user: user
            }

        })

})

router.get('/accountProfile', function (request, response) {

    response.render('accountProfile.hbs')
})

router.post('/accountProfile', function(request, response){
    request.session.destroy()
    console.log("logga ut funkade")
    response.redirect('/')
})
module.exports = router

// (rouyer - presentioson) - bhussinsn logic - data access 

