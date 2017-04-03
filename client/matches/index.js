import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//import { fetchTeamsRequest, fetchTeamsSuccess } from './matchesActions';
import Matches from './matches';
import api from '../api/db';
import CreateForm from './matchCreateForm';



class MatchesContainer extends React.Component {
	componentDidMount(){
		  this.props.dispatch(api.teams.get());
		  this.props.dispatch(api.tournaments.get());
		  this.props.dispatch(api.matches.get());
	}

	render(){
		const {matches, ...rest} = this.props;
		return (
				<div>
					<CreateForm />
					<h4>Matches({matches.length})</h4>
					<Matches {...this.props} />
				</div>
			);
	}
}


export default connect(
	state => ({
		matches:    state.matches,
		teams:      state.teams,
		isFetching: state.loaders.isFetchingMatches,
	}), 
	//{
		//fetchTeamsSuccess,
		//fetchTeamsRequest,
	//}
)(MatchesContainer);


