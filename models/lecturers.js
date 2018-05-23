module.exports = (Sequelize, sequelize) => {
    return sequelize.define('lecturers', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: Sequelize.STRING },
        academic_degree: { type: Sequelize.STRING },
    });
};