const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const privateSecret = "sandraAljona"



function validationsErrors() {

}


module.exports = function ({ accountManager, advertManager }) {

    function verifyToken(request, response, next) {
        try{
            const authHeader = request.get("authorization")
            const accessToken = authHeader.substr("Bearer ".length)

            jwt.verify(accessToken, privateSecret, function(error, authData){
                if(error){
                    response.sendStatus(403)
                }else {
                    console.log(authData)
                    next()
                }
            })

        }catch(error){
            response.status(400).end()
            return
        }
    }

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

    //hämtar alla konton
    router.get("/", verifyToken, function (request, response) {
        accountManager.getAllAccounts(function (errors, users) {
            if (errors.length > 0) {
                response.status(400).json(errors)
            } else {
                response.status(200).json(users)
            }

        })
    })

        //hämtar alla adverts
        router.get("/adverts", verifyToken, function(request,response){
            console.log(request.headers)
            advertManager.getAllAdverts(function(errors, adverts){
                if(errors.length > 0){ 
                    response.status(400).json(errors)
                } else{ 
                    response.status(200).json(adverts) }
            })
    
        })

    // //hämtar specifikt konto
    // router.get("/:id", function (request, response) {
    //     const id = request.params.id

    //     accountManager.getAllAccounts(function (errors, users) {
    //         if (errors.length > 0) {
    //             response.status(400).json(errors)
    //         } else {
    //             const user = users.find(a => a.userId == id)

    //             if (user) {
    //                 response.status(200).json(user)

    //             } else {
    //                 response.status(404).end()
    //             }

    //         }
    //     })
    // })
    
    //skapa user
    router.post("/accounts", function(request, response){
        const newUser = {
            userName: request.body.userName,
            userEmail: request.body.userEmail,
            userPassword: request.body.userPassword
        }

        accountManager.createAccount(newUser, function(errors, user){
            if(errors.length > 0){
                response.status(400).json(errors)
            } else {
                const payload = {id: user}
                jwt.sign(payload, privateSecret, function(error, token){
                    if(error){
                        response.status(500).end()
                    }else{
                        response.setHeader("Location", "/" + user)
                        response.status(201).json({
                            accessToken: token,
                            user_info:user
                        })

                    }
                }) 
            }
        })

    })
    //logga in user
    router.post("/tokens", function(request,response){
        const knownUser = {
            grant_type: request.body.grant_type,
            userName: request.body.userName,
            userPassword: request.body.userPassword
        }

        if(knownUser.grant_type != "userPassword"){
            response.status(400).json({error: "incorrect-grant-type"})

        }

        accountManager.logInCredentials(knownUser, function (errors, user){
            if(errors.length > 0){
                response.status(400).json(errors)
            }else {
                const payload = {id: user}
                jwt.sign(payload, privateKey, function(error, token){
                    if(error){
                        response.status(500).end()
                    }else{
                        response.status(200).json({
                            accessToken: token,
                            user_info: user
                        })
                    }
                })
            }
        })
    })

    router.get("/adverts/:id", verifyToken, function(request,response){
        userId = request.params.id
 
        advertManager.getAdvertsByUserId(userId, function(errors, adverts){
            if(errors.length > 0){
                response.status(400).json(errors)
            }else {
                response.status(200).json(adverts)
                }
            
        })
    })

    router.post("/adverts", verifyToken, function(request, response){
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

    router.put("/adverts/:id", verifyToken, function(request,response){
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

    router.delete("/adverts/:id", verifyToken, function(request,response){
        advertId = request.params.id

        advertManager.deleteAdvertById(advertId, function(errors, adverts){
            if(errors.length > 0){
                response.status(400).json(errors)
            }else {
                response.status(200).json(adverts)
            }
        })
    })


    return router

}
