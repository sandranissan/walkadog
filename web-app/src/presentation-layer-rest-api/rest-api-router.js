const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const privateSecret = "sandraAljona"



function validationsErrors() {

}


module.exports = function ({ accountManager, advertManager }) {

   //verifyToken middleware function
   function verifyToken(request, response, next) {
    //Get auth header value 
    const bearerHeader = request.headers['authorization']
    //Kollar om bearer är undefined
    if(typeof bearerHeader != 'undefined') {
        //Split at the space, the string looks like this "Bearer XXX" where XXX is the token
        const bearer = bearerHeader.split(' ')
        //hämta token ifrån split Arrayen, "Bearer" blir på [0], XXX på [1]
        const bearerToken = bearer[1]
        //Verify the token
        jwt.verify(bearerToken, privateSecret, function (error, authData) { // här skickas token och secretKey med och kollar så det stämmer.
            if(error) {
                response.sendStatus(403)
            } else {
                request.body.userInfo = authData 
                next()
            }
        })
    } else {
        // Forbidden 
        response.sendStatus(403)
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
    router.get("/adverts/:id", function(request,response){
        const user_id = request.params.id
        console.log(request.headers)
        advertManager.getAdvertsByUserId(user_id, function(error, adverts){
            if (error.length > 0) {
                response.status(400).json(error)
            } else {
                if (adverts) {
                    response.status(200).json(adverts)
                } else {
                    response.status(404).end()
                }
            }
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
    router.post("/signUp", function(request, response){
        const newUser = {
            userName: request.body.userName,
            userEmail: request.body.userEmail,
            userPassword: request.body.userPassword
        }

        accountManager.createAccount(newUser, function(errors, user){
            if(errors.length > 0){
                response.status(400).json(errors)
            } else {
                response.setHeader("Location", "/" + user)
                response.status(201).json("user was created")
            }
        })

    })
    //logga in user
    router.post("/login", function(request,response){
        const grant_type = request.body.grant_type
 
        if(grant_type == "userPassword") {

            const knownUser = {
                userName: request.body.userName,
                userPassword: request.body.userPassword
            }

            accountManager.logInCredentials(knownUser, function (errors, user){
                if(user){
                    const payload = {userId: user.userId, userName: user.userName, is_logged_in: true}
                    jwt.sign(payload, privateSecret, function(error, token){
                        if(error){
                            console.log(error)
                            response.status(401).json("Invalid client error")
                        }else{
                            response.status(200).json({
                                "access_token": token,
                                userId: user.userId
                                
                            })
                        }
                    })
                    
                }else {
                    response.status(401).json(errors)
                }
            })

        }else{
            response.status(400).json({ error: "unspported_grant_type"})

        }

        
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

    router.post("/createAdverts", verifyToken, function(request, response){
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
