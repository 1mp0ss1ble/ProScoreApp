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
    username : String,
    password: String,
    rating : Number,
    createdDate: Date,
});

let Model = mongoose.model('players',Schema);

conn.on('error', console.error.bind(console, 'connection error:'));

const toLower = (text) => text.toString().trim().toLowerCase();

const isFieldExistis = (key, value, models) => {
		const duplicates = models.filter( model =>
			toLower(model[key]) === toLower(value)
		);

		return duplicates.length > 0;
};




exports.getAll = (req, res) =>{
  Model.find((err, data) => {
    if(err){
      return res.status(400).json(err);
    } else {
      return res.json(data);
    }
});
}

exports.add = (data, cb) => {

  if(data.username.trim().length < 1 || data.password.trim().length < 1) {
    return cb('username or password is missing!');
  }


  Model.find((err, models) => {
  	if(isFieldExistis('username', data.username, models)){
  		return cb('username is already taken');
  	} else {
  		let model = new Model(data);
  	    model.id = model._id;
  		model.createdDate = Date.now();
  		model.save(cb)
  	}
  });
}


exports.remove = (id, cb) =>
  Model.remove({"_id": mongoose.Types.ObjectId(id)}, cb);

/*
exports.get = (desc, res) =>
  Model.findOne({desc : desc}, cb);
*/

/*
exports.update = function(model, cb){

  if(model.desc.trim().length < 1){
    return cb('Description is empty!');
  }

  if(isNaN(model.rating)){
      return cb('Rating must be number!');
  }

  Model.find((err, teams) => {
    if(err) {
      return cb(err)
    }
    else {
      const duplicates = teams
                            .filter(t =>
                                t._id.toString() !==
                                model._id.toString())
                            .filter(t =>
                                t.desc.toLowerCase() ===
                                model.desc.toLowerCase());

      if(duplicates.length > 0){
        return cb('duplicate description!', model);
      }
      else{
        Model.update({_id: model._id},model, (err, obj) => {
          return cb(err, obj);
        });
      }
    }
  });
}

*/
