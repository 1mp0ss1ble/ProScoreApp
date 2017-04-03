import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';

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
    homeId : String,
    guestId : String,
    result: String,
    event : String,  
    date: Date,
});

let Model = mongoose.model('matches',Schema);

conn.on('error', console.error.bind(console, 'connection error:')); 



exports.getAll = (cb) => 
  Model.find(cb);


/*
exports.get = (desc, res) =>  
  Model.findOne({desc : desc}, cb);
*/



exports.add = (data, cb) => {
  /*
  if(data.guestId.trim().length < 1) {
    return cb('no description!');
  }
  */
  let model = new Model(data);
  model.id = model._id;
  model.save(cb)
}


exports.remove = (id, cb) => 
  Model.remove({"_id": mongoose.Types.ObjectId(id)}, cb);    


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



  Model.find((err, teams) => {
      
      if(err){
        errors.database = JSON.stringify(err);
        return res.status(400).json(errors);
      }

      const duplicates = teams
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




