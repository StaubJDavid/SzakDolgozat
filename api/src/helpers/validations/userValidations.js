const Joi = require('joi');

const {joi_digit, joi_string} = require('./schemas');


//Validation for getting the current user
const userGetSelfValidate = Joi.object({
    id: joi_digit,
    nickname: joi_string,
    role: joi_string
});

function userGetSelfValidator(data){
    const { error, value } = userGetSelfValidate.validate({ 
        id: data.id,
        nickname: data.nickname,
        role: data.role
    },{abortEarly: false});

    errors = {};

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "id": errors.id = "Wrong id format";break;
                case "nickname": errors.nickname = "Wrong nickname";break;
                case "role": errors.role = "Wrong role";break;
            }
        })
    }    

    return errors;
};

module.exports.userGetSelfValidator = userGetSelfValidator