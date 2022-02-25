const express = require('express')
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


router.get('/createAdvert', function (request, response) {

    response.render('adverts-createAdvert.hbs')
})


router.post('/createAdvert', function (request, response) {

    const newAdvert = {
        advertName: request.body.advertName,
        advertDescription: request.body.advertDescription,
        advertContact: request.body.advertContact
    }
   // console.log(newAdvert)
    advertManager.createAdvert(newAdvert, function (errors, advert) {   // newAdvert' is declared but its value is never read. VARFÖR
       // console.log(newAdvert) 

        if (0 < errors.length) {
            // console.log(errors)
            response.render("adverts-createAdvert.hbs")
         }
         else {
            // console.log(user)
             response.redirect("/adverts")
 
         }
         
       // if (errors) {
        //    const model = {
        //        errors: errors
        //    }
        //    response.render("adverts-createAdvert.hbs", model)
       // } else {
        //    response.redirect("/")
      //  }
    })
})

module.exports = router