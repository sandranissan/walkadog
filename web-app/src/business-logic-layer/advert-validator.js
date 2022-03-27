
const MIN_TITLE_LENGTH = 3
const MAX_TITLE_LENGTH = 20

const MIN_DESC_LENGTH = 3
const MAX_DESC_LENGTH = 10

const MIN_CONTACT_LENGTH = 3
const MAX_CONTACT_LENGTH = 10



module.exports = function createAdvert_router({ advertRepository }) {

    return {

        getErrorsNewAdvert(newAdvert, callback) {

            const errors = []
            console.log("*************")
            console.log(newAdvert)
        
            if (!newAdvert.hasOwnProperty("advertName")) { // ??
                errors.push("advertNameMissing")
               // console.log("vali")
            }
            if (newAdvert.advertName.length < MIN_TITLE_LENGTH) {
                errors.push("TitleTooShort")
            }
            if (MAX_TITLE_LENGTH < newAdvert.advertName.length) {
                errors.push("TitleTooLong")
            }
 
            if(errors.length > 0){
                callback( errors, [])
            }
            advertRepository.createAdvert(newAdvert, function(errors, createdAdvert){
                if(errors.length > 0) {
                    console.log(errors)
                    callback([errors], null)
                }
                else {
                    console.log("callback i advertValidator")
                    callback([], createdAdvert)
        
                }
        
            })
        }

    }

}

//göra fler 