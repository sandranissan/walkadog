

module.exports = function createAdvert_router({ advertRepository, advertValidator, advertRepositoryPostgres }) {

	return {

		getAllAdverts(callback){
			advertRepository.getAllAdverts(callback)
		},

		createAdvert(newAdvert, callback){
			advertValidator.getErrorsNewAdvert(newAdvert, callback)
		}

	}
}

