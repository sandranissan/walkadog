const express = require('express')
const staticPath = require("path").resolve(__dirname, '..')


module.exports = function createAdvert_router({ advertManager }) {

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

        const path = `${staticPath}/public/uploads/${photoName}`
        

        console.log(__dirname)

        photoObject.mv(path, function (err) {
            if (err) {
                console.log("fel i mv")
            }
        })

        console.log(photoObject)

        const newAdvert = {
            advertName: request.body.advertName,
            advertDescription: request.body.advertDescription,
            advertContact: request.body.advertContact,
            photoDescription : request.body.photoDescription,
            photoPath : photoName
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

    router.get('/specificAdvert', function (request, response) {
        response.render('specificAdvert.hbs')
    })

    return router
}




