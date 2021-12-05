const Joi = require('joi');

const {joi_digit, joi_string, joi_visibility_digit} = require('./schemas');


//Validation for getting the current user
const commentGetCommentsValidate = Joi.object({
    target_id: joi_string
});

const commentPostCommentValidate = Joi.object({
    id: joi_digit,
    target_id: joi_string,
    message: joi_string
});

const commentDeleteCommentValidate = Joi.object({
    id: joi_digit,
    target_id: joi_string
});

class commentValidations {
    constructor() {
    };

    commentGetCommentsValidator(target_id){
        const { error, value } = commentGetCommentsValidate.validate({ 
            target_id: target_id
        },{abortEarly: false});
    
        const errors = {};
    
        if(error){
            error.details.forEach(e => {
                switch(e.path[0]){
                    case "target_id": errors.target_id = "Wrong target_id format";break;
                }
            })
        }    
    
        return errors;
    };

    commentPostCommentValidator(user_id, target_id, message){
        const { error, value } = commentPostCommentValidate.validate({ 
            id: user_id,
            target_id: target_id,
            message: message
        },{abortEarly: false});
    
        const errors = {};
    
        if(error){
            error.details.forEach(e => {
                switch(e.path[0]){
                    case "id": errors.id = "Wrong id format";break;
                    case "target_id": errors.target_id = "Wrong target_id format";break;
                    case "message": errors.message = "Wrong message format";break;
                }
            })
        }    
    
        return errors;
    };

    commentDeleteCommentValidator(user_id, target_id){
        const { error, value } = commentDeleteCommentValidate.validate({ 
            id: user_id,
            target_id: target_id
        },{abortEarly: false});
    
        const errors = {};
    
        if(error){
            error.details.forEach(e => {
                switch(e.path[0]){
                    case "id": errors.id = "Wrong id format";break;
                    case "target_id": errors.target_id = "Wrong target_id format";break;
                }
            })
        }    
    
        return errors;
    };

};

module.exports = commentValidations;