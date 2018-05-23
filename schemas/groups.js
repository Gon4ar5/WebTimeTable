const Joi = require('joi');

module.exports = {
    number: Joi.number,
    facility: Joi.string(),
    specialization: Joi.string(),
    course: Joi.string().min(1)
};