const express = require('express')
const db = require('../../data-access-layer/db.js')
const advertManager = require('../../business-logic-layer/advert-manager')



const router = express.Router()
router.use(express.urlencoded({ extended: false }))

router.get('/', function (request, response) {
    advertManager.getAllAdverts(function (errors, adverts) {
        const model = {
            errors: errors,
            adverts: adverts
        }
        response.render("adverts.hbs", model)
    })
})

//hämtar inte informationen från adverts-createAdvert, utan lägger till en tom rad i databasen
router.get('/createAdvert', function (request, response) {

    const advertName = request.params.advertName
    const advertDescription = request.params.advertDescription
    const contact = request.params.contact
    const values = [advertName, advertDescription, contact]

    advertManager.createAdvert( values,function (errors, advert) {
        if (errors){
            const model = {
                errors: errors

            }
            response.render("adverts-createAdvert.hbs", model)

        }else{
            
            response.redirect("/")

        }



        
    })


})

module.exports = router