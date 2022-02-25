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
<<<<<<< HEAD
        advertContact: request.body.advertContact
    }
   // console.log(newAdvert)
    advertManager.createAdvert(newAdvert, function (errors, advert) {   // newAdvert' is declared but its value is never read. VARFÖR
       // console.log(newAdvert) 
=======
        advertContact: request.body.advertContact,
        photoDescription: request.body.photoDescription,
        photoPath: path
    }



    advertManager.createAdvert(newAdvert, function (errors, newAdvert) {
>>>>>>> f96438b880223aa7cef5e709f15e2b35d4898127

        if (0 < errors.length) {
            response.render("adverts-createAdvert.hbs")
        }
        else {
            //  photoManager.uploadPhoto(newPhoto)

        }

    })
})

module.exports = router


