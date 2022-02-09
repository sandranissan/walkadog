const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const db = require('../data-access-layer/db.js')

const app = express()


app.use(express.static(__dirname + '/public'))

app.engine('hbs', expressHandlebars.engine({
defaultLayout: 'main.hbs'
}))

app.set('views', path.join(__dirname, "./views"))

app.get('/', function(request, response){
    response.render('start.hbs')

    db.query("SELECT * FROM humans", function(error, humans){
        if(error){
            console.log(error)

        }else{
            console.log("Got humans:")
            for(const human of humans)
            console.log(human.name)
        }
 })
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