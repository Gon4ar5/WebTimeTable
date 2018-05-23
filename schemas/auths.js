const Joi = require('joi');

module.exports = {
    login: Joi.string().min(5),
    password: Joi.string().min(8),
    property: Joi.number().min(0).max(3),
};