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
      // res.send('data');
      Data.find({where:{number:req.query.number},attributes:['urlid','number','city','location','description','like','dislike']}).success(function(d){
        if (d != null)
          res.send({res:'success',data:d});
        else
          res.send({res:'failed',data:null})
      });
    }
  };
  this.all = {
    path: '/all',
    methods: ['get'],
    handler: function (req, res, next) {
      Data.findAll({attributes:['id','urlid','number','city','location','description','like','dislike']}).success(function(d){
        res.send({res:'success',data:d});
      });
    }
  };
  this.like = {
    path: '/like',
    methods: ['get'],
    handler: function (req, res, next) {
      Member.find({where:{thirdId:req.query.userid,tk:req.query.tk}}).success(function(m){
        // console.log(m)
        if(m != null){
          Data.find({where:{id:req.query.id},attributes:['likeIds','like']}).success(function(d){
            console.log(d)
            var _like = d.like + 1;
            var check = 0;
            if(d.likeIds == ''){
              d.likeIds = []
            }
            for (i in d.likeIds){
              if(i == req.query.userid)
                check = 1
            }
            if(check != 1){
              var _likeIds = d.likeIds.push(req.query.userid)
              Data.update({like:_like,likeIds:_likeIds},{id:req.query.id}).success(function(_d){
                res.send({res:'success',data:_d});
              })  
            }
          });  
        }else{
           res.send({res:'failed'}) 
        }
      });
    }
  };
  this.dislike = {
    path: '/dislike',
    methods: ['get'],
    handler: function (req, res, next) {
      Member.find({where:{thirdId:req.query.userid,tk:req.query.tk}}).success(function(m){
        // console.log(m)
        if(m != null){
          Data.find({where:{id:req.query.id},attributes:['dislikeIds','dislike']}).success(function(d){
            var _dislike = d.dislike + 1;
            var check = 0;
            if(d.dislikeIds == ''){
              d.dislikeIds = []
            };
            for (i in d.dislikeIds){
              if(i == req.query.userid)
                check = 1
            };
            if(check != 1){
              var _dislikeIds = d.dislikeIds.push(req.query.userid)
              Data.update({dislike:_dislike,dislikeIds:_dislikeIds},{id:req.query.id}).success(function(_d){
                res.send({res:'success',data:_d});
              })  
            }
          });  
        }else{
           res.send({res:'failed'}) 
        }
      });
    }
  };
  this.youtube = {
    path: '/youtube/:id',
    methods: ['get'],
    handler: function (req, res, next) {
      // Data.findAll({attributes:['urlid','number','city','location','description','like','dislike']}).success(function(d){
      //   res.send({res:'success',data:d});
      // });
    }
  }
};
