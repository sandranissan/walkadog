const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const db = require('../data-access-layer/db.js')

const app = express()


app.use(express.static(__dirname + '/public'))

app.engine('hbs', expressHandlebars.engine({
defaultLayout: 'main.hbs',
layoutsDir: path.join(__dirname, "./layouts")
}))

app.set('views', path.join(__dirname, "./views"))



app.get('/', function(request, response){
    response.render('start.hbs')


})

app.get('/logIn', function (request, response) {

    response.render('logIn.hbs')
})

app.get('/signUp', function (request, response) {

    response.render('signUp.hbs')
})

app.get('/adverts', function (request, response) {

    response.render('adverts.hbs')
})

app.get('/messeges', function (request, response) {

    response.render('messeges.hbs')
})

app.get('/adverts', function (request, response) {

    response.render('messeges.hbs')
})


app.listen(8080,function(){
    console.log("its up and running") 
})