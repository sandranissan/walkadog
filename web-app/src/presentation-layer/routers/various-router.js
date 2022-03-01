const express = require('express')

module.exports = function createVarious_router() {

	const router = express.Router()

	router.get('/', function (request, response) {
		response.render('start.hbs')
	})

	return router
}
