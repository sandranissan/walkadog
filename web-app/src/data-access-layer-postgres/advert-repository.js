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
                }
 
            })
                .then(allAdverts => {
                    callback([], allAdverts)
                }).catch((error) => {
                    console.log(error)
                    callback(['databaseError'], null)
                })
        },

        // deleteAdvertById(advertId,callback){
        //     db.adverts.destroy({

        //     })


        // },



        /* getAllAdverts(callback) {
 
             const query = 'SELECT * FROM adverts JOIN photos ON photos.advert = adverts.advertId ORDER BY adverts.advertId DESC'
             const values = []
 
             db.query(query, values, function (error, adverts) {
                 if (error) {
                     callback(['databaseError'], null)
                 } else {
                     callback([], adverts)
                 }
             })
         },*/

        createAdvert(newAdvert, callback) {
            db.adverts.create({
                advertName: newAdvert.advertName,
                advertDescription: newAdvert.advertDescription,
                contact: newAdvert.contact
            }, {
                fields: [ // fields ???
                    'advertName',
                    'advertDescription',
                    'contact'
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
                    console.log("hejhejhallåååååå")
                    callback(error, null)  
                })
            }).catch((error) => {
                console.log("hejhejhej")

            })

        },

        getSpecificAdvert(advertId, callback) {
            db.adverts.findAll({
                where: {
                    advertID: advertId
                },
                raw: true
            }).then(specificAdvert => {
                console.log("FUNKADE BRA")
                callback([], specificAdvert)
                console.log("FUNKADE BRA")
            }).catch((error) => {
                console.log("ERRRRROOOORRRRRR" + advertId)
                callback(error, [])
            })


        },




 



        /*getSpecificAdvert(advertId, callback) {
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
        */





    }

}

