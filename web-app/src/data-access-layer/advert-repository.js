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

