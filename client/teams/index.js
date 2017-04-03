import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchTeamsRequest, fetchTeamsSuccess } from './teamsActions';
import Teams from './teams';
import api from '../api/db';
import CreateForm from './teamCreateForm';



class TeamsContainer extends React.Component {
	componentDidMount(){
		  this.props.dispatch(api.teams.get());
	}

	render(){
		const {teams, ...rest} = this.props;
		return (
				<div>
					<CreateForm />
					<h4>Teams({teams.length})</h4>
					<Teams teams={teams} {...rest} />
				</div>
			);
	}
}


export default connect(
	state => ({
		teams:state.teams,
		isFetching: state.loaders.isFetchingTeams,
	}), 
	//{
		//fetchTeamsSuccess,
		//fetchTeamsRequest,
	//}
)(TeamsContainer);


