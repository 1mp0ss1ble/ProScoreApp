import React from 'react';


function getTeamDesc(teams){
	return function(id){
		const team =  teams.find(t => t._id === id );
		return team ? team.desc :'N/A';
	}
}

const Matches = ({matches, teams}) => {
	let getDesc = getTeamDesc(teams);

	return (
		<div>
		{matches.slice().reverse().map(t => 
			<p key={t._id}>{`${getDesc(t.homeId)} vs ${getDesc(t.guestId)}`}</p>
		)}
		</div>
	);
};

export default Matches;