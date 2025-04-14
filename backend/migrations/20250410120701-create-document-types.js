'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Document_Types', {
      document_type_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      document_name: {
        type: Sequelize.STRING(255),
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

    // ✅ Explicit FK added here
    await queryInterface.addConstraint('Document_Types', {
      fields: ['project_id'],
      type: 'foreign key',
      name: 'fk_document_types_project',
      references: {
        table: 'Projects',
        field: 'project_id'
      },
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Document_Types');
  }
};
