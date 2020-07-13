'use strict';
module.exports = (sequelize, DataTypes) => {
  const team = sequelize.define('team', {
    name: DataTypes.STRING
  }, {});
  team.associate = function(models) {
    models.team.hasMany(models.user)
    models.team.hasMany(models.goal)
    models.team.hasMany(models.project)
    models.team.hasMany(models.milestone)
  };
  return team;
};