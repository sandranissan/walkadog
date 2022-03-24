const restApi = "http://localhost:8080/rest/"

let accessToken = ""
let userId = ""
let isLoggedIn = false

document.addEventListener('DOMContentLoaded', function () {

	const anchors = document.querySelectorAll('a')

	for (const anchor of anchors) {

		anchor.addEventListener('click', function (event) {
			event.preventDefault()

			const url = anchor.getAttribute('href')

			history.pushState(null, "", url)

			hideCurrentPage()
			updateNav(isLoggedIn)
			showPage(url)
		})
	}

	showPage(location.pathname)

})

window.addEventListener('popstate', function () {

	hideCurrentPage()
    console.log("pop")
	updateNav(isLoggedIn)
	showPage(location.pathname)

})

function hideCurrentPage() {
	document.querySelector('.current-page').classList.remove('current-page')
}

function showPage(url){
    let nextPageId

    switch(url) {

        case '/':
            nextPageId = 'home-Page'
            break
        
        case '/login':
            nextPageId = 'login-page'

            const loginForm =  document.getElementById("logInform")
            loginForm.addEventListener('submit', function(event){
                event.preventDefault()

                const userName = document.getElementById("login_username").value
                const userPassword = document.getElementById("login_password").value
                console.log("USERNAME:"+userName,"PASSWORD"+userPassword)
                loginForm(userName,userPassword)
            })
            break
        
        case '/logout':
            nextPageId = 'home-Page'
            logout()
            break

        case '/signUp':
            nextPageId = 'sign-up-page'

            const signUpForm = document.getElementById("signUpForm")
            signUpForm.addEventListener("submit", function(event){
                const signUpUserName = document.getElementById("signUp_username").value
                const signUpEmail = document.getElementById("signUp_email").value
                const signUpPassword = document.getElementById("signUp_password").value
                const newUser = {
                    userName: signUpUserName,
                    userEmail: signUpEmail,
                    userPassword: signUpPassword
                }
                console.log(newUser)
                createNewUser(newUser) 
            })
            break

        case '/createAdvert':
            nextPageId = 'create-advert-page'

            const createAdvertForm = document.getElementById("createAdvertForm")
            createAdvertForm.addEventListener("submit", function(event){
                event.preventDefault()

                const createAdvertName = document.getElementById("advert_create_name").value
                const createAdvertDescription = document.getElementById("advert_create_description").value
                const createAdvertContact = document.getElementById("advert_create_contact").value
                const newAdvert = {
                    advertName: createAdvertName,
                    advertDescription: createAdvertDescription,
                    advertContact: createAdvertContact,
        
                }
                console.log("*****************")
                console.log(newAdvert)
                createAdvert(newAdvert)
                
            })
            break
        
        default:
            if(url.startsWith("/adverts/")){
                const [empty, advert, userId] = url.split("/")
                nextPageId = 'my-adverts-page'
                fetchAdvertsPage(userId)
            }
            else if(url.startsWith("/advert/")){
                const[empty,advert,id] = url.split("/")
                nextPageId = 'advert-Page'
                fetchAdvertPage(id)
            }
            else if(url.startsWith("/updateAdvert/")){
                const [empty, advert, id] = url.split("/")
                nextPageId = 'update-advert-page'

                const updateAdvertForm =  document.getElementById("updateAdvertForm")
                updateAdvertForm.addEventListener("submit", function(event){
                    event.preventDefault()

                    const updateAdvertName = document.getElementById("advert_update_name").value
                    const updateAdvertDescription = document.getElementById("advert_update_description").value
                    const updateAdvertContact = document.getElementById("advert_update_contact").value
                    const updatedAdvert = {
                        advertName: updateAdvertName,
                        advertDescription: updateAdvertDescription,
                        advertContact: updateAdvertContact
            
                    }
                    
                    console.log(updatedAdvert)
                    updateExistingAdvert(updatedAdvert)
                })

            }else if(url.startsWith("/deleteAdvert/")){
                const [empty,advert,id] = url.split("/")
                nextPageId = 'delete-advert-page'

                const advertDeleteForm = document.getElementById("deleteAdvertForm")
                const yesButton = document.getElementById("delete_advert_yes_button")
                const noButton = document.getElementById("delete_advert_no_button")

                advertDeleteForm.addEventListener("submit", function(event){
                    event.preventDefault()

                    if(event.submitter.defaultValue == "No") {
                        hideCurrentPage()
                        showPage("/advert/" + id)
                    } else {
                        console.log("--------DELETED---------")
                        deleteAdvert(id)
                    }
                })
                
            }else {
                nextPageId = 'not-found-page'
            }
    }
    document.getElementById(nextPageId).classList.add('current-page')
}

async function loginForm(userName,userPassword){
    const userModel = {
        userName: userName,
        userPassword: userPassword,
        grant_type: "userPassword"
    }

    const response = await fetch(restApi + "tokens", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(userModel)
    })

    switch(response.status){
        case 200:
            const responseBody = await response.json()

            accessToken = responseBody.access_token
            userId = responseBody.userId
            isLoggedIn = true

            hideCurrentPage()
            updateNavPage(isLoggedIn)
            showPage('/')

            break

        case 401:
            //todo error
            break
        
        case 400:
            //todo error
            break

    }
}

function logout() {
	accessToken = ""
	userId = ""
	isLoggedIn = false
	updateNav(isLoggedIn)
	showPage('/')
}

// function updateNavPage(isLoggedIn) {
// 	const navUl = document.getElementById('nav-ul')
// 	navUl.innerText = ""

// 	if(isLoggedIn) {
// 		const navLinks = [
// 			{link: "/", desc: "Start"},
// 			{link: "/adverts/"+userId, desc: "Your adverts"},
// 			{link: "/createAdvert", desc: "Create a new advert"},
// 			{link: "/logout", desc: "Logout"}
// 		]

// 		for (const link of navLinks) {
// 			const li = document.createElement('li')
// 			const anchor = document.createElement('a')
// 			anchor.innerText = link.desc

// 			anchor.setAttribute('href', link.link)
// 			anchor.addEventListener('click', function (event) {
// 				event.preventDefault()

// 				const url = anchor.getAttribute('href')
// 				history.pushState(null, "", url)

// 				hideCurrentPage()
// 				showPage(url)
// 			})
// 		li.appendChild(anchor)
// 		navUl.appendChild(li)
// 		}
// 	}else {
// 		const navLinks = [
// 			{link: "/", desc: "Start"},
// 			{link: "/login"+userId, desc: "Login"},
// 			{link: "/signUp"+userId, desc: "Sign up"}
// 		]
// 		for (const link of navLinks) {
// 			const li = document.createElement('li')
// 			const anchor = document.createElement('a')
// 			anchor.innerText = link.desc

// 			anchor.setAttribute('href', link.link)
// 			anchor.addEventListener('click', function (event) {
// 				event.preventDefault()

// 				const url = anchor.getAttribute('href')

// 				history.pushState(null, "", url)

// 				hideCurrentPage()
// 				showPage(url)
// 			})
// 		li.appendChild(anchor)
// 		navUl.appendChild(li)
// 		}
// 	}
// }