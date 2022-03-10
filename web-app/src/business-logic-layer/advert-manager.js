

module.exports = function createAdvert_router({ advertRepository, advertValidator, advertRepositoryPostgres }) {

	return {

		getAllAdverts(callback){
			advertRepository.getAllAdverts(callback)
		},

		getSpecificAdvert(advertId, callback){
			advertRepository.getSpecificAdvert(advertId, callback)
		},

		createAdvert(newAdvert, callback){
			advertValidator.getErrorsNewAdvert(newAdvert, callback)
		}

	}
}

