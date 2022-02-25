const express = require('express')
//const bcrypt = require("bcrypt")
const accountManager = require('../../business-logic-layer/account-manager')


//const saltRounds= 10
//const session = require("express-session");


const router = express.Router()
router.use(express.urlencoded({ extended: false }))

// router.use(
//     session({
//       key: "userId",
//       secret: "sandraAljona",
//       resave: false,
//       saveUninitialized: false,
//       cookie: {
//         expires: 60 * 60 * 24,
//       },
//     })
//   );



router.get('/', function (request, response) {
    accountManager.getAllAccounts(function (errors, users) {
        const model = {
            errors: errors,
            users: users
        }
        response.render("logIn.hbs", model)
    })
   
        
    })


router.post('/', function(request,response){

    const userName= request.body.username
    const userPassword = request.body.userPassword

    accountManager.logInAccountByUsername(userName,userPassword, function(errors, user){

        if(errors){
            response.send({ errors: errors });
        }

        if(user.length >0){
            //bcrypt.compare(userPassword, user[0].userPassword, (error, response) => {
                if (response){
                    request.session.knownUser = user;
                    console.log(request.session.knownUser);
    
                    response.redirect("/adverts")
                }else{
                    //validate
                    console.log( "Wrong username/password combination!");
    
                }
    
           // });

        }else {
            console.log( "User doesn't exist" );

        }
        
    })
    
})

router.get('/signUp', function (request, response) {

    response.render('signUp.hbs')
})

router.post('/signUp', function (request, response) {
 
    const newUser = {
        userName: request.body.username,
        userEmail: request.body.userEmail,
        userPassword: request.body.userPassword
    }


        accountManager.createAccount(newUser, function (errors, user) {
            //console.log(user)
    
            if (0 < errors.length) {
               // console.log(errors)
            }
            else {
               // console.log(user)
                response.redirect("/adverts")
    
            }
        })

})

module.exports = router

// (rouyer - presentioson) - bhussinsn logic - data access 

