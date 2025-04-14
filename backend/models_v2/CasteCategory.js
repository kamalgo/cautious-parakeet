module.exports = (sequelize, DataTypes) => {
  const CasteCategory = sequelize.define('CasteCategory', {
    caste_category_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    caste_category_name: { type: DataTypes.STRING, allowNull: false, unique: true },
    project_id: {
      type: DataTypes.INTEGER,
      references: { model: 'Projects', key: 'project_id' }
    }
  });

  CasteCategory.associate = (models) => {
    if (models.Projects) {
      CasteCategory.belongsTo(models.Projects, { foreignKey: 'project_id' });
    }

    if (models.Subcaste) {
      CasteCategory.hasMany(models.Subcaste, { foreignKey: 'caste_category_id' });
    }
  };

  return CasteCategory;
};
