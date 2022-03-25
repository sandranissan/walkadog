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


        

        deleteAdvertById(advertId, callback) {
            try {
            db.adverts.destroy({
                where: {
                    advert_Id : advertId
                }   
            })
            callback([])
            } catch(error){
                callback(error,null)
            }
        },


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

            })

        },

        getSpecificAdvert(photoId, callback) {
            console.log("--------.....---------.....-----------")
            console.log(photoId)
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
                console.log("---------------")
                specificAdvert.advertName = specificAdvert.advert["advertName"]
                specificAdvert.advertDescription = specificAdvert.advert["advertDescription"]
                specificAdvert.contact = specificAdvert.advert["contact"]
                console.log(specificAdvert)
                callback([], specificAdvert)
            }).catch((error) => {
                callback(error, [])
            })
        },



     //   getSpecificAdvert(advertId, callback) {
      //      const query = 'SELECT * FROM adverts JOIN photos ON adverts.advertId = photos.advert WHERE advertId = ?'
      //      const values = [advertId]

        //    db.query(query, values, function (error, specificAdvert) {
          //      console.log(specificAdvert)
            //    if (error) {
           //         callback(['databaseError'], null)
            //    } else {
             //       callback([], specificAdvert[0])
            //    }
         //   })
      //  }
    }
}

