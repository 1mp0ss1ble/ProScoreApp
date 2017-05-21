import React from 'react';
import {connect} from 'react-redux';
import Teams from '../../teams';
import Matches from '../../matches';
import Events from '../../events';
import EventsList from '../../events/eventsList';
import resultsTable from '../../events/resultsTable';
import MatchesList from '../../matches/Matches';

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

	}

	onClickMatch(data){
		console.log(data);
	}

	showEvent(id){
		this.setState({eventId:id});
	}

	render(){
		const {events, teams, matches} = this.props;
		const {eventId} = this.state;
		return (
			<div>
				<EventsList showEvent={this.showEvent} />
				<p></p>
				{this.state.eventId &&
					<div>
						{resultsTable(events.find(x=> x._id == eventId),teams, matches)}
					  <h4>Matches</h4>
						<MatchesList
							{...this.props}
							hideDetails={true}
							matches={matches.filter(x=>x.eventId === eventId)}
							onClickMatch={this.onClickMatch}
						/>
					</div>
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
