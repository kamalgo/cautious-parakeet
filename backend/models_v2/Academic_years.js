module.exports = (sequelize, DataTypes) => {
    const Academic_years = sequelize.define('Academic_years', {
      academic_year_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      academic_year: { type: DataTypes.STRING(100), allowNull: false },
      project_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Projects', key: 'project_id' }
      }
    });
  

    Academic_years.associate = (models) => {
      // Safe check before calling associations
      if (models.Projects?.prototype instanceof sequelize.Sequelize.Model) {
        Academic_years.belongsTo(models.Projects, { foreignKey: 'project_id' });
      }
    
      if (models.student_documents?.prototype instanceof sequelize.Sequelize.Model) {
        Academic_years.hasMany(models.student_documents, { foreignKey: 'academic_year_id' });
      }
    };
    // Academic_years.associate = (models) => {
    //   Academic_years.belongsTo(models.Projects, { foreignKey: 'project_id' });
    //   Academic_years.hasMany(models.student_documents, { foreignKey: 'academic_year_id' });
    // };
  
    return Academic_years;
  };
  