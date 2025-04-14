module.exports = (sequelize, DataTypes) => {
  const Colleges = sequelize.define('Colleges', {
    college_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    college_name: { type: DataTypes.STRING(255), allowNull: false },
    project_id: {
      type: DataTypes.INTEGER,
      references: { model: 'Projects', key: 'project_id' }
    }
  });

  Colleges.associate = (models) => {
    if (models.Projects) {
      Colleges.belongsTo(models.Projects, { foreignKey: 'project_id' });
    }

    if (models.CollegeCourses) {
      Colleges.hasMany(models.CollegeCourses, { foreignKey: 'college_id' });
    }
  };

  return Colleges;
};
