import api from './';
import {types} from '../app/constants';


const customizedApi = {
	teams: generateApiMethods(types.team),
	matches: generateApiMethods(types.match),
	tournaments:generateApiMethods(types.tournament),
	events: generateApiMethods(types.event),
	users: {
		...generateApiMethods(types.user),
		signup: api.auth('signup'),
		login: api.auth('login'),
	},
	auth : {
		signup: api.auth('signup'),
	},
	//setToken: setToken,
}




function generateApiMethods(type){
	return {
		get: api.getItems(type),
		add: api.addItem(type),
		update: api.updateItem(type),
		remove: api.removeItem(type),
	};
}


function setToken(token){
	console.log(token);
}

export default customizedApi;
