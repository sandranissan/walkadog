module.exports = function createAdvert_repository() {
    const db = require('./db.js')

    return {
        getAllAdverts(callback) {

            const query = 'SELECT * FROM adverts JOIN photos ON photos.advert = adverts.advertId ORDER BY adverts.advertId DESC'
            const values = []

            db.query(query, values, function (error, adverts) {
                if (error) {
                    callback(['databaseError'], null)
                } else {
                    callback([], adverts)
                }
            })
        },



        getSpecificAdvert(advertId, callback) {
            const query = 'SELECT * FROM adverts JOIN photos ON adverts.advertId = photos.advert WHERE advertId = ?'
            const values = [advertId]

            db.query(query, values, function (error, specificAdvert) {
                console.log(specificAdvert)
                if (error) {
                    callback(['databaseError'], null)
                } else {
                    callback([], specificAdvert[0])
                }
            })

        },
        //andvänds i Rest Api
        getAdvertsByUserId(userId, callback){
            const query = 'SELECT * FROM adverts WHERE userId = ?'
            const value = [userId]

            db.query(query, value, function(error, userAdverts){
                if(error){
                    callback(['databaseError'], null)
                }else {
                    callback([],userAdverts)
                }
            })

        },
        //Används i rest Api
        createAdvert(newAdvert, callback) {

            const query = 'INSERT INTO adverts (advertName, advertDescription, contact, userId) VALUES (?,?,?,?)'
            const values = [newAdvert.advertName, newAdvert.advertDescription, newAdvert.advertContact, newAdvert.userId]
            const photoQuery = 'INSERT INTO photos (nameOfFile, advert, photoDescription) VALUES(?,?,?)'

            db.query(query, values, function (error, savedAdvert) {
                if (error) {
                    console.log("error i advert")
                    callback(['databaseError'], null)
                } else {
                    console.log(newAdvert)
                    const photoValues = [newAdvert.photoPath, savedAdvert.insertId, newAdvert.photoDescription]
                    db.query(photoQuery, photoValues, function (photoError, photoResult) {
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
        },

        UpdateAdvertById(advertId, updatedAdvert, callback){
            const query = 'UPDATE adverts SET advertName = ?, advertDescription = ?, contact = ? WHERE advertId = ?'
            const valueUpdatedAdvert = [updatedAdvert.advertName, updatedAdvert.advertDescription, updatedAdvert.contact, advertId]
            
            db.query(query,valueUpdatedAdvert, function(error, updatedAdvert){
                console.log(updatedAdvert)
                if(error){
                    callback(['databaseError'],null)
                }else {
                    callback([], updatedAdvert[0])
                }
            })

        },

        deleteAdvertById(advertId, callback){
            const query = ' DELETE FROM adverts WHERE advertId = ?'
            const value = [advertId]

            db.query(query,value, function(error, deletedAdvert){
                console.log(deletedAdvert)
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], deletedAdvert[0])
                }
            })

        },

       
    }
}
