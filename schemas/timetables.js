const Joi = require('joi');

module.exports = {
    id_employment_name: Joi.number,
    id_employment_type: Joi.number,
    id_groups: Joi.number,
    id_lecturers: Joi.number,
    id_auditoriums: Joi.number,
    id_dates: Joi.number
};