const express = require('express')
const bodyParser = require('body-parser')
//const { accounts } = require("../data-access-layer-postgres/db")


module.exports = function({ accountManager }) { 
    const router = express.Router()

    router.use(bodyParser.json())
    router.use(bodyParser.urlencoded({
        extended: false
    }))

    router.use(function(request, response, next){
        console.log(request.method, request.url)
        next()
    })


    router.get("/", function(request, response){
        accountManager.getAllAccounts(function(errors, accounts){ 
            if(errors.length > 0){
                response.status(400).json(errors)
            } else {
                response.status(200).json(users)
            }

        })
    })



    router.get("/:id", function (request, response){
        const id = request.params.id

        accountManager.getAllAccounts(function(errors,users){
            if(errors.length>0){
                response.status(400).json(errors)
            } else {
                const user = users.find(a => a.userId == id )

                if(user){
                    response.status(200).json(user)

                } else {
                    response.status(404).end()
                }

            }
        })
    })


    // router.post("/logIn", function(request, response){
    //     const user = {
    //         userName: request.body.userName,
    //         userPassword: request.body.userPassword
    //     }

    //     // accountManager.logIn // punkt vaaadd?? finns inget i account-manager som heter typ getUserByUserName ?? lägga till de kanske?
    // })


    // router.post("/signUp", function(request, response){
    //     const newUser = {
    //         userName: request.body.userName,
    //         userPassword: request.body.userPassword,
    //         userEmail: request.body.userEmail
    //     }

    //     accountManager.createAccount(newUser, function(errors, user){
    //         if(errors.length > 0){
    //             response.status(400).json(errors)
    //         } else {
    //             response.setHeader("Location", "/" + user)
    //             response.status(201).json({
    //                 user
    //             })
    //         }
    //     })
         
    // })

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