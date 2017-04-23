import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import moment from 'moment';


export default function validateInput(data){
  let errors = {};

  let validIds = true;
  
  if(!data.homeId || !Validator.isMongoId(data.homeId.toString())){
    errors.homeId = "Missing or has wrong type";
    validIds = false;
  }

  if(!data.guestId || !Validator.isMongoId(data.guestId.toString())){
    errors.guestId = "Missing or has wrong type";
    validIds = false;
  }

  if(validIds && Validator.equals(data.homeId.toString(), data.guestId.toString())){
      errors.homeId = "Same team!";
  }


  if(!data.eventId || !Validator.isMongoId(data.eventId.toString())){
    errors.eventId = "Missing or has wrong type";
  }


  if(!data.date || !moment(data.date, "DD/MM/YYYY").isValid()){
  	errors.date = "Date format must be DD/MM/YYYY";
  }



  if( data.result 
      && data.result.home 
      && !Validator.isNumeric(data.result.home) ){

    if(!errors.result) 
      errors.result = {};
    errors.result.home =  "This field is for number only";
  }

  if( data.result 
      && data.result.guest 
      && !Validator.isNumeric(data.result.guest) ){
    if(!errors.result) 
      errors.result = {};
    errors.result.guest = "This field is for number only";
  }
  

  return {
    errors,
    isValid: isEmpty(errors),
  }
}