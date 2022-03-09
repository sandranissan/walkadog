const Sequelize = require("sequelize");

const sequelize = new Sequelize('postgres', 'aljonaSandra', 'abc123', {
    host: 'postgres-db',
    dialect: 'postgres'
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


db.users = require("./sequelize-model").users(sequelize, Sequelize)
db.adverts = require("./sequelize-model").adverts(sequelize, Sequelize)
db.photos = require("./sequelize-model").photos(sequelize, Sequelize)

//console.log(sequelize.module.adverts)

db.photos.belongsTo(db.adverts, {as: ''}) // FK

module.exports = db