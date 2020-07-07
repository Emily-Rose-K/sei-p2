'use strict';
module.exports = (sequelize, DataTypes) => {
  const goal = sequelize.define('goal', {
    description: DataTypes.TEXT,
    dateDue: DataTypes.DATEONLY,
    owner: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  goal.associate = function(models) {
    models.goal.hasMany(models.project);
    models.goal.belongsTo(models.team);  
  };
  return goal;
};