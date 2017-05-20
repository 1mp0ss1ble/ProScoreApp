import api from './';
import {types} from '../app/constants';


const customizedApi = {
	teams: generateApiMethods(types.team),
	matches: generateApiMethods(types.match),
	tournaments:generateApiMethods(types.tournament),
	events: generateApiMethods(types.event),
	auth : {
		signup: api.auth('signup')
	},
}


function generateApiMethods(type){
	return {
		get: api.getItems(type),
		add: api.addItem(type),
		update: api.updateItem(type),
		remove: api.removeItem(type),
	};
}

export default customizedApi;
