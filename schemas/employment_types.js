const Joi = require('joi');

module.exports = {
    type: Joi.string().min(1)
};