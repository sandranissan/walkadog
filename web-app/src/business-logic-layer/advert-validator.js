const advertRepository = require('../data-access-layer/advert-repository')
const MIN_TITLE_LENGTH = 3
const MAX_TITLE_LENGTH = 10

const MIN_DESC_LENGTH = 3
const MAX_DESC_LENGTH = 10

const MIN_CONTACT_LENGTH = 3
const MAX_CONTACT_LENGTH = 10

exports.getErrorsNewAdvert = function (newAdvert, callback) {

    const errors = []

    if (!newAdvert.hasOwnProperty("username")) { // ??
        errors.push("usernameMissing")
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
    advertRepository.createAdvert(newAdvert, function(errors, newAdvert){

        if(errors.length > 0) {

        }
        else {
            callback(errors, newAdvert)

        }

    })
}

//göra fler 