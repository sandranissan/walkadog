  

module.exports = function createAdvert_router({ advertRepository, advertValidator }) {

	return {

		getAllAdverts(callback){
			advertRepository.getAllAdverts(callback)
		},

		getSpecificAdvert(advertId, callback){
			advertRepository.getSpecificAdvert(advertId, callback)
		},

		createAdvert(newAdvert, callback){
			advertValidator.getErrorsNewAdvert(newAdvert, callback)
		},

		UpdateAdvertById(advertId, updatedAdvert, callback){
			advertRepository.UpdateAdvertById(advertId,updatedAdvert,callback)
		},
		deleteAdvertById(advertId, callback){
			advertRepository.deleteAdvertById(advertId,callback)
		},
		getAdvertsByUserId(userId, callback){
			advertRepository.getAdvertsByUserId(userId, callback)
		},
		getAdvertById(advertId, callback){
			advertRepository.getAdvertById(advertId, callback)
		}



	}
}

