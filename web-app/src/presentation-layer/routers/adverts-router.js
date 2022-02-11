const express = require('express')
const db = require('../../data-access-layer/db.js')
const advertManager = require('../../business-logic-layer/advert-manager')



const router = express.Router()

router.get('/', function (request, response) {
    advertManager.getAllAdverts(function (errors, adverts) {
        const model = {
            errors: errors,
            adverts: adverts
        }
        response.render("adverts.hbs", model)
    })
})
router.get('/createAdvert', function (request, response) {

    response.render("adverts-createAdvert.hbs")


})

module.exports = router