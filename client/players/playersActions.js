export const fetchRequest = () => (dispatch) =>
	dispatch({type:'FETCH_PLAYERS_REQUEST'});



export const fetchSuccess = (payload) => (dispatch) => 
	dispatch({type:'FETCH_PLAYERS_SUCCESS', payload});
