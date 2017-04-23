import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';


export default function validateInput(data){
  let errors = {};
  
  /*
  if(Validator.isEmpty(data.desc.trim())){
    errors.desc = "This field is required";
  }
  */
  
  if(!(data.isActive === true || data.isActive === false)){
    errors.isActive = "This field can be true or false";
  }
  
  if( !data.tournamentId 
      || !Validator.isMongoId(data.tournamentId.toString())){
    errors.tournamentId = "This field is required or has wrong type";
  }

  
 if(data.leagueId && !Validator.isMongoId(data.leagueId.toString())){
    errors.leagueId = "This field is has wrond type";
  }

  if( data.groupId && 
     !Validator.isMongoId(data.groupId.toString())){
    errors.groupId = "This field is has wrond type";
  }


  if(data.rating && !Validator.isNumeric(data.rating)){
    errors.rating = "This field is for number only";
  }

  if(data.hasOwnProperty("_id")){
    if(data._id && !Validator.isMongoId(data._id.toString())){
      errors._id = "this field is missing or has wrong type";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}