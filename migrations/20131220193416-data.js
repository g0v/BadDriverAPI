'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    // logic for transforming into the new state
  	migration
      .createTable('datas',
        {
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
