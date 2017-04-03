


export const fetchRequest = () => (dispatch) =>
	dispatch({type:'FETCH_TEAMS_REQUEST'});



export const fetchSuccess = (payload) => (dispatch) => 
	dispatch({type:'FETCH_TEAMS_SUCCESS', payload});
