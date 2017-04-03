import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';


export default function validateInput(data){
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

