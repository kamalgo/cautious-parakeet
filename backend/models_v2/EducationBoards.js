module.exports = (sequelize, DataTypes) => {
  const EducationBoards = sequelize.define('EducationBoards', {
    board_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    board_name: { type: DataTypes.STRING(255), allowNull: false },
    project_id: {
      type: DataTypes.INTEGER,
      references: { model: 'Projects', key: 'project_id' }
    }
  });

  EducationBoards.associate = (models) => {
    if (models.Projects) {
      EducationBoards.belongsTo(models.Projects, { foreignKey: 'project_id' });
    }
  };

  return EducationBoards;
};
