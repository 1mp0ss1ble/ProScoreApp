import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import validateInput from '../shared/validations/checkMatch';

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
    id: String,
    homeId: String,
    originHomeDesc:String,
    originGuestDesc:String,
    guestId: String,
    result: {
      home: String,
      guest: String,
    },
    eventId: String,
    location: String,
    date: String,
    userId: String,
    videoLink: String,
    createdDate: Date,
});

let Model = mongoose.model('matches',Schema);

conn.on('error', console.error.bind(console, 'connection error:'));



exports.getAll = (cb) =>
  Model.find(cb);


/*
exports.get = (desc, res) =>
  Model.findOne({desc : desc}, cb);
*/



exports.add = (req, res) => {


  let model = new Model(req.body);
  model.id = model._id;

 let { errors, isValid } = validateInput(model);

 if(!isValid){
    return res.status(400).json(errors);
 }


  model.save((err, data)=>{
    if(err){
      errors.database = err;
      return res.status(500).json({errors});
    } else {
      return res.json(data);
    }
  })
}


exports.remove = (id, cb) =>
  Model.remove({"_id": mongoose.Types.ObjectId(id)}, cb);



exports.update = function(req, res){

  let model = req.body;
  let { errors, isValid } = validateInput(model);


  if(!isValid){
      return res.status(400).json(errors);
  }

  Model.update({_id: model._id}, model, (err, obj) => {
    if(err){
      errors.database = JSON.stringify(err);
      return res.status(500).json(errors);
    } else{
      return res.json(obj);
    }

  });
}
