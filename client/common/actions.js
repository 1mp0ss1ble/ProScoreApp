export default {
	showModal: (modalType) => (payload) => ({
			type: 'OPEN_MODAL',
			modalType, 
			payload
		 }), 
}