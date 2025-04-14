'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Religion', {
      religion_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      religion_name: {
        type: Sequelize.ENUM('Buddhist', 'Christian', 'Jain', 'Muslim', 'Parsi', 'Sikh', 'Jews', 'Hindu'),
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
    await queryInterface.dropTable('Religion');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Religion_religion_name";');
  }
};
