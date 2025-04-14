'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MaritalStatus', {
      marital_status_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      marital_status: {
        type: Sequelize.ENUM('Married', 'Unmarried'),
        allowNull: false
      },
      project_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        references: {
          model: 'Projects',
          key: 'project_id'
        },
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MaritalStatus');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_MaritalStatus_marital_status";');
  }
};
