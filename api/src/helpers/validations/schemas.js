const Joi = require('joi');

exports.joi_email = Joi.string().email().required();
exports.joi_nickname = Joi.string().required().min(2);
//const joi_password = Joi.string().pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?#$%&()"\'\[\\\]*+,-./{}~])(?=.{8,})')).required().messages({'string.pattern.base': `Password is bad`});;
exports.joi_password = Joi.string().required().min(4);
exports.joi_string = Joi.string().required();
exports.joi_digit = Joi.number().required();
exports.joi_visibility_digit = Joi.number().min(0).max(2).required();

/*const joi_lastname = Joi.string().min(2).max(20).required(); 
const joi_firstname = Joi.string().min(2).max(20).required(); 
const joi_zip = Joi.string().pattern(new RegExp('[0-9][0-9][0-9][0-9]')).min(4).max(4).required().messages({'string.pattern.base': `Zip contains non numerical value`});
const joi_city = Joi.string().min(2).max(35).required();
const joi_street = Joi.string().min(1).max(35).required();
const joi_house_number = Joi.string().min(1).max(100).required();
const joi_phone = Joi.string().regex(/^^((?:\+?3|0)6)(?:\s|-|\()?(\d{1,2})(?:\s|-|\))?(\d{3})-?\s?(\d{3,4})$/).required().messages({'string.pattern.base': `06/+36 xx xxx xxxx`});
const joi_avatar = Joi.string().base64();
const joi_id = Joi.number().required();
const joi_device_token = Joi.string().required();*/ 
