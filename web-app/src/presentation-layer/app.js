const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const db = require('../data-access-layer/db.js')

const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')
const advertsRouter = require('./routers/adverts-router')

const app = express()


app.use(express.static(__dirname + '/public'))

app.engine('hbs', expressHandlebars.engine({
defaultLayout: 'main.hbs',
layoutsDir: path.join(__dirname, "./layouts")
}))

app.set('views', path.join(__dirname, "./views"))



app.use('/', variousRouter)
app.use('/logIn', accountRouter)

app.use('/adverts', advertsRouter )


app.listen(8080,function(){
    console.log("its up and running") 
})