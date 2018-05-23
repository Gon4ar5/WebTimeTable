module.exports = (Sequelize, sequelize) => {
    return sequelize.define('employment_types', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: { type: Sequelize.STRING },
    });
};