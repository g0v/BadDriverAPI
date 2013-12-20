'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('members', {
  	id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true
    },
    urlid: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    number: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    like: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    likeIds: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dislike: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    dislikeIds: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    proposer: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    proposerid: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    tk: {
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
