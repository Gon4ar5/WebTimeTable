module.exports = (Sequelize, sequelize) => {
    return sequelize.define('groups', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: { type: Sequelize.INTEGER },
        facility: { type: Sequelize.STRING },
        specialization: { type: Sequelize.STRING }
    });
};