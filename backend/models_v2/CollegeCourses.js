module.exports = (sequelize, DataTypes) => {
  const CollegeCourses = sequelize.define('CollegeCourses', {
    college_course_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    college_id: { type: DataTypes.INTEGER },
    course_id: { type: DataTypes.INTEGER },
    project_id: { type: DataTypes.INTEGER }
  });

  CollegeCourses.associate = (models) => {
    if (models.Projects) {
      CollegeCourses.belongsTo(models.Projects, { foreignKey: 'project_id' });
    }

    if (models.Colleges) {
      CollegeCourses.belongsTo(models.Colleges, { foreignKey: 'college_id' });
    }

    if (models.Courses) {
      CollegeCourses.belongsTo(models.Courses, { foreignKey: 'course_id' });
    }
  };

  return CollegeCourses;
};
