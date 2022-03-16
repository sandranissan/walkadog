const app = require("../presentation-layer/app")
const express = require('express')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

module.exports = function({ advertManager }) { //advert? account?
    const router = express.Router()

    router.use(function(request, response, next){
        console.log(request.method, request.url)
        next()
    })

    router.use(bodyParser.json())

    router.get("/", function(request, response){
        advertManager.getAllAdverts(function(errors, adverts){
            if(errors.length > 0){
                response.status(400).json(errors)
            } else {
                response.status(200).json(adverts)
            }

        })
    })

    

}