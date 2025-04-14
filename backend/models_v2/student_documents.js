module.exports = (sequelize, DataTypes) => {
  const student_documents = sequelize.define('student_documents', {
    document_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    student_id: { type: DataTypes.INTEGER },
    project_id: { type: DataTypes.INTEGER },
    academic_year_id: { type: DataTypes.INTEGER },
    document_type_id: { type: DataTypes.INTEGER },
    version_number: { type: DataTypes.INTEGER, defaultValue: 1 },
    document_url: { type: DataTypes.TEXT },
    uploaded_on: { type: DataTypes.DATE },
    is_latest: { type: DataTypes.BOOLEAN, defaultValue: true },
    remarks: { type: DataTypes.TEXT },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false }
  });

  student_documents.associate = (models) => {
    if (models.Projects) {
      student_documents.belongsTo(models.Projects, { foreignKey: 'project_id' });
    }

    if (models.Academic_years) {
      student_documents.belongsTo(models.Academic_years, { foreignKey: 'academic_year_id' });
    }

    if (models.Document_Types) {
      student_documents.belongsTo(models.Document_Types, { foreignKey: 'document_type_id' });
    }
  };

  return student_documents;
};
