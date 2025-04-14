module.exports = (sequelize, DataTypes) => {
  const QualificationLevels = sequelize.define('QualificationLevels', {
    qualification_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    qualification_name: { type: DataTypes.STRING(100), allowNull: false },
    project_id: {
      type: DataTypes.INTEGER,
      references: { model: 'Projects', key: 'project_id' }
    }
  });

  QualificationLevels.associate = (models) => {
    if (models.Projects) {
      QualificationLevels.belongsTo(models.Projects, { foreignKey: 'project_id' });
    }
  };

  return QualificationLevels;
};
