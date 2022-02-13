
const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')

const router = express.Router()

router.get('/', function (request, response) {
    accountManager.getAllAccounts(function(errors, users){
		const model = {
			errors: errors,
			users: users
		}
		response.render("logIn.hbs", model)
	})

})

router.get('/signUp', function (request, response) {

    response.render('signUp.hbs')
})


module.exports = router