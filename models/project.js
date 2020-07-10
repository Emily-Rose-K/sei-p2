'use strict';
module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('project', {
    name: DataTypes.TEXT,
    dateDue: DataTypes.DATEONLY,
    owner: DataTypes.STRING,
    goalId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN
  }, {});
  project.associate = function(models) {
    models.project.hasMany(models.milestone)
    models.project.belongsTo(models.goal)
    models.project.belongsTo(models.user)
  };
  return project;
};