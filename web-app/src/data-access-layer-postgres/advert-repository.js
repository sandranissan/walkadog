const { response } = require('express')
const { adverts } = require('./db.js')
const db = require('./db.js')
const { photos } = require('./sequelize-model.js')

module.exports = function createPostgresAdvertRepository() {

    const Op = db.Sequelize.Op
    return {
        getAllAdverts(callback) {
            console.log("hämtar alla adverts")
            db.photos.findAll({
                where: {
                    advert_Id: { [Op.not]: null }
                },
                include: {
                    model: db.adverts,
                    as: 'advert',
                    required: false
                },
                raw: true,
                nest: true
            })
                .then(allAdverts => {
                    console.log(allAdverts)
                    callback([], allAdverts)
                }).catch((error) => {
                    console.log(error)
                    callback(['databaseError'], null)
                })
        },  
        getAdvertById(advertId, callback) {
            console.log("hämtar advert från id")
            db.adverts.findAll({
                where: {
                    advertId: advertId
                },
                raw: true
            }).then(advert => {
                console.log("---------------")
                console.log("hihihihohohoho ")
                console.log(advert)
                callback([], advert[0])
            }).catch((error) => {
                console.log(error)
                callback(['databaseError'], null)
            })
        },
        getAdvertsByUserId(userId, callback) {
            console.log("hämtar advert från id aaaaaaa")
            db.adverts.findAll({
                where: {
                    user_Id: userId
                },
                include: {
                    model: db.users,
                    as: 'user',
                    required: false
                },
                raw: true,
                nest: true
            })
                .then(adverts => {
                    console.log("userId")
                    console.log(adverts)
                    callback([], adverts)
                }).catch((error) => {
                    console.log(error)
                    callback([error], null)
                })
        },


        deleteAdvertById(advertId, callback) {
            console.log("innanför DELETE")
            db.adverts.destroy({
                where: {
                    advertId: advertId
                }, include: {
                    model: db.photos,
                    as: 'photo',
                    required: false
                },
                
                nest: true
            })
                .then(results => {
                    console.log("tror de gick bra")
                    callback([], results)
                })
                .catch((error) => {
                    console.log("tror de gick dåligt")
                    callback(["databaseError"], null)
                })
        },

        UpdateAdvertById(advertId, updatedAdvert, callback) {
            db.adverts.update({
                advertName: updatedAdvert.advertName,
                advertDescription: updatedAdvert.advertDescription,
                contact: updatedAdvert.contact,
            },{ 
                where: { advertId: advertId },
            },
            ).then(updatedAdvert =>
                callback([], updatedAdvert)
            ).catch((err) => {
                console.log(err),
                    console.log("error when updating advert with advertId " + advertId),
                    callback([err], null)
            })
        },


        createAdvert(newAdvert, callback) {
            db.adverts.create({
                advertName: newAdvert.advertName,
                advertDescription: newAdvert.advertDescription,
                contact: newAdvert.advertContact,
                user_Id: newAdvert.userId
            }, {
                fields: [ // fields ???
                    'advertName',
                    'advertDescription',
                    'contact', 
                    'user_Id'
                ],
            }).then(createdAdvert => {
                console.log("den skapades!")
                console.log(createdAdvert)
                db.photos.create({
                    nameOfFile: newAdvert.photoPath,
                    advert_Id: createdAdvert.dataValues.advertId,
                    photoDescription: newAdvert.photoDescription
 

                }).then(newPhoto => {
                    console.log("--------------")
                    console.log(newPhoto.dataValues)
                    const model = {
                        hej: createdAdvert.dataValues,
                        hejdo: newPhoto.dataValues
                    }
                    console.log(model)
                    callback([], model)

                }).catch((error) => {
                    console.log(error)
                    callback(error, null)
                })
            }).catch((error) => {

            })

        },


        getSpecificAdvert(photoId, callback) {
            // deleteAdvertById()
            console.log("tagit bort ?????")
            db.photos.findAll({
                where: {
                    photoId: photoId
                },
                include: {
                    model: db.adverts,
                    as: 'advert',

                },
                raw: true,
                nest: true
            }).then(specificAdvert => {
                specificAdvert = specificAdvert[0]
                specificAdvert.advertName = specificAdvert.advert["advertName"]
                specificAdvert.advertDescription = specificAdvert.advert["advertDescription"]
                specificAdvert.contact = specificAdvert.advert["contact"]
                console.log(specificAdvert)
                callback([], specificAdvert)
            }).catch((error) => {
                callback(error, [])
            })
        },
    }
}

//query????
//fel namn??
//user_id??
//ordningen på callback

//(length>0)-> []
//(error)-> null