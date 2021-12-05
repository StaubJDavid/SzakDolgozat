const Joi = require('joi');

const {joi_digit, joi_string} = require('./schemas');


//Validation for creating a thread
const threadCreateThreadValidate = Joi.object({
    id: joi_digit,
    title: joi_string,
    text: joi_string
});

function threadCreateThreadValidator(data,th){
    const { error, value } = threadCreateThreadValidate.validate({ 
        id: data.id,
        title: th.title,
        text: th.text
    },{abortEarly: false});

    errors = {};

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "id": errors.id = "Wrong id format";break;
                case "title": errors.title = "Wrong title format";break;
                case "text": errors.text = "Wrong text format";break;
            }
        })
    }    

    return errors;
};

//Validation for creating a thread
const threadGetThreadsValidate = Joi.object({
    id: joi_digit
});

function threadGetThreadsValidator(data){
    const { error, value } = threadGetThreadsValidate.validate({ 
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

//Validation for getting a thread
const threadGetThreadValidate = Joi.object({
    id: joi_digit,
    thread_id: joi_string
});

function threadGetThreadValidator(user_id, thread_id){
    const { error, value } = threadGetThreadValidate.validate({ 
        id: user_id,
        thread_id: thread_id
    },{abortEarly: false});

    errors = {};

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "id": errors.user_id = "Wrong user_id format";break;
                case "thread_id": errors.thread_id = "Wrong thread_id format";break;
            }
        })
    }    

    return errors;
};

//Validation for deleting a thread
const threadDelThreadValidate = Joi.object({
    id: joi_digit,
    thread_id: joi_string
});

function threadDelThreadValidator(user_id, thread_id){
    const { error, value } = threadDelThreadValidate.validate({ 
        id: user_id,
        thread_id: thread_id
    },{abortEarly: false});

    errors = {};

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "id": errors.user_id = "Wrong user_id format";break;
                case "thread_id": errors.thread_id = "Wrong thread_id format";break;
            }
        })
    }    

    return errors;
};

//Validation for deleting a thread
const threadGetUsersThreadValidate = Joi.object({
    id: joi_digit
});

function threadGetUsersThreadValidator(user_id){
    const { error, value } = threadGetUsersThreadValidate.validate({ 
        id: user_id
    },{abortEarly: false});

    errors = {};

    if(error){
        error.details.forEach(e => {
            switch(e.path[0]){
                case "id": errors.user_id = "Wrong user_id format";break;
            }
        })
    }    

    return errors;
};


module.exports.threadCreateThreadValidator = threadCreateThreadValidator;
module.exports.threadGetThreadsValidator = threadGetThreadsValidator;
module.exports.threadGetThreadValidator = threadGetThreadValidator;
module.exports.threadDelThreadValidator = threadDelThreadValidator;
module.exports.threadGetUsersThreadValidator = threadGetUsersThreadValidator;