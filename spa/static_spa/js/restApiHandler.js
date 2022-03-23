

const restApi = "http://localhost:8080/rest/"
document.addEventListener("DOMContentLoaded", function(){

    const signUpForm = document.getElementById("signUpPage")

    signUpForm.addEventListener("submit", function(event){
        event.preventDefault()

        const userName = document.getElementById("signUp_username").value
        const userEmail = document.getElementById("signUp_email").value
        const userPassword = document.getElementById("signUp_password").value

        const newUser = {
            userName,
            userEmail,
            userPassword,
            userName: (localStorage.userName ? localStorage.userName : null)
        }

        fetch(
            "http://localhost:8080/rest/signUp",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser)
            }
        ).then(response=>{
            if(response.status == 201){
                return response.json()
            }else{
                window.location.replace("/error"+ response.status)
            }
        })
        .then(body=>{
            login(body)
            window.location.replace("/")
        })
        .catch(error =>{
            console.log()
            console.log(error)
            window.location.replace("/error/500")
        })

    })



})

function loadAllAdverts(){

}
//används för både att hämta en advert, samt uppdatera den
function loadAdvertById(advertId){

}

function deleteAdvert(advertId){

}
