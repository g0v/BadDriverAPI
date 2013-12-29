'use strict';

module.exports = function ($youmeb,$sequelize) {
   var Member = $sequelize.model('members');
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
  this.updatetk = {
    path: '/update',
    methods: ['all'],
    handler: function (req, res, next) {
      // console.log(req.body.id)
      Member.update({tk:req.body.tk},{thirdId:req.body.id}).success(function(d){
        // console.log(d)
      }).error(function(e){
        // console.log(e)
      })
      res.send('member');
    }
  };
  this.add = {
    path: '/add',
    methods: ['post'],
    handler: function (req, res, next) {
      //console.log(req);
      Member.findOrCreate({thirdId:req.body.thirdId},{
        name:req.body.fb_name,
        email:req.body.email,
        from:req.body.thirdparty_type,
        updateFiles:'',
        like:'',
        dislike:'',
        tk:'testtesttest'
      }).success(function(member){
        // console.log(member);
        res.send({res:'success',token:'123'});
      })
      res.send('member');
    }
  };
  this.getOne = {
    path: '/get/:id',
    methods: ['all'],
    handler: function (req, res, next) {
      // console.log(req.params.id)
      res.send('member');
    }
  };
};
