'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'account_number', {
      type: Sequelize.STRING(36), 
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'account_number', {
      type: Sequelize.STRING(36), 
      allowNull: false,
      unique: true,
    });
  },
};