module.exports = function createAdvert_repository() {
    const db = require('./db.js')

    return {
        getAllAdverts(callback) {

            const query = `SELECT * FROM adverts  JOIN photos ON photos.advert = adverts.advertId ORDER BY adverts.advertId DESC`
            const values = []

            db.query(query, values, function (error, adverts) {
                if (error) {
                    callback(['databaseError'], null)
                } else {
                    callback([], adverts)
                }
            })
        },

        createAdvert(newAdvert, callback) {

            const query = `INSERT INTO adverts (advertName, advertDescription, contact) VALUES (?,?,?)`
            const values = [newAdvert.advertName, newAdvert.advertDescription, newAdvert.advertContact]
            const photoQuery = 'INSERT INTO photos (nameOfFile, advert, photoDescription) VALUES(?,?,?) '
            //console.log(values)

            db.query(query, values, function (error, savedAdvert) {
                if (error) {
                    console.log("error i advert")
                    callback(['databaseError'], null)
                } else {
                    console.log(newAdvert)
                    const photoValues = [newAdvert.photoPath, savedAdvert.insertId, newAdvert.photoDescription]
                    db.query( photoQuery, photoValues, function (photoError, photoResult) {
                        if (photoError) {
                            console.log(photoError)
                            callback(['databaseError'], null)

                        } else {

                            console.log("lade in foto")
                            callback([], photoResult)
                        }
                    })       
                }
            })
        }
    }
}
