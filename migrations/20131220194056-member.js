'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    // logic for transforming into the new state
  	migration
      .createTable('members',
        {
          id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
          },
          email: {
          	type: DataTypes.TEXT,
            allowNull: false,
            unique: true
          },
          from: {
            type: DataTypes.STRING(10),
            allowNull: false
          },
          thirdId: {
            type: DataTypes.STRING(30),
            allowNull: false
          },
          updateFiles:{
          	type: DataTypes.TEXT,
            allowNull: false
          },
          like:{
          	type: DataTypes.TEXT,
            allowNull: false
          },
          dislike:{
          	type: DataTypes.TEXT,
            allowNull: false
          },
          createdAt: {
            type: DataTypes.DATE
          },
          updatedAt: {
            type: DataTypes.DATE
          }
        }, {
        charset: 'utf8',
        timestamp: true
      })
      .success(done)
      .error(done);
  },

  down: function(migration, DataTypes, done) {
    // logic for reverting the changes
  }
};
