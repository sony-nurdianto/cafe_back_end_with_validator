const Validator = require('validator')
const isEmpty = require('is-empty')


module.exports = function validateRegisterInput(data) {
    let error = {}

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";


    if (Validator.isEmpty(data.name)){
        error.name = "name field is required"
    }

    if(Validator.isEmpty(data.email)){
        error.email = "email is requires"
    }else if (!Validator.isEmpty(data.email)){
        error.email = "email is invalid"
    }

    if(Validator.isEmpty(data.phone)){
        error.phone = "phone is required"
    }

    if(Validator.isEmpty(data.password)){
        error.password = "email is required"
    }

    if(Validator.isEmpty(data.confirmPassword)){
        error.confirmPassword  = "confirm password field is required "
    }

    if(!Validator.isLength(data.password, {min : 8 , max : 30})){
        error.password = "pasword must be at least 8 character "
    }
    if(!Validator.equals(data.password, data.confirmPassword)){
        error.confirmPassword = "pasword must be match"
    }

    return {
        error,
        isValid : isEmpty(error)
    }

}