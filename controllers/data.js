'use strict';


module.exports = function ($youmeb,$sequelize) {
  var Data = $sequelize.model('datas');
  var Member = $sequelize.model('members');
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

  this.add = {
    path: '/add',
    methods: ['post'],
    handler: function (req, res, next) {
      Member.find({where:{id:req.body.id,tk: req.body.tk}}).success(function(d){
        console.log(d)
        Data.findOrCreate({urlid: req.body.urlid},{
          number: req.body.number,
          city: req.body.city,
          location: req.body.location,
          description: req.body.description,
          like:'',
          likeIds: '',
          dislike: '',
          dislikeIds: '',
          proposer: '',
          proposerid: '',
          from: ''
        }).success(function(member){
          console.log(member);
          res.send({res:'success',token:'123'});
        });
      })
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
      // res.send('data');
      Data.findAll({attributes:['urlid','number','city','location','description','like','dislike']}).success(function(member){
          // console.log(member);
          res.send({res:'success',data:member});
      });
    }
  };
};
