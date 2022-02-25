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
    const values = [newAdvert.advertName, newAdvert.advertDescription, newAdvert.advertContact]

    console.log(values)

    db.query(query, values, function(error, newAdvert){
        if(error){
			callback(['databaseError'], null)
		}else{
			callback([], newAdvert)
		}
        console.log("db2")
    })


}