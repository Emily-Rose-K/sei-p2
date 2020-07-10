'use strict';
module.exports = (sequelize, DataTypes) => {
  const milestone = sequelize.define('milestone', {
    description: DataTypes.TEXT,
    dateDue: DataTypes.DATEONLY,
    completedAt: DataTypes.DATE,
    isDone: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  milestone.associate = function(models) {
    models.milestone.belongsTo(models.project)
    models.milestone.belongsTo(models.user)
  };
  return milestone;
};