import React from 'react';
import Match from './components/MatchRow';

function getTeamDesc(teams){
	return function(id){
		const team =  teams.find(t => t._id === id );
		return team ? team.desc :'N/A';
	}
}

const Matches = ({matches, teams, played, tournaments, events, onClickMatch, hideDetails=false}) => {
	let getDesc = getTeamDesc(teams);
	let filtered = matches.filter( x =>
		played
		? (x.result.home && x.result.guest)
		: !x.result.home || !x.result.guest
	);

	return (
		<div>
			<table className="table table-striped table-bordered table-condensed">
				<thead>
					<tr>
						<th>#</th>
						<th>Home</th>
						<th>Result</th>
						<th>Guest</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{filtered.slice().reverse().map((t,index) => {
						const event = events.find(x => x._id === t.eventId);
						return (
						  <Match
								key={t._id}
							  index = {index}
								match={t}
								hideDetails = {hideDetails}
								teams={teams}
							  tournament={tournaments.find(x => x._id === event.tournamentId)}
								event={event}
								onClick={onClickMatch}
							/>
					)})}
				</tbody>
			</table>
		</div>
	);
};

export default Matches;
