import axios from 'axios';
import * as teamActions from '../teams/teamsActions';
import * as playerActions from '../players/playersActions';
import * as matchActions from '../matches/matchesActions';
import * as tournamentActions from '../tournaments/tournamentsActions';
import * as eventActions from '../events/eventsActions';
import {types} from '../app/constants';



const getActions = (type) => {
	if(type === 'team') {
		return teamActions;
	} 
	if(type === 'event') {
		return eventActions;
	} 

	if(type === 'player') {
		return playerActions;
	}

	if(type === 'match') {
		return matchActions;
	}

	if(type === 'tournament') {
		return tournamentActions;
	}

}


const constructRoute = (action) => (type) => 
	action && type ? `api/${type}/${action}` : null;
 


const api = {
	
	getItems: (type) => () => (dispatch) => {		

		const route = constructRoute('get')(type);

		const actions  = getActions(type);

		const {fetchRequest, fetchSuccess} = actions;

		dispatch(fetchRequest());
		
		return axios.get(route).then(response =>
				dispatch(fetchSuccess(response.data.models))
		)},	


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

	}

}

export default api;



