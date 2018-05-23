module.exports = (Sequelize, sequelize) => {
    return sequelize.define('auth', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        property: { type: Sequelize.INTEGER }
    });
};