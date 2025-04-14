'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CasteCategory', {
      caste_category_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      caste_category_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
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
    await queryInterface.dropTable('CasteCategory');
  }
};

