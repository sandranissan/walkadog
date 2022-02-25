const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const db = require('../data-access-layer/db.js')
const session = require("express-session")
const redis = require("redis")
const connectRedis = require("connect-redis")



const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')
const advertsRouter = require('./routers/adverts-router')




const app = express()

const RedisStore = connectRedis(session)

// 1 configure our redis
const redisClient = redis.createClient({
    port: 6379,
    host: 'localhost'
})


app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: "sandraAljona",
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false, 
        httpOnly: true,
        maxAge: 1000 * 60 * 30 // session max age in milliseconds (3 min)
    }
}))





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


app.listen(8080,function(){
    console.log("its up and running") 
})