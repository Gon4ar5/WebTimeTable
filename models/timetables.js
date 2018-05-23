module.exports = (Sequelize, sequelize) => {
    return sequelize.define('timetables', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_employment_name: { type: Sequelize.INTEGER },
        id_employment_type: { type: Sequelize.INTEGER },
        id_groups: { type: Sequelize.INTEGER },
        id_lecturers: { type: Sequelize.INTEGER },
        id_auditoriums: { type: Sequelize.INTEGER },
        id_dates: { type: Sequelize.INTEGER },
    });
};