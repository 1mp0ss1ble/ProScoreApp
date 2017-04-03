
export const fetchRequest = () => (dispatch) =>
	dispatch({type:'FETCH_EVENTS_REQUEST'});



export const fetchSuccess = (payload) => (dispatch) => 
	dispatch({type:'FETCH_EVENTS_SUCCESS', payload});
