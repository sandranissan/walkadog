const db = require('./db.js')

return {

    getAllAdverts(callback){

    },

    createAdvert(newAdvert, callback){
        const seqCreate = db.newAdvert.create({
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
        if(error){
            callback(['database', null])
        }
        else {
            callback([], newAdvert)
        }
    }
}

