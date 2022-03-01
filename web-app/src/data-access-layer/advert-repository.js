
module.exports = function createAdvert_repository() {
    const db = require('./db.js')

    return {
        getAllAdverts(callback) {

            const query = `SELECT * FROM adverts ORDER BY advertId DESC`
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

            //console.log(values)

            db.query(query, values, function (error, newAdvert) {
                if (error) {
                    console.log("error i advert")
                    callback(['databaseError'], null)
                } else {
                    const photoValues = [newAdvert.photoPath, results.insertId, newAdvert.photoDescription]
                    db.query(photoQuery, photoValues, function (photoError, photoResult) {
                        if (photoError) {
                            console.log(photoError)
                            callback(['databaseError'], null)

                        } else {
                            console.log("lade in foto")
                        }
                    })

                    callback([], results)
                }
                console.log("db2")
            })
        }

    }

}
