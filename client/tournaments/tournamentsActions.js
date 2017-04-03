export const fetchRequest = () => (dispatch) =>
	dispatch({type:'FETCH_TOURNAMENTS_REQUEST'});



export const fetchSuccess = (payload) => (dispatch) => 
	dispatch({type:'FETCH_TOURNAMENTS_SUCCESS', payload});
