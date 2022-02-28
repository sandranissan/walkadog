const express = require('express')
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

    response.render('adverts-createAdvert.hbs')
})


router.post('/createAdvert', function (request, response) {
    const photoObject = request.files.photo
    const photoName = photoObject.name

    const path = `/web-app/src/static/uploads/${photoName}`

    console.log(__dirname)

    photoObject.mv(path , function (err) {
        if (err) {
            console.log("fel i mv")
        }
    })

    console.log(photoObject)

    const newAdvert = {
        advertName: request.body.advertName,
        advertDescription: request.body.advertDescription,
        advertContact: request.body.advertContact
    }
   // console.log(newAdvert)
    advertManager.createAdvert(newAdvert, function (errors, advert) {   // newAdvert' is declared but its value is never read. VARFÖR
       // console.log(newAdvert) 

        if (0 < errors.length) {
            response.render("adverts-createAdvert.hbs")
        }
        else {
            //  photoManager.uploadPhoto(newPhoto)

        }

    })
})

router.get('/specificAdvert', function(request, response){
    response.render('specificAdvert.hbs')
})

module.exports = router


