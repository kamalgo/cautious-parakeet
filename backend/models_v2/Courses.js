module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define('Courses', {
    course_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    course_name: { type: DataTypes.STRING(255), allowNull: false },
    project_id: {
      type: DataTypes.INTEGER,
      references: { model: 'Projects', key: 'project_id' }
    }
  });

  Courses.associate = (models) => {
    if (models.Projects) {
      Courses.belongsTo(models.Projects, { foreignKey: 'project_id' });
    }

    if (models.CollegeCourses) {
      Courses.hasMany(models.CollegeCourses, { foreignKey: 'course_id' });
    }
  };

  return Courses;
};
