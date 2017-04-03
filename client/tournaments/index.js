import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//import { fetchTeamsRequest, fetchTeamsSuccess } from './matchesActions';
import Tournaments from './tournaments';
import api from '../api/db';
import {types} from '../app/constants';

import CreateForm from './tournamentCreateForm';



class TournamentsContainer extends React.Component {
	componentDidMount(){
		//  this.props.dispatch(api.getItems('team'));
		  this.props.dispatch(api.tournaments.get());
	}

	render(){
		const {tournaments, ...rest} = this.props;
		return (
				<div>
					<CreateForm />
					<h4>Tournaments: ({tournaments.length})</h4>
					<Tournaments {...this.props} />
				</div>
			);
	}
}


export default connect(
	state => ({
		tournaments: state.tournaments,
		isFetching: state.loaders.isFetchingMatches,
	}), 
	//{
		//fetchTeamsSuccess,
		//fetchTeamsRequest,
	//}
)(TournamentsContainer);


