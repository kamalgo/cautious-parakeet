'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subcaste', {
      subcaste_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      subcaste_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      caste_category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'CasteCategory',
          key: 'caste_category_id'
        },
        onDelete: 'CASCADE'
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Projects',
          key: 'project_id'
        },
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Subcaste');
  }
};
