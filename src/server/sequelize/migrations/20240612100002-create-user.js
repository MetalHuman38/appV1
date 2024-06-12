'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[a-zA-Z0-9_]*$/,
          len: [3, 20],
        },
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
          len: [5, 50],
          notEmpty: true,
        },
      },
      hashedpassword: {
        type: Sequelize.STRING(64),
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'unverified',
      },
      bio: {
        type: Sequelize.STRING,
        defaultValue: 'This is a new user.',
      },
      join: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      avatarUrl: {
        type: Sequelize.STRING,
      },
      imageURL: {
        type: Sequelize.STRING,
      },
      profilePic: {
        type: Sequelize.STRING,
      },
      label: {
        type: Sequelize.STRING,
        defaultValue: 'New User',
      },
      last_activity: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      userRegistrationID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'userRegistration', // Assuming the table name is 'UserRegistrations'
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  },
};
