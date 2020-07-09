'use strict';
module.exports = (sequelize, DataTypes) => {
  const goal = sequelize.define('goal', {
    description: DataTypes.TEXT,
    dateDue: DataTypes.DATEONLY,
    owner: DataTypes.STRING,
    teamId: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN
  }, {});
  goal.associate = function(models) {
    models.goal.belongsTo(models.team)
    models.goal.hasMany(models.project)
  };
  return goal;
};