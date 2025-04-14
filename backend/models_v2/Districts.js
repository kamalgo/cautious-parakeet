module.exports = (sequelize, DataTypes) => {
  const Districts = sequelize.define('Districts', {
    district_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    district_name: { type: DataTypes.STRING(100), allowNull: false },
    state_id: { type: DataTypes.INTEGER },
    project_id: { type: DataTypes.INTEGER }
  });

  Districts.associate = (models) => {
    if (models.Projects) {
      Districts.belongsTo(models.Projects, { foreignKey: 'project_id' });
    }

    if (models.States) {
      Districts.belongsTo(models.States, { foreignKey: 'state_id' });
    }

    if (models.Talukas) {
      Districts.hasMany(models.Talukas, { foreignKey: 'district_id' });
    }
  };

  return Districts;
};
