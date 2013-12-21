'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('members', {
  	id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true
    },
    thirdId: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    from: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    tk: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    updateFiles: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    like: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dislike: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  });
};
