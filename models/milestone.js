'use strict';
module.exports = (sequelize, DataTypes) => {
  const milestone = sequelize.define('milestone', {
    name: DataTypes.TEXT,
    dateDue: DataTypes.DATEONLY,
    completedAt: DataTypes.DATE,
    isDone: DataTypes.BOOLEAN,
    owner: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  milestone.associate = function(models) {
    // associations can be defined here
  };
  return milestone;
};