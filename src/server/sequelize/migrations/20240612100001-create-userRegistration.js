'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userRegistration', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      newUser: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'John Doe',
        validate: {
          len: [3, 50],
          notEmpty: false,
        },
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'newUser',
        validate: {
          is: /^[a-zA-Z0-9_]*$/,
          len: [3, 20],
        },
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        defaultValue: 'example@domain.com',
        validate: {
          isEmail: true,
          len: [5, 20],
          notEmpty: true,
        },
      },
      hashedpassword: {
        type: Sequelize.STRING(64),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userRegistration');
    return Promise.resolve();
  },
};
