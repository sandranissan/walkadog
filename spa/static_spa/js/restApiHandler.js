const restApi = "http://localhost:8080/rest/"
document.addEventListener("DOMContentLoaded", function(){

    const signUpForm = document.getElementById("signUpPage")

    signUpForm.addEventListener("submit", function(event){
        event.preventDefault()

        const userName = document.querySelector("signInPage .userName").value
        const userEmail = document.querySelector("signInPage .email").value
        const userPassword = document.querySelector("signInPage .password").value

        const newAccount = {
            userName,
            userEmail,
            userPassword,
            userName: (localStorage.userName ? localStorage.userName : null)
        }

        fetch(
            
        )


    })





})