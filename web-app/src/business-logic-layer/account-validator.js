const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 10

exports.getErrorsNewAccount = function(user){
	
	const errors = []
	
	// Validate username.
	if(!user.hasOwnProperty("username")){
		errors.push("usernameMissing")
	}else if(user.userName.length < MIN_USERNAME_LENGTH){
		errors.push("usernameTooShort")
	}else if(MAX_USERNAME_LENGTH < user.userName.length){
		errors.push("usernameTooLong")
	}
	
	return errors
	
}