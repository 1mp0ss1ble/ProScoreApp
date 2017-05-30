import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';


export default function validateInput(data){
  let errors = {};


  if(Validator.isEmpty(data.username.trim())){
    errors.username = "This field is required";
  }

  if(Validator.isEmpty(data.password.trim())){
    errors.password = "This field is required";
  }


  return {
    errors,
    isValid: isEmpty(errors),
  }
}
