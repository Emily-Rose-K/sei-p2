'use strict';
module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('project', {
    name: DataTypes.TEXT,
    dateDue: DataTypes.DATEONLY,
    owner: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  project.associate = function(models) {
    // associations can be defined here
  };
  return project;
};