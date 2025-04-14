module.exports = (sequelize, DataTypes) => {
  const MaritalStatus = sequelize.define('MaritalStatus', {
    marital_status_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    marital_status: {
      type: DataTypes.ENUM('Married', 'Unmarried'),
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: { model: 'Projects', key: 'project_id' }
    }
  });

  MaritalStatus.associate = (models) => {
    if (models.Projects) {
      MaritalStatus.belongsTo(models.Projects, { foreignKey: 'project_id' });
    }
  };

  return MaritalStatus;
};
