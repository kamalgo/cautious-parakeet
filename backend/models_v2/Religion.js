module.exports = (sequelize, DataTypes) => {
  const Religion = sequelize.define('Religion', {
    religion_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    religion_name: {
      type: DataTypes.ENUM('Buddhist', 'Christian', 'Jain', 'Muslim', 'Parsi', 'Sikh', 'Jews', 'Hindu'),
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: { model: 'Projects', key: 'project_id' }
    }
  });

  Religion.associate = (models) => {
    if (models.Projects) {
      Religion.belongsTo(models.Projects, { foreignKey: 'project_id' });
    }
  };

  return Religion;
};
