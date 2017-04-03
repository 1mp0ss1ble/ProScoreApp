import React from 'react';
import {connect} from 'react-redux';
import api from '../api';
import {types} from '../app/constants';




const Tournament = ({tournament, dispatch}) => {
	const showModal = () => {
		dispatch({
			type: 'OPEN_MODAL',
			modalType: types.tournament, 
			payload: tournament
		});
	}

	return (
		<span onClick={showModal}>
				{tournament.desc}
		</span>
	);
}


//export default connect(null, showModal: showModal)(Team);

export default Tournament;


