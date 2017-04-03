import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//import { fetchTeamsRequest, fetchTeamsSuccess } from './matchesActions';
import Events from './events';
import api from '../api/db';
import CreateForm from './eventCreateForm';



class EventsContainer extends React.Component {
	componentDidMount(){
		  //this.props.dispatch(api.getItems('events'));
		  //this.props.dispatch(api.getItems('match'));
		  this.props.dispatch(api.tournaments.get());
		  this.props.dispatch(api.events.get());
	}

	render(){
		const {events, ...rest} = this.props;
		return (
				<div>
					<CreateForm />
					<h4>Events({events.length})</h4>
					<Events {...this.props} />
				</div>
			);
	}
}


export default connect(
	state => ({
		events:    state.events,
		isFetching: state.loaders.isFetchingEvents,
	}), 
	//{
		//fetchTeamsSuccess,
		//fetchTeamsRequest,
	//}
)(EventsContainer);


