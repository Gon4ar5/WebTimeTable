const Joi = require('joi');

module.exports = {
    name: Joi.string().min(1)
};