import { combineReducers } from 'redux';


const tournamentsReducer = (state=[], action) => {

	switch(action.type){
		case 'FETCH_TOURNAMENTS_SUCCESS':	
			return action.payload;
		default:
			return state;
	}
}

const eventsReducer = (state=[], action) => {

	switch(action.type){
		case 'FETCH_EVENTS_SUCCESS':	
			return action.payload;
		default:
			return state;
	}
}


const teamsReducer = (state=[], action) => {

	switch(action.type){
		case 'FETCH_TEAMS_SUCCESS':	
			return action.payload;
		default:
			return state;
	}
}

const matchesReducer = (state=[], action) => {

	switch(action.type){
		case 'FETCH_MATCHES_SUCCESS':	
			return action.payload;
		default:
			return state;
	}
}



const playersReducer = (state=[], action) => {
	switch(action.type){
		case 'FETCH_PLAYERS_SUCCESS':
			return action.payload;
		default:
			return state;
	}
}


const loadersReducer = (state={}, action) => {
	switch(action.type){
		case 'FETCH_TEAMS_REQUEST':
			return {...state, isFetchingTeams:true};
		case 'FETCH_TEAMS_SUCCESS':
			return {...state, isFetchingTeams:false};

		case 'FETCH_PLAYERS_REQUEST':	
			return {...state, isFetchingPlayers:true};
		case 'FETCH_PLAYERS_SUCCESS':
			return {...state, isFetchingPlayers:false};
		
		case 'FETCH_EVENTS_REQUEST':	
			return {...state, isFetchingEvents:true};
		case 'FETCH_EVENTS_SUCCESS':
			return {...state, isFetchingEvents:false};

		default:
		    return state;
	}
}

const modalReducer = (state={}, action) => {
	switch(action.type){
		case 'CLOSE_MODAL':
			return {};
		case 'OPEN_MODAL':
			return {
					isOpened:true,
					modalType:action.modalType,
				 	content:action.payload
				    };
		default:			
			return state;	

	}
}

const rootReducer = combineReducers({
	matches:  matchesReducer, 
	players:  playersReducer,
	tournaments: tournamentsReducer,
	events:  eventsReducer,	
	teams:    teamsReducer,
	loaders:  loadersReducer,
	modal:    modalReducer,
});


export default rootReducer;