'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CollegeCourses', {
      college_course_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      college_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Colleges',
          key: 'college_id'
        },
        onDelete: 'CASCADE'
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Courses',
          key: 'course_id'
        },
        onDelete: 'CASCADE'
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects',
          key: 'project_id'
        },
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CollegeCourses');
  }
};
