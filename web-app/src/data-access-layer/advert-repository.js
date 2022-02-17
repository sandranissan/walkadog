const db = require('./db.js')

exports.getAllAdverts = function (callback) {

    const query = `SELECT * FROM adverts ORDER BY advertId DESC`
    const values = []

    db.query(query, values, function (error, adverts) {
        if (error) {
            callback(['databaseError'], null)
        } else {
            callback([], adverts)
        }
    })

}

exports.createAdvert = function(advert, callback){

    const query = `INSERT INTO adverts (advertName, advertDescription, contact) VALUES (?,?,?)`
    const values = [advert.advertName, advert.advertDescription, advert.contact]

    db.query(query, values, function(error, results){
        if(error){
			// TODO: Look for usernameUnique violation.
			callback(['databaseError'], null)
		}else{
			callback([], results.insertId)
		}

    })

}