module.exports = (sequelize, DataTypes) => {
  const Talukas = sequelize.define('Talukas', {
    taluka_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    taluka_name: { type: DataTypes.STRING(100), allowNull: false },
    state_id: { type: DataTypes.INTEGER },
    district_id: { type: DataTypes.INTEGER },
    project_id: { type: DataTypes.INTEGER }
  });

  Talukas.associate = (models) => {
    if (models.Projects) {
      Talukas.belongsTo(models.Projects, { foreignKey: 'project_id' });
    }

    if (models.States) {
      Talukas.belongsTo(models.States, { foreignKey: 'state_id' });
    }

    if (models.Districts) {
      Talukas.belongsTo(models.Districts, { foreignKey: 'district_id' });
    }
  };

  return Talukas;
};
