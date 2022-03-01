const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const db = require('../data-access-layer/db.js')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const redis = require('redis')
const connectRedis = require('connect-redis')
const RedisStore = connectRedis(session)

module.exports = function createApp({ variousRouter, accountRouter, advertsRouter }) {

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

            app.listen(8080, function () {
                console.log("its up and running")
            })

        }
    }
}