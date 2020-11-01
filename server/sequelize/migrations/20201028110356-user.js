'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(250),
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            isEmail: true,
          },
        },
        uid: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        charset: 'utf8mb4',
      }
    ),

  down: (queryInterface) => queryInterface.dropTable('users'),
};
