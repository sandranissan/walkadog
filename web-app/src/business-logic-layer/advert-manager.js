

module.exports = function createAdvert_router({ advertRepository, advertValidator }) {

	return {

		getAllAdverts(callback){
			advertRepository.getAllAdverts(callback)
		},

		createAdvert(newAdvert, callback){
			advertValidator.getErrorsNewAdvert(newAdvert, callback)
		}

	}
}

