import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//import { fetchTeamsRequest, fetchTeamsSuccess } from './matchesActions';
import Matches from './matches';
import api from '../api/db';
import CreateForm from './matchCreateForm';



class MatchesContainer extends React.Component {
	constructor(props){
		super(props);
		this.onClickMatch = this.onClickMatch.bind(this);
		this.onClickAdd = this.onClickAdd.bind(this);
	}
	componentDidMount(){
		 // this.props.dispatch(api.teams.get());
		//  this.props.dispatch(api.tournaments.get());
		//  this.props.dispatch(api.matches.get());
	}

	onClickMatch(match){
		this.props.dispatch({
			type: 'OPEN_MODAL',
			modalType: 'match', 
			payload: match,
		});
	}

	onClickAdd(){
		this.props.dispatch({
			type: 'OPEN_MODAL',
			modalType: 'match', 
			payload: null,
		});
	}

	render(){
		const {matches, ...rest} = this.props;

		if(this.props.loaders.isFetchingEvents 
			|| this.props.loaders.isFetchingTeams
			|| this.props.loaders.isFetchingTournaments) {
			return <span>loading...</span>;
		}

		return (
				<div>
					<p>
					{this.props.editMode && 
						<button 
							className="btn btn-primary" 
							onClick={this.onClickAdd}>
								Add...
						</button>}
					</p>
					<Matches {...this.props} onClickMatch={this.onClickMatch} />
				</div>
			);
	}
}


export default connect(
	state => ({
		matches:    state.matches,
		tournaments: state.tournaments,
		teams:      state.teams,
		events: state.events,
		loaders: state.loaders,
	}), 
	//{
		//fetchTeamsSuccess,
		//fetchTeamsRequest,
	//}
)(MatchesContainer);


