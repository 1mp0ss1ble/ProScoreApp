import validateInput from '../shared/validations/checkTournamentFields';

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
    leagues : Array,
    sponsor: String,
    banner: String,
    website: String,
    createdDate: Date,
});

let Model = mongoose.model('tournaments',Schema);

conn.on('error', console.error.bind(console, 'connection error:')); 



exports.getAll = (cb) => 
  Model.find(cb);


/*
exports.get = (desc, res) =>  
  Model.findOne({desc : desc}, cb);
*/


function generateDefaultLeagues(){
  let defautLeagues = [];

  for(let i =0; i <10; i++){

    let defautlGroups = [
      {_id: new mongoose.Types.ObjectId(), desc: 'Group A' },
      {_id: new mongoose.Types.ObjectId(), desc: 'Group B' },
      {_id: new mongoose.Types.ObjectId(), desc: 'Group C' },
      {_id: new mongoose.Types.ObjectId(), desc: 'Group D' },
    ];

    let desc = i === 0 ? "Premier League" : `League ${i}`;

    defautLeagues.push({
      _id: new mongoose.Types.ObjectId(),
      desc,
      groups: defautlGroups,
    });

  }

  return defautLeagues;
  
}

exports.add = (req, res) => {
  /*
  if(data.guestId.trim().length < 1) {
    return cb('no description!');
  }
  */
  let model = new Model(req.body);
  
  model.desc = model.desc.trim();


  let { errors, isValid } = validateInput(model);


  if(!isValid){
    return res.status(400).json(errors);
  }

  Model.find((err, founded) => {
    if(err){
      err.database = JSON.stringify(err);
      return res.status(400).json(errors);
    } else {
      const duplicate = founded.find(t => 
        t.desc.toLowerCase() === model.desc.toLowerCase()); 

      if(duplicate){
        errors.desc = 'duplicate description';
        return res.status(400).json(errors);
      } else {
        model.id = model._id;
        model.leagues = generateDefaultLeagues();
        model.save((err,response) => {
          if(err){
            errors.database = JSON.stringify(err);
            return res.status(500).json(errors);
          }else{
            return res.json(response);
          }
        });
      }
    }
  });

  
}


exports.remove = (id, cb) => 
  Model.remove({"_id": mongoose.Types.ObjectId(id)}, cb);    




exports.update = function(req, res){
    
  let model = req.body;
 
 
  let { errors, isValid } = validateInput(model);


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




