const Joi = require('joi');

const {joi_digit, joi_string, joi_visibility_digit} = require('./schemas');


//Validation for getting the current user

class mangaUpdatesValidations {
    constructor() {
    };

    mockValidator(){
        const errors = {};
        return errors;
    }
};

module.exports = mangaUpdatesValidations;