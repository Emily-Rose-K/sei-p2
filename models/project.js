'use strict';
module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('project', {
    name: DataTypes.TEXT,
    dateDue: DataTypes.DATEONLY,
    goalId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN,
    teamId: DataTypes.INTEGER
  }, {});
  project.associate = function(models) {
    models.project.belongsTo(models.team)
    models.project.belongsTo(models.goal)
    models.project.hasMany(models.milestone)
  };
  return project;
};