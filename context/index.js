module.exports = (Sequelize, config) => {

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

    const TimeTables = require('../models/timetables')(Sequelize, sequelize);
    const Employment_names = require('../models/employment_names')(Sequelize, sequelize);
    const Employment_types = require('../models/employment_types')(Sequelize, sequelize);
    const Dates = require('../models/dates')(Sequelize, sequelize);
    const Auditoriums = require('../models/auditoriums')(Sequelize, sequelize);
    const Lecturers = require('../models/lecturers')(Sequelize, sequelize);
    const Groups = require('../models/groups')(Sequelize, sequelize);
    const Auths = require('../models/auths')(Sequelize, sequelize);

    //Agents.hasMany(Property, {foreignKey: 'agentId'});
    //Property.belongsTo(Agents, {constraints: false, foreignKey: 'agentId'});

    //Offices.hasMany(Agents, {foreignKey: 'officeId'});
    //Agents.belongsTo(Offices, {constraints: false, foreignKey: 'officeId'});

    return {
        timetables: TimeTables,
        employment_names: Employment_names,
        employment_types: Employment_types,
        dates: Dates,
        auditoriums: Auditoriums,
        lecturers: Lecturers,
        groups: Groups,
        auths: Auths,
        sequelize,
        Sequelize,
    };
};