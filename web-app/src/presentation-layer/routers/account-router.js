const express = require('express')
const staticPath = require("path").resolve(__dirname, '..')
const bcrypt = require('bcrypt')

function accountSessionValidator(request,response,next){

    if(request.session.isLoggedIn){
        const error = ["You already have an account"]
        console.log("*******************")
        next(error)
    }else {
        next()
    }


}



module.exports = function createAccount_router({ accountManager }) {

    const router = express.Router()

    router.get('/', function (request, response) {
        response.render("logIn.hbs")
    })

    router.post('/', function (request, response) {

        const knownUser = {
            userName: request.body.userName,
            userPassword: request.body.userPassword
        }

        accountManager.logInCredentials(knownUser, function (errors, knownUser) {
            console.log(knownUser)

            if (errors.length > 0) {
                response.render("start.hbs")
                request.session.isLoggedIn = false
            } else {
                request.session.userId = knownUser.userId
                request.session.userName = knownUser.userName
                request.session.isLoggedIn = true

                if (knownUser.isAdmin == 1) {
                    request.session.isAdmin = true 

                } else {
                    request.session.isAdmin = false
                }

                console.log(request.session)
                console.log("log in funkade")
                response.redirect("/adverts")
            } 
        })

    })

    router.get('/accountProfile', function (request, response) {

        response.render('accountProfile.hbs')
    })

    router.post('/accountProfile', function (request, response) {
        console.log(request.session)
        request.session.destroy()
        console.log("logga ut funkade")
        response.redirect('/')
    })

    //kollar om man är inloggad, om man är det så kan man inte skapa konto
    router.use(accountSessionValidator)

    router.get('/signUp', function (request, response) {

        response.render('signUp.hbs')
    })

    router.post('/signUp', function (request, response) {
        
            const newUser = {
                userName: request.body.userName,
                userEmail: request.body.userEmail,
                userPassword: request.body.userPassword
            }

        accountManager.createAccount(newUser, function (errors, user) {
            if (errors.length > 0) {
                response.render("start.hbs")
                request.session.isLoggedIn = false
            } else {
                console.log(request.session)
                request.session.userId = newUser.userId
                request.session.userName = newUser.userName
                request.session.isLoggedIn = true
                response.redirect("/adverts")
            }

        })
    })

    

    return router

}



