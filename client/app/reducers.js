import { combineReducers } from 'redux';
import { pluralNamesArray } from './constants';


const modelsReducer = (type) => (state = [], action) => {
	switch(action.type){
		case `FETCH_${type}_SUCCESS`:
			return action.payload;
		default:
			return state;
   }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


const loadersReducer = (state = {}, action) => {

 const names = action.type.split('_');
 const pattern = /^FETCH_[A-Z]+_FAIL|SUCCESS|REQUEST$/i;

 if(!pattern.test(action.type)) {
 	return state;
 }

 const pluralName = names[1].toLowerCase();

 if(pluralName && pluralNamesArray().indexOf(pluralName) !== -1){
		const propName = "isFetching" + capitalizeFirstLetter(pluralName);

		switch(action.type){
			case `FETCH_${pluralName}_REQUEST`:
				return {...state, [propName]: true};
			case `FETCH_${pluralName}_SUCCESS`:
				return {...state, [propName]: false};
			case `FETCH_${pluralName}_FAIL`:
				return {...state, [propName]: false};
			default:
				return state;
		}
	} else{
		return state;
	}
}

const modalReducer = (state = {}, action) => {
	switch(action.type){
		case 'CLOSE_MODAL':
			return {};
		case 'OPEN_MODAL':
			return {
					isOpened: true,
					modalType: action.modalType,
				 	content: action.payload
				    };
		default:
			return state;
	}
}

const authReducer = (state={}, action) => {
	switch(action.type){
		case 'SET_CURRENT_USER':
		return {...state, user: action.payload};
		default:
		return state;
	}
}

const rootReducer = combineReducers({
	matches:  modelsReducer('MATCHES'),
	players:   modelsReducer('PLAYERS'),
	tournaments:  modelsReducer('TOURNAMENTS'),
	events:   modelsReducer('EVENTS'),
	teams:     modelsReducer('TEAMS'),
	users:  modelsReducer('USERS'),
	loaders:  loadersReducer,
	modal:    modalReducer,
	auth: authReducer,
});


export default rootReducer;
