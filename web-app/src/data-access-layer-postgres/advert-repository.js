const { adverts } = require('./db.js')
const db = require('./db.js')
const { photos } = require('./sequelize-model.js')

module.exports = function createPostgresAdvertRepository() {

    return {

        getAllAdverts(callback) {
            db.adverts.findAll({
                order: [{
                    model: photos,
                    required: false
                }]
            })
                .then(allAdverts =>
                    callback([], allAdverts)
                ).catch(error =>
                    callback(['databaseError'], null)
                )
        },

        // deleteAdvertById(advertId,callback){
        //     db.adverts.destroy({

        //     })


        // },




        /* getAllAdverts(callback){  // funkar ovan samma som denna ??
             db.adverts.findAll({
                 raw: true,
                 attributes: [
                     "photos.nameOfFile",
                     "advertName",
                     "advertDescription",
                     "contact"
                 ],
                 include: [{
                     model: db.photos,
                     required: false
                 }]
             })
             .then(allAdverts, () => {
                 callback([], allAdverts)
             }).catch(error, () => {
                 callback(['databaseError'], null)
             })
         }, */



        createAdvert(newAdvert, callback) {
            const seqCreate = SequelizeModels.newAdvert.create({
                advertName: newAdvert.advertName,
                advertDescription: newAdvert.advertDescription,
                advertContact: newAdvert.advertContact
            }, {
                fields: [ // fields ???
                    'advertName',
                    'advertDescription',
                    'advertContact'
                ]
            })
            if (error) {
                callback(['database', null])
            }
            else {
                callback([], newAdvert)
            }
        }
    }

}

