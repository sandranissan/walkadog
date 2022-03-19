const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')



function validationsErrors() {

}


module.exports = function ({ accountManager, advertManager }) {
    const router = express.Router()

    router.use(bodyParser.json())
    router.use(bodyParser.urlencoded({
        extended: false
    }))


    router.use(function (request, response, next) {
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Methods", "*")
        response.setHeader("Access-Control-Allow-Headers", "*")
        response.setHeader("Access-Control-Expose-Headers", "*")

        if (request.method == "OPTIONS") {
            return response.status(200).end()
        }

        next()
    })



    router.use(function (request, response, next) {
        console.log(request.method, request.url)
        next()
    })

    //hämtar alla adverts
    router.get("/adverts", function(request,response){
        advertManager.getAllAdverts(function(errors, adverts){
            if(errors.length > 0){ 
                response.status(400).json(errors)
            } else{ 
                response.status(200).json(adverts) }
        })

    })

    router.get("/adverts/:id", function(request,response){
        userId = request.params.id
 
        advertManager.getAdvertsByUserId(userId, function(errors, adverts){
            if(errors.length > 0){
                response.status(400).json(errors)
            }else {
                response.status(200).json(adverts)
                }
            
        })
    })

    router.post("/adverts", function(request, response){
        const newAdvert = {
            advertName: request.body.advertName,
            advertDescription: request.body.advertDescription,
            advertContact: request.body.advertContact,

        }

        advertManager.createAdvert(newAdvert, function (errors, advert){
            if(errors.length > 0){
                response.status(400).json(errors)
            } else {
                response.setHeader("Location", "/" + advert)
                response.status(201).json({
                    advert
                })
            }
        })

    })

    router.put("/adverts/:id", function(request,response){
        const advertId = request.params.id
        const updatedAdvert = {
            advertName: request.body.advertName,
            advertDescription: request.body.advertDescription,
            advertContact: request.body.advertContact

        }

        advertManager.UpdateAdvertById(advertId, updatedAdvert, function(errors,updatedAdvert){
            if(errors.length > 0){
                response.status(400).json(errors)
            } else {
                response.status(200).json(updatedAdvert)
            }
        })

    })

    router.delete("/adverts/:id", function(request,response){
        advertId = request.params.id

        advertManager.deleteAdvertById(advertId, function(errors, adverts){
            if(errors.length > 0){
                response.status(400).json(errors)
            }else {
                response.status(200).json(adverts)
            }
        })
    })

    //skapa user
    router.post("/accounts", function(request, response){
        const newUser = {
            userName: request.body.userName,
            userPassword: request.body.userPassword,
            userEmail: request.body.userEmail
        }

        accountManager.createAccount(newUser, function(errors, user){
            if(errors.length > 0){
                response.status(400).json(errors)
            } else {
                response.setHeader("Location", "/" + user)
                response.status(201).json({
                    user
                })
            }
        })

    })

    //hämtar alla konton
    router.get("/", function (request, response) {
        accountManager.getAllAccounts(function (errors, users) {
            if (errors.length > 0) {
                response.status(400).json(errors)
            } else {
                response.status(200).json(users)
            }

        })
    })


    //hämtar specifikt konto
    router.get("/:id", function (request, response) {
        const id = request.params.id

        accountManager.getAllAccounts(function (errors, users) {
            if (errors.length > 0) {
                response.status(400).json(errors)
            } else {
                const user = users.find(a => a.userId == id)

                if (user) {
                    response.status(200).json(user)

                } else {
                    response.status(404).end()
                }

            }
        })
    })

    //router.post(/tokens)

    //router.put("/:id") // och update , updateAccountblabla.. ? updatera advert för just det kontot 
    //router.delete("/:id") // samma sak för delete , deletebyUsername? ta bort advert för det kontot
    //router get för advert med just det kontot
    //router post för advert med just det kontot

    return router

}

//skapa konto
//logga in på konto
//hämta advert
//skapa advert
//update
//delete