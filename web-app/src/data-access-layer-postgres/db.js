const Sequelize = require("sequelize");

//ändrade inparametrarna till sequelize, så detta funkar nu.
const sequelize = new Sequelize('postgres://aljonaSandra:abc123@postgres-db:5432/postgres')

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


db.users = require("./sequelize-model").users(sequelize, Sequelize) // får tbx en tabell från seq.mod.
db.adverts = require("./sequelize-model").adverts(sequelize, Sequelize)
db.photos = require("./sequelize-model").photos(sequelize, Sequelize)

//console.log(sequelize.module.adverts)

db.photos.belongsTo(db.adverts, {foreignKey: 'advert_Id'}) // FK 'advertId'??
//db.adverts.belongsTo(db.users, {foreignKey: 'user_Id'}) //FK??? 'userId'
module.exports = db  