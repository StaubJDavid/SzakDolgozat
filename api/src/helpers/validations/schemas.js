const Joi = require('joi');

exports.joi_email = Joi.string().email().required();
exports.joi_nickname = Joi.string().required().min(2);
//const joi_password = Joi.string().pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?#$%&()"\'\[\\\]*+,-./{}~])(?=.{8,})')).required().messages({'string.pattern.base': `Password is bad`});;
exports.joi_password = Joi.string().required().min(4);
exports.joi_string = Joi.string().required().min(3);
exports.joi_digit = Joi.number().required();
exports.joi_visibility_digit = Joi.number().min(0).max(2).required();


