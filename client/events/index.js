import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//import { fetchTeamsRequest, fetchTeamsSuccess } from './matchesActions';
import Events from './events';
import api from '../api/db';
import CreateForm from './eventCreateForm';



class EventsContainer extends React.Component {
	constructor(props){
		super(props);
		this.onClickEvent = this.onClickEvent.bind(this);
		this.onClickAdd = this.onClickAdd.bind(this);
	}

	componentDidMount(){
		  //this.props.dispatch(api.getItems('events'));
		  //this.props.dispatch(api.getItems('match'));
		  //this.props.dispatch(api.tournaments.get());
		 //this.props.dispatch(api.events.get());
	}

	onClickEvent(event){
		this.props.dispatch({
			type: 'OPEN_MODAL',
			modalType: 'event',
			payload: event,
		});
	}

	onClickAdd(){
		this.props.dispatch({
			type: 'OPEN_MODAL',
			modalType: 'event',
			payload: null,
		});
	}

	render(){
		let {events, tournaments, teams} = this.props;
		const {isFetchingEvents, isFetchingTournaments, editMode} = this.props;

		if((isFetchingEvents && !events.length) ||
			(isFetchingTournaments && !tournaments.length)) {
				return <span>loading...</span>;
			}

		if(!tournaments.length){
				return <span>please create event first</span>;
		}

		if(this.props.showOnlyActive){
			events = events.filter(t => t.isActive == true);
		}

		return (
				<div>
					{this.props.editMode &&
						<button
							className="btn btn-primary"
							onClick={this.onClickAdd}>
								Add...
						</button>}

					<Events
				    	editMode={editMode}
				    	events={events}
							isUpdating={this.props.editMode}
							tournaments={tournaments}
				    	onClick={this.onClickEvent}
				    />
				</div>
			);
	}
}


export default connect(
	state => ({
		events:    state.events,
		tournaments: state.tournaments,
		isFetchingTournaments: state.loaders.isFetchingTournaments,
		isFetchingEvents: state.loaders.isFetchingEvents,
	}),
	//{
		//fetchTeamsSuccess,
		//fetchTeamsRequest,
	//}
)(EventsContainer);
