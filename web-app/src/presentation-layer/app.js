const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const redis = require('redis')
const connectRedis = require('connect-redis')
const RedisStore = connectRedis(session)
const db = require('../data-access-layer-postgres/db')



module.exports = function createApp({ variousRouter, accountRouter, advertsRouter, restApi }) {

    return {
        start() {
            const app = express()

            const redisClient = redis.createClient({
                host: 'session-redis',
                port: 6379,
                ttl: 60 * 60 * 10
            })

            redisClient.on('error', function (err) {
                console.log('Could not establish a connection with redis. ' + err);
            });
            redisClient.on('connect', function (err) {
                console.log('Connected to redis successfully');
            });

            app.use(session({
                secret: 'sandraAljona',
                store: new RedisStore({ client: redisClient }),
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: false, //if true only transmitt cookie over https
                    httpOnly: false,
                    maxAge: 1000 * 60 * 10 //session max age in milliseconds
                }
            }))

            app.use(function (request, response, next) {
                response.locals.isLoggedIn = request.session.isLoggedIn
                response.locals.isAdmin = request.session.isAdmin
                response.locals.userId = request.session.userId
                response.locals.userName = request.session.userName
                next()
            })

            app.use(fileUpload());
            app.use(express.static(__dirname + '/public'))

            app.use(express.urlencoded({
                extended: false
            }))

            app.engine('hbs', expressHandlebars.engine({
                defaultLayout: 'main.hbs',
                layoutsDir: path.join(__dirname, "./layouts")
            }))

            app.set('views', path.join(__dirname, "./views"))

            app.use('/', variousRouter)
            app.use('/logIn', accountRouter)
            app.use('/adverts', advertsRouter)
            app.use('/rest', restApi)

            app.listen(8080, function () {
                console.log("its up and running")
            })

        }
    }
}


// const anchors = document.querySelectorAll('a')

// for(const anchor of anchors){
//     anchor.addEventListener('click', function(event){
//         event.preventDefault()

//         const url = anchor.getAttribute('href')
//         history.pushState(null, "", url)

//         hideCurrentPage()
//         showPage(url)
//     })
// }

// showPage(location.pathname)
 
// })

// window.addEventListener("popstate", function () {

// hideCurrentPage()
// showPage(location.pathname)
// })

// function hideCurrentPage(){
// document.querySelector('.current-page').classList.remove('current-page')
// }


// function showPage(url) {

// let nextPageId

// switch (url) {

//     case '/':
//         nextPageId = 'homePage'
//         break;
//     case '/adverts':
//         nextPageId = 'advertPage'
//         loadAdvertsPage()
//         break;
//     // case '/myAdverts':
//     //     nextPageId = 'myAdvertsPage'
//     //     break;

//     case '/createAdverts':
//         nextPageId = 'createAdvertPage'
        
//         break;

//     case '/signIn':
//         nextPageId = 'signInPage'
//         break;

//     case '/login':
//         nextPageId = 'loginPage'
//         break;

//     case '/createAdverts':
//         nextPageId = 'createAdvertPage'
//         break;

//     case '/logout':
//         logout()
//         break;

//     case '/error/400':
//         nextPageId = 'error400Page'
//         break;

//     case '/error/401':
//         nextPageId = 'error401Page'
//         break;

//     case '/error/500':
//         nextPageId = 'error500Page'
//         break;

//     case '/createAdverts':
//         nextPageId = 'createAdvertPage'
//         break;

//     default:
//         if(url.startsWith("/adverts/")){
//             const [empty, adverts, id] = url.split("/")
//             nextPageId = 'myAdvertsPage'
//             loadMyAdvertpage(id)
//         }
//         break;
// }

// document.getElementById(nextPageId).classList.add('current-page')

// const { adverts } = require('./db.js')
// const db = require('./db.js')
// const { photos } = require('./sequelize-model.js')

// module.exports = function createPostgresAdvertRepository() {

//     const Op = db.Sequelize.Op
//     return {

//         getAllAdverts(callback) {
//             console.log("hämtar alla adverts")
//             db.photos.findAll({
//                 where: {
//                     advert_Id: { [Op.not]: null }
//                 },
//                 include: {
//                     model: db.adverts,
//                     as: 'advert',
//                     required: false
//                 }

//             })
//                 .then(allAdverts => {
//                     callback([], allAdverts)
//                 }).catch((error) => {
//                     console.log(error)
//                     callback(['databaseError'], null)
//                 })
//         },

//         // deleteAdvertById(advertId,callback){
//         //     db.adverts.destroy({

//         //     })


//         // },



//         /* getAllAdverts(callback) {
 
//              const query = 'SELECT * FROM adverts JOIN photos ON photos.advert = adverts.advertId ORDER BY adverts.advertId DESC'
//              const values = []
 
//              db.query(query, values, function (error, adverts) {
//                  if (error) {
//                      callback(['databaseError'], null)
//                  } else {
//                      callback([], adverts)
//                  }
//              })
//          },*/

//         createAdvert(newAdvert, callback) {
//             const seqCreate = SequelizeModels.newAdvert.create({
//                 advertName: newAdvert.advertName,
//                 advertDescription: newAdvert.advertDescription,
//                 contact: newAdvert.contact
//             }, {
//                 fields: [ // fields ???
//                     'advertName',
//                     'advertDescription',
//                     'contact'
//                 ],
//             }).then(createdAdvert => {
//                 console.log("den skapades!")
//                 console.log(createdAdvert)
//                 db.photos.create({
//                     nameOfFile: newAdvert.photoPath,
//                     advert_Id: createdAdvert.dataValues.advertId,
//                     photoDescription: newAdvert.photoDescription


//                 }).then(newPhoto => {
//                     console.log("--------------")
//                     console.log(newPhoto.dataValues)
//                     const model = {
//                         hej: createdAdvert.dataValues,
//                         hejdo: newPhoto.dataValues
//                     }
//                     console.log(model)
//                     callback([], model)

//                 }).catch((error) => {
//                     console.log(error)
//                     callback(error, null)
//                 })


//             }).catch((error) => {
//                 callback(error)

//             })

//         },

//         getSpecificAdvert(advertId, callback) {
//             db.adverts.findAll({
//                 where: {
//                     advertID: advertId
//                 },
//                 raw: true
//             }).then(specificAdvert => {
//                 console.log("FUNKADE BRA")
//                 callback([], specificAdvert)
//                 console.log("FUNKADE BRA")
//             }).catch((error) => {
//                 console.log("ERRRRROOOORRRRRR" + advertId)
//                 callback(error, [])
//             })


//         },








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





    //}

//}
