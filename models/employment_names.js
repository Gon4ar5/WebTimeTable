module.exports = (Sequelize, sequelize) => {
    return sequelize.define('employment_names', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: Sequelize.STRING }
    });
};