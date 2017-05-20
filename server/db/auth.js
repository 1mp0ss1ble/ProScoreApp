import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import {isStringsAreEqual} from '../util';
var
   mongoose = require('mongoose')
  , config   = require('./config').config
  , teamBase = "postgres://dvzapeelqheaqu:oO5BK3-4tSrIJ-enryi2DbcR8Z@ec2-54-235-108-156.compute-1.amazonaws.com:5432/du0j3d9rj857q"
  , table    = {};

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongodbUri = 'mongodb://writer:Qwerty11@ds161295.mlab.com:61295/soccer';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

var Schema = new mongoose.Schema({
    id : String,
    desc : String,
    tournamentId : String,
    leagueId: String,
    groupId: String,
    seasonId: String,
    createdDate: Date,
    userId: Number,
    teams: Array,
    info: String,
    isActive: Boolean,
});

let Model = mongoose.model('auth', Schema);

conn.on('error', console.error.bind(console, 'connection error:'));



exports.getAll = (req, res) => {
  Model.find((err, data) => {
    if(err){
      return res.status(400).json(err);
    } else {
      return res.json(data);
    }
});
}

/*
exports.get = (desc, res) =>
  Model.findOne({desc : desc}, cb);
*/



exports.add = (req, res) => {
  /*
  if(data.guestId.trim().length < 1) {
    return cb('no description!');
  }
  */
  let model = new Model(req.body);
  model.id = model._id;
  model.desc = model.desc.trim();

  let { errors, isValid } = validateInput(model);

  console.log('errors',errors);

  if(!isValid){
    return res.status(400).json(errors);
  }


  Model.find((err, items) => {
    if(err){
      errors.database = JSON.stringify(err);
      return res.status(400).json(errors);
    }else{

     let filtered = items.filter(t =>
       t.tournamentId === model.tournamentId);

     filtered = model.leagueId ?
       filtered.filter(t => t.leagueId === model.leagueId) : filtered;

     filtered = model.groupId ?
       filtered.filter(t => t.groupId === model.groupId) : filtered;

     const duplicate = filtered.find(t =>
       isStringsAreEqual(t.desc,model.desc));


      console.log('duplicate', duplicate);


      if(duplicate){
        errors.desc = "duplicate season";
        return res.status(400).json(errors);
      } else {
        model.save((err, response)=>{
          if(err){
            errors.database = JSON.stringify(err);
            return res.status(400).json(errors);
          } else {
            return res.json(response);
          }
        });
      }

    }

  });
}


exports.remove = (req, res) =>
  Model.remove(
    {"_id": mongoose.Types.ObjectId(req.body.id)},
    (err,response) => {
    if(err){
      return res.status(400).json(err);
    } else{
      return res.json(response);
    }
  }
);


function validateInput(data){
  let errors = {};

  if(Validator.isEmpty(data.desc.trim())){
    errors.desc = "This field is required";
  }


  if(data.rating && !Validator.isNumeric(data.rating)){
    errors.rating = "This field is for number only";
  }

  if(!data._id || !Validator.isMongoId(data._id.toString())){
    errors._id = "this field is missing or has wrong type";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

exports.update = function(req, res){

  let model = req.body;


  const { errors, isValid } = validateInput(model);

  console.log('errors',errors);

  if(!isValid){
    return res.status(400).json(errors);
  }

  /*
  if(model.desc.trim().length < 1){
     res.status(400).json('Description is empty!');
  }

  if(isNaN(model.rating)){
      res.status(400).('Rating must be number!');
  }
  */



  Model.find((err, items) => {

      if(err){
        errors.database = JSON.stringify(err);
        return res.status(400).json(errors);
      }

      const duplicates = items
                            .filter(t =>
                                t._id.toString() !==
                                model._id.toString())
                            .filter(t =>
                                t.desc.toLowerCase() ===
                                model.desc.toLowerCase());

      if(duplicates.length > 0){
        errors.desc = 'duplicate description!';
        return res.status(400).json(errors);
      } else {
        Model.update({_id: model._id},model, (err, obj) => {
          if(err){
            errors.database = JSON.stringify(err);
            return res.status(400).json(errors);
          } else{
             return res.json(obj);
          }
        });
      }

  });
}
