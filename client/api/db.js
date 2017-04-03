import api from './';
import {types} from '../app/constants';


const customizedApi = {
	teams: {
		get: api.getItems(types.team),
		add: api.addItem(types.team),
		update: api.updateItem(types.team),
		remove: api.removeItem(types.team),
	},
	matches: {
		get: api.getItems(types.match),
		add: api.addItem(types.match),
		update: api.updateItem(types.match),
		remove: api.removeItem(types.match),
	},
	tournaments: {
		get: api.getItems(types.tournament),
		add: api.addItem(types.tournament),
		update: api.updateItem(types.tournament),
		remove: api.removeItem(types.tournament),
	},
	events: {
		get: api.getItems(types.event),
		add: api.addItem(types.event),
		update: api.updateItem(types.event),
		remove: api.removeItem(types.event),
	}

}

export default customizedApi;


