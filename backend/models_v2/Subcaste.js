module.exports = (sequelize, DataTypes) => {
  const Subcaste = sequelize.define('Subcaste', {
    subcaste_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    subcaste_name: { type: DataTypes.STRING, allowNull: false },
    caste_category_id: {
      type: DataTypes.INTEGER,
      references: { model: 'CasteCategory', key: 'caste_category_id' }
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: { model: 'Projects', key: 'project_id' }
    }
  });

  Subcaste.associate = (models) => {
    if (models.Projects) {
      Subcaste.belongsTo(models.Projects, { foreignKey: 'project_id' });
    }

    if (models.CasteCategory) {
      Subcaste.belongsTo(models.CasteCategory, { foreignKey: 'caste_category_id' });
    }
  };

  return Subcaste;
};
