const app = require("../presentation-layer/app")
const express = require('express')
const bodyParser = require('body-parser')
const { accounts } = require("../data-access-layer-postgres/db")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

module.exports = function({ accountManager }) { 
    const router = express.Router()

    router.use(function(request, response, next){
        console.log(request.method, request.url)
        next()
    })

    router.use(bodyParser.json())

    router.get("/", function(request, response){
        accountManager.getAllAccounts(function(errors, accounts){ 
            if(errors.length > 0){
                response.status(400).json(errors)
            } else {
                response.status(200).json(accounts)
            }

        })
    })

    router.get("/:id", function (request, response){
        const id = request.params.id

        advertManager.getAllAccounts(function(errors,account){
            if(errors.length>0){
                response.status(400).json(errors)
            } else {
                const account = accounts.find(a => a.account_id == id )

                if(advert){
                    response.status(200).json(account)

                } else {
                    response.status(404).end()
                }

            }
        })
    })

    router.post("/signUp", function(request, response){
        const newUser = {
            userName: request.body.userName,
            userPassword: request.body.userPassword,
            userEmail: request.body.userEmail
        }

        accountManager.createAccount(newUser, function(errors, account){
            if(errors.length > 0){
                response.status(400).json(errors)
            } else {
                response.setHeader("Location", "/" + account)
                response.status(201).json({
                    account
                })
            }
        })
         
    })

    router.post("/logIn", function(request, response){
        const user = {
            userName: request.body.userName,
            userPassword: request.body.userPassword
        }

        // accountManager. // punkt vaaadd?? finns inget i account-manager som heter typ getUserByUserName ?? lägga till de kanske?
    })



    router.delete("/:id") // samma sak för delete , deletebyUsername?


    router.put("/:id") // och update , updateAccountblabla.. ?

}