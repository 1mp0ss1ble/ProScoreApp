import isEmpty from 'lodash/isEmpty';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Validator from 'validator';
import {isStringsAreEqual} from '../util';
import validateInput from '../shared/validations/checkSignup';
var
   mongoose = require('mongoose')
  , config   = require('./config').config
  , teamBase = "postgres://dvzapeelqheaqu:oO5BK3-4tSrIJ-enryi2DbcR8Z@ec2-54-235-108-156.compute-1.amazonaws.com:5432/du0j3d9rj857q"
  , table    = {};

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } },
};

var mongodbUri = 'mongodb://writer:Qwerty11@ds161295.mlab.com:61295/soccer';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

var Schema = new mongoose.Schema({
    id : String,
    username: String,
    password: String,
    createdDate: Date,
});

let Model = mongoose.model('users', Schema);

conn.on('error', console.error.bind(console, 'connection error:'));



exports.getAll = (req, res) => {
  Model.find({}).then(data =>
    res.json(data)
  ).catch(err =>
    res.status(400).json(data)
  );
}

/*
exports.get = (desc, res) =>
  Model.findOne({desc : desc}, cb);
*/

exports.login = (req, res) => {
  const { username, password } = req.body;

  Model.find().then(users => {
    var user = users.find( u => isStringsAreEqual(u.username, username));
    if(user){
      if(bcrypt.compareSync(password, user.password)){
        const token = jwt.sign({_id: user._id, username: user.username}, "jwt-secret");
        return res.json({token});
      } else {
        return res.status(400).json({form: "Invalid credentials!"});
      }
    } else{
        return res.status(400).json({form: "Invalid credentials!"});
    }
  }).catch( err => res.status(400).json({err}));
}

exports.add = (req, res) => {

  let model = new Model(req.body);
  let { errors, isValid } = validateInput(model);

  if(!isValid){
    return res.status(400).json(errors);
  }

  Model.find().then(items => {
    const filtered = items.filter( item => isStringsAreEqual(item.username, model.username));
    if(!filtered.length){
      model.password = bcrypt.hashSync(model.password, 10);
      model.save(model)
      .then(response => res.json(response))
      .catch(err => res.status(400).json(err));
    } else {
      errors.username = "such username already exists!";
      return res.status(400).json(errors);
    }
  }).catch(err => res.status(400).json(err));
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


exports.update = function(req, res){

  let model = req.body;
  const { errors, isValid } = validateInput(model);
  console.log('errors',errors);

  if(!isValid){
    return res.status(400).json(errors);
  }

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
