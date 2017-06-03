import React from 'react';
import {connect} from 'react-redux';
import Teams from '../../teams';
import Matches from '../../matches';
import Events from '../../events';
import EventsList from '../../events/eventsList';
import resultsTable from '../../events/resultsTable';
import MatchesTable from '../../matches/MatchesTable';
import News from './News';

//import {FormControl} from 'react-bootstrap';

const teamQuantity = 3;


class Home extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			eventId:null,
		};

		this.showEvent = this.showEvent.bind(this);
		this.onClickMatch = this.onClickMatch.bind(this);
		this.renderContent = this.renderContent.bind(this);
	}

	renderContent(props, eventId){
		const {events, teams, matches} = props;

		return (
			<div>
				{resultsTable(events.find(x=> x._id == eventId), teams, matches)}
				<h4>Matches</h4>
				<MatchesTable
					{...this.props}
					hideDetails
					matches={matches.filter(x=>x.eventId === eventId)}
					onClickMatch={this.onClickMatch}
				/>
			</div>
		);
	}

	onClickMatch(data){
		console.log(data);
	}

	showEvent(id){
		//console.log(id);
		this.setState({eventId:id});
	}

	render(){
		const {eventId} = this.state;
		return (
			<div>
				<EventsList showEvent={this.showEvent} />
				<p></p>
				{this.state.eventId
					? this.renderContent({...this.props},eventId)
					: <News />
				}
			</div>
		);
	}
}

export default connect(state => ({
	events: state.events,
	teams:state.teams,
	tournaments: state.tournaments,
	matches: state.matches,
}))(Home);

/*
<h3>Events:</h3>
<Events showOnlyActive />
<h3>Matches:</h3>
<Matches />
*/
