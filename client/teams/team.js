import React from 'react';
import {connect} from 'react-redux';
import api from '../api';




const Team = ({team, dispatch}) => {
	const showModal = () => {
		dispatch({
			type: 'OPEN_MODAL',
			modalType: 'team', 
			payload: team
		});
	}

	return (
		<span onClick={showModal}>
				{team.desc}
		</span>
	);
}


//export default connect(null, showModal: showModal)(Team);

export default Team;


