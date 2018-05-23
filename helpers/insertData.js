const auditorium = require('../data/auditoriums.json');
const dates = require('../data/dates.json');
const employment_names = require('../data/employment_names.json');
const employment_types = require('../data/employment_types.json');
const groups = require('../data/groups.json');
const lecturers = require('../data/lecturers.json');
const timetables = require('../data/timetables.json');
const auths = require('../data/auths.json');

module.exports = async (db) => {
    await db.auditoriums.bulkCreate(auditorium);
    await db.dates.bulkCreate(dates);
    await db.employment_names.bulkCreate(employment_names);
    await db.employment_types.bulkCreate(employment_types);
    await db.groups.bulkCreate(groups);
    await db.lecturers.bulkCreate(lecturers);
    await db.auths.bulkCreate(auths);
    await db.timetables.bulkCreate(timetables);
};