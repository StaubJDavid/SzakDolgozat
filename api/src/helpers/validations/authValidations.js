const Joi = require('joi');

const {joi_email, joi_nickname, joi_password} = require('./schemas');


//Validation for registration
const registerValidate = Joi.object({
    email: joi_email,
    nickname: joi_nickname,
    password: joi_password,
    repeat_password: Joi.ref('password')
});

function registerValidator(data){
    const { error, value } = registerValidate.validate({ 
        email: data.email,
        nickname: data.nickname,
        password: data.password,
        repeat_password: data.password2
    },{abortEarly: false});

    errors = {};

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "email": errors.email = "Wrong email format";break;
                case "nickname": errors.nickname = "Wrong nickname";break;
                case "password": errors.password = "Wrong password";break;
                case "repeat_password": errors.password2 = "Wrong password confirm";break;
            }
        })
    }    

    return errors;
};

//Login Validation
const loginValidate = Joi.object({
    email: joi_email
});

function loginValidator(data){
    const { error, value } = loginValidate.validate({ 
        email: data.email
    },{abortEarly: false});

    errors = {};

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "email": errors.email = "Wrong email format";break;
            }
        })
    }    

    return errors;
}

module.exports.registerValidator = registerValidator
module.exports.loginValidator = loginValidator