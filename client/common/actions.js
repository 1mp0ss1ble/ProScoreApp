export default {
	showModal: (modalType) => (payload) => ({
			type: 'OPEN_MODAL',
			modalType,
			payload
		 }),
}



export function modelActions(type){
	const uType = type.toUpperCase();
	return {
	fetchRequest: () => (dispatch) =>
		dispatch({type:`FETCH_${uType}_REQUEST`}),

	fetchSuccess: (payload) => (dispatch) =>
		dispatch({type:`FETCH_${uType}_SUCCESS`, payload}),

	fetchFail: () => (dispatch) =>
			dispatch({type:`FETCH_${uType}_FAIL`}),
	}
}
