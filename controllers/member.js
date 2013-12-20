'use strict';

module.exports = function ($youmeb) {
   var Member = $sequelize.model('member');
  this.$({
    name: 'member',
    path: '/member'
  });


  this.index = {
    path: '/',
    methods: ['all'],
    handler: function (req, res, next) {
      res.send('member');
    }
  };

  this.add = {
    path: '/add',
    methods: ['post'],
    handler: function (req, res, next) {
      res.send('member');
    }
  };
  this.getOne = {
    path: '/get/:id',
    methods: ['all'],
    handler: function (req, res, next) {
      console.log(req.params.id)
      res.send('member');
    }
  };
};
