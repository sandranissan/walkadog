const advertRepository = require('../data-access-layer/advert-repository')


exports.getAllAdverts = function(callback){
	advertRepository.getAllAdverts(callback)
}

exports.createAdvert = function(advert, callback){
	advertRepository.createAdvert(advert, callback)
}