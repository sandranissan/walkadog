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

exports.createAdvert = function(newAdvert, callback){

    const query = `INSERT INTO adverts (advertName, advertDescription, contact) VALUES (?,?,?)`
    const values = [newAdvert.advertName, newAdvert.advertDescription, newAdvert.contact]

    console.log(values)

    db.query(query, values, function(error, results){
        if(error){
			callback(['databaseError'], null)
		}else{
			callback([], newAdvert)
		}

    })

}