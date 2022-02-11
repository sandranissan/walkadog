const express = require('express')

const router = express.Router()


router.get('/', function (request, response) {

    response.render('logIn.hbs')
})

router.get('/signUp', function (request, response) {

    response.render('signUp.hbs')
})



module.exports = router