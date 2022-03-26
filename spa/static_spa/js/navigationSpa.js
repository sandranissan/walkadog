//const restApi = "http://localhost:8080/rest/"


let access_token = ""
let user_id = ""
let is_logged_in = false

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

    // const loginButton = document.body.getElementById('login_button')
    // loginButton.addEventListener("click", function(event){
    //     console.log("logga in?")
    // })

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
            fetchAdvertsPage(user_id)
            break
        
        case '/login':
            nextPageId = 'login-page'

            const loginForm = document.getElementById("logInForm")
            loginForm.addEventListener('submit', function(event){
                event.preventDefault()
                const username = document.getElementById("login_username").value
 				const password = document.getElementById("login_password").value
 				fetchLogin(username, password)
                let url = "/login"
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

                const signUp_username = document.getElementById("signUp_username").value
 				const signUp_email = document.getElementById("signUp_email").value
 				const signUp_password = document.getElementById("signUp_password").value
				const newUser = {
					userName: signUp_username,
					userEmail: signUp_email,
					userPassword: signUp_password
				}
                let url = "/signUp"
                fetchCreateNewUser(newUser) 
            })
            break

        case '/createAdvert':
            nextPageId = 'create-advert-page'

            const createAdvertForm = document.getElementById("createAdvertForm")
            createAdvertForm.addEventListener("submit", function(event){
                event.preventDefault()
                const createAdvert_name = document.getElementById("advert_create_name").value
 				const createAdvert_description = document.getElementById("advert_create_description").value
 				const createAdvert_contact = document.getElementById("advert_create_contact").value


				const newAdvert = {
					advertName: createAdvert_name,
					advertDescription: createAdvert_description,
					contact: createAdvert_contact,
				}
                fetchCreateAdvert(newAdvert)
                
            })
            break
        
        default:
            if(url.startsWith("/advert/")){
                const[empty,advert,advert_id] = url.split("/")
                nextPageId = 'advert-page'
                fetchAdvertPage(advert_id)
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
                        contact: updateAdvertContact,
                        advertId: id
            
                    }
                    
                    console.log(updatedAdvert)
                    fetchUpdateExistingAdvert(updatedAdvert)
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
                        fetchDeleteAdvert(id)
                    }
                })
                
            }else {
                nextPageId = 'not-found-page'
            }
    }
    document.getElementById(nextPageId).classList.add('current-page')
}


async function fetchAdvertsPage(userId) {
    const response = await fetch("http://localhost:3000/rest/adverts/" + userId , {
        method: "GET",
        headers: {
            "Content-type": "application/json"

        }
        
    })
    //adverts innehåller resultatet från restApin i json format
    const adverts = await response.json()

    const yourAdvertsUl = document.getElementById('my-adverts')
	yourAdvertsUl.innerText = ""

	for (const advert of adverts) {

		const li = document.createElement('li') 

		const anchor = document.createElement('a')
		anchor.innerText = advert.advertName + ": " + advert.advertDescription
		anchor.setAttribute('href', "/advert/" + advert.advertId)
		anchor.addEventListener('click', function (event) {
			event.preventDefault()

			const url = anchor.getAttribute('href')

			history.pushState(null, "", url)

			hideCurrentPage()
			showPage(url)
		})
		li.appendChild(anchor)

		yourAdvertsUl.appendChild(li)

	}


}
async function fetchAdvertPage(id) {

    const response = await fetch("http://localhost:3000/rest/advert/" + id, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        }
    })
    const advert = await response.json()

    const crudUl = document.getElementById('allCrud-links')
    crudUl.innerText = ""

    const updateLi = document.createElement('li')
    const deleteLi = document.createElement('li')

    const anchorUpdate = document.createElement('button')
    anchorUpdate.innerText = "Update advert "
    anchorUpdate.setAttribute('href', "/updateAdvert/" + id)
    anchorUpdate.addEventListener('click', function (event) {
        event.preventDefault()

        const updateUrl = anchorUpdate.getAttribute('href')

        history.pushState(null, "", updateUrl)

        hideCurrentPage()
        showPage(updateUrl)
    })

    const anchorDelete = document.createElement('button')
    anchorDelete.innerText = "Delete this advert"
    anchorDelete.setAttribute('href', "/deleteAdvert/" + id)
    anchorDelete.addEventListener('click', function (event) {
        event.preventDefault()

        const deleteURL = anchorDelete.getAttribute('href')

        history.pushState(null, "", deleteURL)

        hideCurrentPage()
        showPage(deleteURL)
    })

    updateLi.appendChild(anchorUpdate)
    deleteLi.appendChild(anchorDelete)

    crudUl.appendChild(updateLi)
    crudUl.appendChild(deleteLi)
    
    document.querySelector('#advert-name').innerText = advert.advertName
    document.querySelector('#advert-description').innerText = advert.advertDescription
    document.querySelector('#advert-contact').innerText = advert.contact
}
async function fetchCreateAdvert(advert) {
	const response = await fetch("http://localhost:3000/rest/adverts/create/" , {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + access_token
		},
		body: JSON.stringify(advert)
	})

	switch (response.status) {
		case 201:
			const createdAdvert = await response.json()
			const userId = createdAdvert.userId
            

			hideCurrentPage()
			showPage('/adverts')
			break

		case 401:
			//handle error
			break

		case 400:
			//handle error
			break

		case 500:
			//handle error
			break

		default:
			//handle error
			break
	}
}

async function fetchUpdateExistingAdvert(advertUpdate) {
	const response = await fetch("http://localhost:3000/rest/advert/"+ advertUpdate.advertId, {
		method: "PUT",
		headers: {
			"Content-type": "application/json",
			"Authorization": "Bearer " + access_token
		},
		body: JSON.stringify(advertUpdate)
	})

	switch (response.status) {
		case 200:
			console.log("Carried out the request")
            hideCurrentPage()
			//show some other page than /
			showPage('/advert/'+advertUpdate.advertId)
			break

		case 404:
			// handle errors
			//const account = await response.json()
			// console.log(account)
			// hideCurrentPage()
			// showPage('/accounts/' + account.account_id)
			// break

		case 401:
			// handle errors
			break
	}
}

async function fetchDeleteAdvert(id) {
	const response = await fetch("http://localhost:3000/rest/advert/" + id, {
		method: "DELETE",
		headers: {
			"Accept": "application/json",
			"Content-type": "application/json",
			"Authorization": "Bearer " + access_token
		}
	})

	switch (response.status) {
		case 200: // om det togs bort
			hideCurrentPage()
			//show some other page than /
			showPage('/')
			break

		case 400:
			//handle errors
			break
	}
}


async function fetchLogin(username,userpassword){
    const userModel = {
        userName: username,
        userPassword: userpassword,
        grant_type: "userPassword"
    }

    const response = await fetch('http://localhost:3000/rest/login/', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(userModel)
    })

    switch(response.status){
        case 200:
            const responseBody = await response.json()

            access_token = responseBody.access_token
            user_id = responseBody.userId
            is_logged_in = true

            hideCurrentPage()
            //updateNavPage(is_logged_in)
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

async function fetchCreateNewUser(user) {
	const response = await fetch('http://localhost:3000/rest/signUp', {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user)
	})

	switch (response.status) {
		case 201:
			const createdUser = await response.json()

			hideCurrentPage()
			showPage('/login')
			break

		case 401:
			//handle error
			break

		case 400:
			//handle error
			break

		case 500:
			//handle error
			break

		default:
			//handle error
			break
	}
}

function logout() {
	access_token = ""
	user_id = ""
	is_logged_in = false
	//updateNavPage(is_logged_in)
	showPage('/')
}
