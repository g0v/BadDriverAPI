'use strict';


module.exports = function ($youmeb) {
 var Data = $sequelize.model('data');
 
  this.$({
    name: 'data',
    path: '/data'
  });

  this.index = {
    path: '/',
    methods: ['all'],
    handler: function (req, res, next) {
      res.send('data');
    }
  };
  this.getOne = {
    path: '/get/:id',
    methods: ['get'],
    handler: function (req, res, next) {
      console.log(req.params.id)
      res.send('data');
    }
  };
  this.search = {
    path: '/search',
    methods: ['get'],
    handler: function (req, res, next) {
      res.send('data');
    }
  };
  this.all = {
    path: '/all',
    methods: ['get'],
    handler: function (req, res, next) {
      res.send('data');
    }
  };
};
