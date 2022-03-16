function users(sequelize, DataTypes){  // funk  skapa tabell users, kör sync för att synca till db, retunerar sedan tabllen till db.js 
    const users = sequelize.define('users', {
        userId: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },

        userName: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        userEmail: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        userPassword: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        isAdmin: {
            type: DataTypes.BOOLEAN 
        },

    })

    sequelize.sync()
   return users
}


function adverts(sequelize, DataTypes){
    const adverts = sequelize.define('adverts' , {
        advertId: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true

        },

        advertName: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        advertDescription: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        contact: {
            type: DataTypes.TEXT, // kan vara INT också
            allowNull: false
        },


    })
    sequelize.sync()
    return adverts
}

function photos(sequelize, DataTypes){
    const photos = sequelize.define('photo', {
        photoId: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true

        },

        nameOfFile: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        photoDescription: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    })
    sequelize.sync()
    return photos
}

module.exports = {users,adverts,photos} //  <- funk inte vari.