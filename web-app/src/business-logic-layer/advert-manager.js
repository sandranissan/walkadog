const advertRepository = require('../data-access-layer/advert-repository')
const advertValidator = require('./advert-validator')


exports.getAllAdverts = function(callback){
	advertRepository.getAllAdverts(callback)
}

exports.createAdvert = function(newAdvert, callback){
	advertValidator.getErrorsNewAdvert(newAdvert, callback)
}