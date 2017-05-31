import axios from 'axios';
import * as teamActions from '../teams/teamsActions';
import * as playerActions from '../players/playersActions';
import * as matchActions from '../matches/matchesActions';
import * as tournamentActions from '../tournaments/tournamentsActions';
import * as eventActions from '../events/eventsActions';
import * as userActions from '../users/usersActions';
import {types} from '../app/constants';



const getActions = {
		teamActions,
	  eventActions,
		playerActions,
	  tournamentActions,
		matchActions,
		userActions,
};


const constructRoute = (action) => (type) =>
	action && type ? `api/${type}/${action}` : null;



const api = {

	getItems: (type) => () => (dispatch) => {

		const route = constructRoute('get')(type);

		const {fetchRequest, fetchSuccess} = getActions[`${type}Actions`];

		dispatch(fetchRequest());

		return axios.get(route).then(response =>
			dispatch(fetchSuccess(response.data)
		)).catch(err => {
			console.log(err);
		})},

	addItem: (type) => (data) => (dispatch) => {
		const route = constructRoute('add')(type);
		return axios.post(route, data);
	},


	removeItem: (type) =>  (data) => (dispatch) => {
		const route = constructRoute('remove')(type);
		return axios.post(route, data);
	},


	updateItem: (type) => (data) => (dispatch) => {
		const route = constructRoute('update')(type);
		return axios.post(route, data);

	},

	auth : (type) => (data) => (dispatch) => {
		const route  = constructRoute(type)('user');
		return axios.post(route, data);
	},

}

export default api;
