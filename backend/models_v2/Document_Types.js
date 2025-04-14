module.exports = (sequelize, DataTypes) => {
  const Document_Types = sequelize.define('Document_Types', {
    document_type_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    document_name: { type: DataTypes.STRING(255), allowNull: false },
    project_id: {
      type: DataTypes.INTEGER,
      references: { model: 'Projects', key: 'project_id' }
    }
  });

  Document_Types.associate = (models) => {
    if (models.Projects) {
      Document_Types.belongsTo(models.Projects, { foreignKey: 'project_id' });
    }

    if (models.student_documents) {
      Document_Types.hasMany(models.student_documents, { foreignKey: 'document_type_id' });
    }
  };

  return Document_Types;
};
