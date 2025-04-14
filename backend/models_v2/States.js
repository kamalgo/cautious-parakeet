module.exports = (sequelize, DataTypes) => {
  const States = sequelize.define('States', {
    state_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    state_name: { type: DataTypes.STRING(100), allowNull: false },
    project_id: {
      type: DataTypes.INTEGER,
      references: { model: 'Projects', key: 'project_id' }
    }
  });

  States.associate = (models) => {
    if (models.Projects) {
      States.belongsTo(models.Projects, { foreignKey: 'project_id' });
    }

    if (models.Districts) {
      States.hasMany(models.Districts, { foreignKey: 'state_id' });
    }

    if (models.Talukas) {
      States.hasMany(models.Talukas, { foreignKey: 'state_id' });
    }
  };

  return States;
};
