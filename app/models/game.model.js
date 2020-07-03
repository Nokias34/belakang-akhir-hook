module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("games",{
        title : {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        developer: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        },
      
    });

    return Game;
};