const Joi = require('joi');

const {joi_digit, joi_string, joi_visibility_digit} = require('./schemas');

const listCreateListValidate = Joi.object({
    id: joi_digit,
    list_name: joi_string,
    visibility: joi_visibility_digit
});

const listGetCurrentListsValidate = Joi.object({
    id: joi_digit
});

const listGetUserListsValidate = Joi.object({
    id: joi_digit,
    friend_id: joi_digit
});

const listAddToListValidate = Joi.object({
    id: joi_digit,
    list_id: joi_digit,
    manga_name: joi_string,
    manga_id: joi_string
});

const listEditListValidate = Joi.object({
    id: joi_digit,
    list_id: joi_digit,
    list_name: joi_string,
    visibility: joi_visibility_digit
});

const listDeleteValidate = Joi.object({
    id: joi_digit,
    list_id: joi_digit
});

const listDeleteListEntryValidate = Joi.object({
    id: joi_digit,
    list_id: joi_digit,
    ld_id: joi_digit
});


class listValidations {
    constructor() {
    };

    listCreateListValidator(data, list){
        const { error, value } = listCreateListValidate.validate({ 
            id: data.id,
            list_name: list.list_name,
            visibility: list.visibility
        },{abortEarly: false});
    
        const errors = {};
    
        if(error){
            error.details.forEach(e => {
                switch(e.path[0]){
                    case "id": errors.id = "Wrong id format";break;
                    case "list_name": errors.list_name = "Wrong list_name format";break;
                    case "visibility": errors.visibility = "Visibility is not between 0 and 2";break;
                }
            })
        }    
    
        return errors;
    };

    listGetCurrentListsValidator(data){
        const { error, value } = listGetCurrentListsValidate.validate({ 
            id: data.id
        },{abortEarly: false});
    
        const errors = {};
    
        if(error){
            error.details.forEach(e => {
                switch(e.path[0]){
                    case "id": errors.id = "Wrong id format";break;
                }
            })
        }    
    
        return errors;
    };

    listGetUserListsValidator(data, friend_id){
        const { error, value } = listGetUserListsValidate.validate({ 
            id: data.id,
            friend_id: friend_id
        },{abortEarly: false});
    
        const errors = {};
    
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

    listAddToListValidator(data, list_id, manga){
        const { error, value } = listAddToListValidate.validate({ 
            id: data.id,
            list_id: list_id,          
            manga_name: manga.manga_name,
            manga_id: manga.manga_id,
        },{abortEarly: false});
    
        const errors = {};
    
        if(error){
            error.details.forEach(e => {
                switch(e.path[0]){
                    case "id": errors.id = "Wrong id format";break;
                    case "list_id": errors.list_id = "Wrong list_id format";break;
                    case "manga_name": errors.manga_name = "Wrong manga_name format";break;
                    case "manga_id": errors.manga_id = "Wrong manga_id format";break;
                }
            })
        }    
    
        return errors;
    };

    listEditListValidator(data, list_id, list){
        const { error, value } = listEditListValidate.validate({ 
            id: data.id,
            list_id: list_id,
            list_name: list.list_name,
            visibility: list.visibility
        },{abortEarly: false});
    
        const errors = {};
    
        if(error){
            error.details.forEach(e => {
                switch(e.path[0]){
                    case "id": errors.id = "Wrong id format";break;
                    case "list_id": errors.list_id = "Wrong list_id format";break;
                    case "list_name": errors.list_name = "Wrong list_name format";break;
                    case "visibility": errors.visibility = "Wrong visibility format";break;
                }
            })
        }    
    
        return errors;
    };

    listDeleteValidator(data, list_id){
        const { error, value } = listDeleteValidate.validate({ 
            id: data.id,
            list_id: list_id
        },{abortEarly: false});
    
        const errors = {};
    
        if(error){
            error.details.forEach(e => {
                switch(e.path[0]){
                    case "id": errors.id = "Wrong id format";break;
                    case "list_id": errors.list_id = "Wrong list_id format";break;
                }
            })
        }    
    
        return errors;
    };

    listDeleteListEntryValidator(data, list){
        const { error, value } = listDeleteListEntryValidate.validate({ 
            id: data.id,
            list_id: list.list_id,
            ld_id: list.ld_id
        },{abortEarly: false});
    
        const errors = {};
    
        if(error){
            error.details.forEach(e => {
                switch(e.path[0]){
                    case "id": errors.id = "Wrong id format";break;
                    case "list_id": errors.list_id = "Wrong list_id format";break;
                    case "ld_id": errors.ld_id = "Wrong ld_id format";break;
                }
            })
        }    
    
        return errors;
    };
};

module.exports = listValidations;