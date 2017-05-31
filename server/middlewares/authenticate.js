import jwt from 'jsonwebtoken';
import config from '../util/config';
import userDb  from '../db/user';

  export default (req, res, next) => {

      const authorizationHeader = req.headers['authorization'];
      let token;

      if(authorizationHeader){
        token = authorizationHeader.split(' ')[1];
      }

      if(token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
          if(err){
            return res.status(401).json({error:'failed to authenticate'});
          } else{
            userDb.get({_id:decoded._id},(err, user) => {
                //return res.json({err,user});
                if(!user){
                  return res.status(404).json({error: 'no such user'});
                } else{
                  req.currentUser =  user;
                  next();
                }
            });

          }
        })
      } else {
        return res.status(403).json({error: 'no token provided'});
      }
      //console.log(req.header)
  }
