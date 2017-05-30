
export const fetchRequest = () => (dispatch) =>
	dispatch({type:'FETCH_USERS_REQUEST'});



export const fetchSuccess = (payload) => (dispatch) =>
	dispatch({type:'FETCH_USERS_SUCCESS', payload});


export const setCurrentUser = (payload) => dispatch =>
	dispatch({type:'SET_CURRENT_USER', payload});
