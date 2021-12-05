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

//Get user by id user detail
const userGetUserIdValidate = Joi.object({
    id: joi_digit,
    nickname: joi_string,
    role: joi_string,
    user_id: joi_digit
});

function userGetUserIdValidator(data,user_id){
    const { error, value } = userGetUserIdValidate.validate({ 
        id: data.id,
        nickname: data.nickname,
        role: data.role,
        user_id: user_id
    },{abortEarly: false});

    errors = {};

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "id": errors.id = "Wrong id format";break;
                case "nickname": errors.nickname = "Wrong nickname";break;
                case "role": errors.role = "Wrong role";break;
                case "user_id": errors.user_id = "Wrong user_id format";break;
            }
        })
    }    

    return errors;
};

//Add user detail
const userAddDetailsValidate = Joi.object({
    id: joi_digit,
    nickname: joi_string,
    role: joi_string,
    dt_id: joi_digit,
    ud_value: joi_string
});

function userAddDetailsValidator(data,ud){
    const { error, value } = userAddDetailsValidate.validate({ 
        id: data.id,
        nickname: data.nickname,
        role: data.role,
        dt_id: ud.dt_id,
        ud_value: ud.value
    },{abortEarly: false});

    errors = {};

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "id": errors.id = "Wrong id format";break;
                case "nickname": errors.nickname = "Wrong nickname";break;
                case "role": errors.role = "Wrong role";break;
                case "dt_id": errors.dt_id = "Wrong dt_id format";break;
                case "ud_value": errors.ud_value = "Wrong ud_value format";break;
            }
        })
    }    

    return errors;
};


//Delete user detail
const userDeleteDetailValidate = Joi.object({
    id: joi_digit,
    ud_id: joi_digit
});

function userDeleteDetailValidator(data,ud){
    const { error, value } = userDeleteDetailValidate.validate({ 
        id: data.id,
        ud_id: ud.ud_id
    },{abortEarly: false});

    errors = {};

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "id": errors.id = "Wrong id format";break;
                case "ud_id": errors.ud_id = "Wrong ud_id format";break;
            }
        })
    }    

    return errors;
};

//Edit user detail
const userEditDetailValidate = Joi.object({
    id: joi_digit,
    ud_id: joi_digit,
    value: joi_string
});

function userEditDetailValidator(data,ud_id,ud_value){
    const { error, value } = userEditDetailValidate.validate({ 
        id: data.id,
        ud_id: ud_id,
        value: ud_value
    },{abortEarly: false});

    errors = {};

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "id": errors.id = "Wrong id format";break;
                case "ud_id": errors.ud_id = "Wrong ud_id format";break;
                case "value": errors.value = "Wrong value format";break;
            }
        })
    }    

    return errors;
};

//Friend requests

//Send friend requests
const userSendFriendRequestValidate = Joi.object({
    id: joi_digit,
    reciever_id: joi_digit,
    message: joi_string
});

function userSendFriendRequestValidator(data,fr){
    const { error, value } = userSendFriendRequestValidate.validate({ 
        id: data.id,
        reciever_id: fr.reciever_id,
        message: fr.message
    },{abortEarly: false});

    errors = {};

    if(data.id == fr.reciever_id){
        errors.same_id = "You can't send a friend request to yourself, dummy"
    }

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "id": errors.id = "Wrong id format";break;
                case "reciever_id": errors.reciever_id = "Wrong reciever_id format";break;
                case "message": errors.message = "Wrong message format";break;
            }
        })
    }    

    return errors;
};

//Accept friend requests
const userAcceptFriendRequestValidate = Joi.object({
    id: joi_digit,
    sender_id: joi_digit
});

function userAcceptFriendRequestValidator(data,fr){
    const { error, value } = userAcceptFriendRequestValidate.validate({ 
        id: data.id,
        sender_id: fr.sender_id
    },{abortEarly: false});

    errors = {};

    if(data.id == fr.sender_id){
        errors.same_id = "You can't accept a friend request from yourself, dummy"
    }

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "id": errors.id = "Wrong id format";break;
                case "sender_id": errors.sender_id = "Wrong sender_id format";break;
            }
        })
    }    

    return errors;
};

//Delete friend requests
const userDeleteFriendRequestValidate = Joi.object({
    id: joi_digit,
    other_id: joi_digit
});

function userDeleteFriendRequestValidator(data,fr){
    const { error, value } = userDeleteFriendRequestValidate.validate({ 
        id: data.id,
        other_id: fr.other_id
    },{abortEarly: false});

    errors = {};

    if(data.id == fr.other_id){
        errors.same_id = "You can't delete a friend request from yourself, dummy"
    }

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "id": errors.id = "Wrong id format";break;
                case "other_id": errors.other_id = "Wrong other_id format";break;
            }
        })
    }    

    return errors;
};

//Get friend requests
const userGetFriendRequestValidate = Joi.object({
    id: joi_digit
});

function userGetFriendRequestValidator(data){
    const { error, value } = userGetFriendRequestValidate.validate({ 
        id: data.id
    },{abortEarly: false});

    errors = {};

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "id": errors.id = "Wrong id format";break;
            }
        })
    }    

    return errors;
};

//Get friend requests
const userDelFriendValidate = Joi.object({
    id: joi_digit,
    friend_id: joi_digit
});

function userDelFriendValidator(data,fr){
    const { error, value } = userDelFriendValidate.validate({ 
        id: data.id,
        friend_id: fr.friend_id
    },{abortEarly: false});

    errors = {};

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "id": errors.id = "Wrong id format";break;
                case "friend_id": errors.friend_id = "Wrong friend_id format";break;
            }
        })
    }    

    return errors;
};

module.exports.userGetSelfValidator = userGetSelfValidator;
module.exports.userGetUserIdValidator = userGetUserIdValidator;
module.exports.userAddDetailsValidator = userAddDetailsValidator;
module.exports.userDeleteDetailValidator = userDeleteDetailValidator;
module.exports.userEditDetailValidator = userEditDetailValidator;
module.exports.userSendFriendRequestValidator = userSendFriendRequestValidator;
module.exports.userAcceptFriendRequestValidator = userAcceptFriendRequestValidator;
module.exports.userDeleteFriendRequestValidator = userDeleteFriendRequestValidator;
module.exports.userGetFriendRequestValidator = userGetFriendRequestValidator;
module.exports.userDelFriendValidator = userDelFriendValidator;