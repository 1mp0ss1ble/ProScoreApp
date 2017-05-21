import React from 'react';
import Match from './match';

function getTeamDesc(teams){
	return function(id){
		const team =  teams.find(t => t._id === id );
		return team ? team.desc :'N/A';
	}
}


const Matches = ({matches, teams, tournaments, events, onClickMatch, hideDetails=false}) => {
	let getDesc = getTeamDesc(teams);

	return (
		<div>
			<ol>
				{matches.slice().reverse().map(t => {
					const event = events.find(x => x._id === t.eventId);

					return (
						<li key={t._id}>
							<Match
								match={t}
								hideDetails = {hideDetails}
								teams={teams}
							    tournament={tournaments.find(x =>
							    	x._id === event.tournamentId)}
								event={event}
								onClick={onClickMatch} />
						</li>
				)})}
			</ol>
		</div>
	);
};

export default Matches;
