const Joi = require('joi');

module.exports = {
    name: Joi.string().min(1),
    academic_degree: Joi.string()
};