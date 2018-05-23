module.exports = (Sequelize, sequelize) => {
    return sequelize.define('dates', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        day_number: { type: Sequelize.INTEGER },
        empl_time: { type: Sequelize.INTEGER },
    });
};