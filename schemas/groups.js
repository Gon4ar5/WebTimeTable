const Joi = require('joi');

module.exports = {
    number: Joi.number,
    facility: Joi.string(),
    specialization: Joi.string()
};