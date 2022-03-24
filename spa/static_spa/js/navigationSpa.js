//const restApi = "http://localhost:8080/rest/"

let access_token = ""
let user_id = ""
let is_logged_in = false
let userId = ""

document.addEventListener('DOMContentLoaded', function () {

	const anchors = document.querySelectorAll('a')

	for (const anchor of anchors) {

		anchor.addEventListener('click', function (event) {
			event.preventDefault()

			const url = anchor.getAttribute('href')

			history.pushState(null, "", url)

			hideCurrentPage()
			showPage(url)
		})
	}
    //updateNav(isLoggedIn)
	showPage(location.pathname)

    const loginButton = document.body.getElementById('login_button')
    loginButton.addEventListener("click", function(event){
        console.log("logga in?")
    })

})

window.addEventListener('popstate', function (event) {
  

	hideCurrentPage()
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

        case '/adverts':
            nextPageId = 'adverts-page'
            fetchAdvertsPage(userId)
            break
        
        case '/login':
            nextPageId = 'login-page'

            const loginForm = document.getElementById("logInForm")
            loginForm.addEventListener('submit', function(event){
                event.preventDefault()
                let url = "/login"
                fetchLogin()
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
                event.preventDefault()
                let url = "/signUp"
                fetchCreateNewUser() 
            })
            break

        case '/createAdvert':
            nextPageId = 'create-advert-page'

            const createAdvertForm = document.getElementById("createAdvertForm")
            createAdvertForm.addEventListener("submit", function(event){
                event.preventDefault()

                fetchCreateAdvert()
                
            })
            break
        
        default:
            if(url.startsWith("/adverts/")){
                const[empty,advert,id] = url.split("/")
                nextPageId = 'advert-Page'
                hideCurrentPage()
                fetchAdvertPage(id)
            }
            // else if(url.startsWith("/updateAdvert/")){
            //     const [empty, advert, id] = url.split("/")
            //     nextPageId = 'update-advert-page'

            //     const updateAdvertForm =  document.getElementById("updateAdvertForm")
            //     updateAdvertForm.addEventListener("submit", function(event){
            //         event.preventDefault()

            //         const updateAdvertName = document.getElementById("advert_update_name").value
            //         const updateAdvertDescription = document.getElementById("advert_update_description").value
            //         const updateAdvertContact = document.getElementById("advert_update_contact").value
            //         const updatedAdvert = {
            //             advertName: updateAdvertName,
            //             advertDescription: updateAdvertDescription,
            //             advertContact: updateAdvertContact
            
            //         }
                    
            //         console.log(updatedAdvert)
            //         updateExistingAdvert(updatedAdvert)
            //     })

            // }else if(url.startsWith("/deleteAdvert/")){
            //     const [empty,advert,id] = url.split("/")
            //     nextPageId = 'delete-advert-page'

            //     const advertDeleteForm = document.getElementById("deleteAdvertForm")
            //     const yesButton = document.getElementById("delete_advert_yes_button")
            //     const noButton = document.getElementById("delete_advert_no_button")

            //     advertDeleteForm.addEventListener("submit", function(event){
            //         event.preventDefault()

            //         if(event.submitter.defaultValue == "No") {
            //             hideCurrentPage()
            //             showPage("/advert/" + id)
            //         } else {
            //             console.log("--------DELETED---------")
            //             deleteAdvert(id)
            //         }
            //     })
                
            else {
                nextPageId = 'not-found-page'
            }
    }
    document.getElementById(nextPageId).classList.add('current-page')
}


// async function fetchAdvertsPage(userId) {

// 	const response = await fetch( 'http://localhost:3000/rest/adverts/' + userId, {
// 		method: "GET",
// 		headers: {
// 			"Content-type": "application/json",
//             "Authorization": "Bearer " + access_token
// 		}
// 	})
// 	// TODO: Check status code and act accordingly!

// 	const adverts = await response.json()

// 	const yourAdvertsUl = document.getElementById('my-adverts')
// 	yourAdvertsUl.innerText = ""

// 	for (const advert of adverts) {

// 		const li = document.createElement('li')

// 		const anchor = document.createElement('a')
// 		anchor.innerText = advert.advertName + ": " + advert.advertDescription

// 		anchor.setAttribute('href', "/advert/" + advert.advertId)
// 		anchor.addEventListener('click', function (event) {
// 			event.preventDefault()

// 			const url = anchor.getAttribute('href')

// 			history.pushState(null, "", url)

// 			hideCurrentPage()
// 			showPage(url)
// 		})
// 		li.appendChild(anchor)

// 		yourAdvertsUl.appendChild(li)

// 	}

// }
// async function fetchLogin(userName,userPassword){
//     const userModel = {
//         userName: userName,
//         userPassword: userPassword,
//         grant_type: "userPassword"
//     }

//     const response = await fetch('http://localhost:3000/rest/login', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: new URLSearchParams(userModel)
//     })

//     switch(response.status){
//         case 200:
//             const responseBody = await response.json()

//             accessToken = responseBody.access_token
//             userId = responseBody.userId
//             is_logged_in = true

//             hideCurrentPage()
//             //updateNavPage(is_logged_in)
//             showPage('/')

//             break

//         case 401:
//             //todo error
//             break
        
//         case 400:
//             //todo error
//             break

//     }
// }

// async function createNewUser(newUser) {
// 	const response = await fetch('http://localhost:3000/rest/signUp', {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json"
// 		},
// 		body: JSON.stringify(newUser)
// 	})

// 	switch (response.status) {
// 		case 201:
// 			const createdUser = await response.json()

// 			hideCurrentPage()
// 			showPage('/login/'+createdUser)
// 			break

// 		case 401:
// 			//handle error
// 			break

// 		case 400:
// 			//handle error
// 			break

// 		case 500:
// 			//handle error
// 			break

// 		default:
// 			//handle error
// 			break
// 	}
// }

// function logout() {
// 	access_token = ""
// 	userId = ""
// 	is_logged_in = false
// 	//updateNavPage(is_logged_in)
// 	showPage('/')
// }

// function updateNavPage(is_logged_in) {
// 	const navUl = document.getElementById('nav-ul')
// 	navUl.innerText = ""

// 	if(is_logged_in) {
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