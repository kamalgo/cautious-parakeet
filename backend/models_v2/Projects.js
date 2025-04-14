module.exports = (sequelize, DataTypes) => {
    const Projects = sequelize.define('Projects', {
      project_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      project_name: { type: DataTypes.STRING(100), allowNull: false, unique: true }
    });
  
    Projects.associate = (models) => {
      // Add associations if needed later
    };
  
    return Projects;
  };
  