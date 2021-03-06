'use strict';


module.exports = function ($youmeb,$sequelize) {
  var Data = $sequelize.model('datas');
  var Member = $sequelize.model('members');
  var youtube = require('youtube-feeds')
  
  var AWS = require('aws-sdk');
  var s3 = new AWS.S3();
  var fs = require('fs');
  AWS.config.loadFromPath('./config.json');
  var crypto = require('crypto');

  youtube.httpProtocol = 'https'

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
      // console.log(req.params.id);
      Data.find({where:{id:req.params.id},attributes:['urlid','number','city','location','description','like','dislike','from','imgpool']}).success(function(d){
        res.send({res:'success',data:d});
      });
      // res.send('data');
    }
  };

  this.add = {
    path: '/add',
    methods: ['post'],
    handler: function (req, res, next) {
      Member.find({where:{id:req.body.id,tk: req.body.tk}}).success(function(d){
        console.log(d)
        if (req.body.urlid == 'none'){
          req.body.urlid = new Date().getTime()+req.body.id
          var imgpool = req.body.imgpool
          var from = 'image'
        }else{
          var imgpool = ''
          var from = 'youtube'
        }
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
          proposerid: req.body.id,
          imgpool: imgpool,
          from: from
        }).success(function(member){
          res.send({res:'success'});
        });
      })
      // res.send('data');
    }
  };

  this.uploadimg = {
    path: '/upload/img',
    methods: ['all'],
    handler: function( req, res, next){
      console.log(req.files.file)
      var s3 = new AWS.S3();
      var _now = new Date();
      var sArray = req.files.file.name.split(/(.jpg|.gif|.png|.jpeg)/);
      var _re = crypto.createHash('md5').update(sArray[0]+_now).digest("hex");
      _re = _re+sArray[1];
      fs.readFile('/'+req.files.file.path, function (_err, data) {
          var params = {Bucket: 'baddriver',Key:_re,Body:data,ACL: 'public-read'};
          s3.putObject(params, function (err, data) {
            //console.log(err);
            if (err) {
            } else {
              fs.unlink('/'+req.files.file.path, function() {
                if (err) throw err;
                res.send({n:_re});
              });
            }
          });
      });
    }
  };

  this.search = {
    path: '/search',
    methods: ['get'],
    handler: function (req, res, next) {
      // res.send('data');
      Data.findAll({where:{number:req.query.number},attributes:['id','urlid','number','city','location','description','like','dislike','from','imgpool']}).success(function(d){
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
      Data.findAll({attributes:['id','urlid','number','city','location','description','like','dislike','from','imgpool']}).success(function(d){
        res.send({res:'success',data:d});
      });
    }
  };
  this.last = {
    path: '/last',
    methods: ['get'],
    handler: function (req, res, next) {
      Data.findAll({attributes:['id','urlid','number','city','location','description','like','dislike','from','imgpool'],limit: 3,order: 'id DESC'}).success(function(d){
        res.send({res:'success',data:d});
      });
    }
  };
  
  this.like = {
    path: '/like',
    methods: ['get'],
    handler: function (req, res, next) {
      Member.find({where:{thirdId:req.body.userid,tk:req.body.tk}}).success(function(m){
        // console.log(m)
        if(m != null){
          Data.find({where:{id:req.body.id},attributes:['likeIds','like']}).success(function(d){
            // console.log(d)
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
              var _likeIds = d.likeIds.push(req.body.userid)
              Data.update({like:_like,likeIds:_likeIds},{id:req.body.id}).success(function(_d){
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
    methods: ['post'],
    handler: function (req, res, next) {
      Member.find({where:{thirdId:req.body.userid,tk:req.body.tk}}).success(function(m){
        // console.log(m)
        if(m != null){
          Data.find({where:{id:req.body.id},attributes:['dislikeIds','dislike']}).success(function(d){
            var _dislike = d.dislike + 1;
            var check = 0;
            if(d.dislikeIds == ''){
              d.dislikeIds={}
              d.dislikeIds.data = []
            }else{
              d.dislikeIds = JSON.parse(d.dislikeIds);
            }
            for (var _i =0;_i<d.dislikeIds.data.length;_i++){
              if(d.dislikeIds.data[_i] == m.id)
                check = 1
            };
            if(check != 1){
              d.dislikeIds.data.push(m.id);
              var _dislikeIdsjson = JSON.stringify(d.dislikeIds);
              Data.update({dislike:_dislike,dislikeIds:_dislikeIdsjson},{id:req.body.id}).success(function(_d){
                res.send({res:'success',data:_d});
              })  
            }else{
              res.send({res:'voted'}) ;
            }

          });  
        }else{
           res.send({res:'failed'}) 
        }
      });
    }
  };
  
  this.youtube = {
    path: '/youtube',
    methods: ['get'],
    handler: function (req, res, next) {
      youtube.video(req.query.id).details( function( err, data ) {
        if( err instanceof Error ) {
          //console.log( err )
          res.send({res:'failed',data:err})
        } else {
          res.send({res:'success',data:data})
        }
      } 
      )
      // Data.findAll({attributes:['urlid','number','city','location','description','like','dislike']}).success(function(d){
      //   res.send({res:'success',data:d});
      // });
    }
  }
};
