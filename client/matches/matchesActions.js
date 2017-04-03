export const fetchRequest = () => (dispatch) =>
	dispatch({type:'FETCH_MATCHES_REQUEST'});



export const fetchSuccess = (payload) => (dispatch) => 
	dispatch({type:'FETCH_MATCHES_SUCCESS', payload});
