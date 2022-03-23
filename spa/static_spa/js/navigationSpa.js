
document.addEventListener("DOMContentLoaded", function () {

    showPage(location.pathname)

    if (localStorage.accessToken && localStorage.userName) {
        userValidator = {
            accessToken: localStorage.accessToken,
            userName: localStorage.userName
        }
        login(userValidator)
    }
    else {
        logout()
    }

    document.body.addEventListener("click", function (event) {
        if (event.target.tagName == "a") {
            event.preventDefault()
            const url = event.target.getAttribute("href")
            goToPage(url)
        }
    })

})

window.addEventListener("popstate", function (event) {
    const url = location.pathname
    showPage(url)
})

function goToPage(url) {
    showPage(url)
    history.pushState({}, "", url)
}

function showPage(url) {
    const currentPageDiv = document.getElementsByClassName("current-page")[0]
    if (currentPageDiv) {
        currentPageDiv.classList.remove("curent-page")
    }

    if (url == "/") {
        document.getElementById("homePage").classList.add("current-page")
    }

    else if (url == "/adverts") {
        document.getElementById("advertsPage").classList.add("current-page")
        loadAllAdverts() //skapa funktion i restapiFetch
    }
    else if (url == "/createAdverts") {
        document.getElementById("createAdvertPage").classList.add("current-page")
    }
    else if (new RegExp("^/adverts/[0-9]+$").test(url)) {
        document.getElementById("advertPage").classList.add("current-page")
        const advertId = url.split("/")[2]
        loadAdvertById(advertId)
    }
    //testar så att det finns ett inlägg med det id:et
    else if (new RegExp("^/updateAdvert/[0-9]+$").test(url)) {
        document.getElementById("updateAdvertPage").classList.add("current-page")
        const advertId = url.split("/")[2]
        loadAdvertById(advertId)
    }
    else if (new RegExp("^/deleteActivity/[0-9]+$").test(url)) {
        const advertId = url.split("/")[2]
        deleteAdvert(advertId)
    }
    else if (url == "/signUp") {
        document.getElementById("signUpPage").classList.add("current-page")
    }
    else if (url == "/login") {
        document.getElementById("loginPage").classList.add("current-page")
    }
    else if (url == "/logout") {
        logout()
    }
    else if (url == "/error/400") {
        document.getElementById("error400Page").classList.add("current-page")
    }
    else if (url == "/error/401") {
        document.getElementById("error401Page").classList.add("current-page")
    }
    else if (url == "/error/500") {
        document.getElementById("error500Page").classList.add("current-page")
    }
    else {
        document.getElementById("error404Page").classList.add("current-page")
    }
}
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
            console.log(error)
            window.location.replace("/error/500")
        })

    })



})


function login(userValidator) {
    localStorage.accessToken = userValidator.accessToken
    localStorage.userName = userValidator.userName
    document.body.classList.remove("isLoggedOut")
    document.body.classList.add("isLoggedIn")
}

function logout() {
    localStorage.accessToken = ""
    localStorage.userName = ""
    document.body.classList.remove("isLoggedIn")
    document.body.classList.add("isLoggedOut")
}

