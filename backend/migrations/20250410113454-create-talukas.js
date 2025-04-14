'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Talukas', {
      taluka_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'project_id'
        },
        onDelete: 'CASCADE'
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'States',
          key: 'state_id'
        },
        onDelete: 'CASCADE'
      },
      district_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Districts',
          key: 'district_id'
        },
        onDelete: 'CASCADE'
      },
      taluka_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Talukas');
  }
};
