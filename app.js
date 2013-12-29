'use strict';

var path = require('path');

module.exports = function (done) {

  this.express(function (app, express) {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
      res.setHeader("Content-Type", "multipart/form-data");
      res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.setHeader("Access-Control-Allow-Origin", "*");
      return next();
    });
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
  });

  this.routes();

  done();
};
