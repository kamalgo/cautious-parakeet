'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_documents', {
      document_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      student_id: {
        type: Sequelize.INTEGER
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Projects',
          key: 'project_id'
        },
        onDelete: 'CASCADE'
      },
      academic_year_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Academic_years',
          key: 'academic_year_id'
        },
        onDelete: 'CASCADE'
      },
      document_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Document_Types',
          key: 'document_type_id'
        },
        onDelete: 'CASCADE'
      },
      version_number: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      document_url: {
        type: Sequelize.TEXT
      },
      uploaded_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      is_latest: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      remarks: {
        type: Sequelize.TEXT
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });

    await queryInterface.addIndex('student_documents', ['student_id', 'academic_year_id', 'document_type_id'], {
      name: 'idx_student_year_type_v2'
    });

    await queryInterface.addIndex('student_documents', ['student_id', 'document_type_id', 'academic_year_id', 'is_latest'], {
      name: 'idx_latest_v2'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('student_documents', 'idx_student_year_type_v2');
    await queryInterface.removeIndex('student_documents', 'idx_latest_v2');
    await queryInterface.dropTable('student_documents');
  }
};
