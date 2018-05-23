module.exports = (Sequelize, sequelize) => {
    return sequelize.define('auditorium', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        campus: { type: Sequelize.INTEGER },
        number: { type: Sequelize.INTEGER },
    });
};