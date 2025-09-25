'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'account_number', {
      type: Sequelize.STRING(36), // 🔥 aumentamos la longitud
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'account_number', {
      type: Sequelize.STRING(36), // 🔙 rollback si es necesario
      allowNull: false,
      unique: true,
    });
  },
};