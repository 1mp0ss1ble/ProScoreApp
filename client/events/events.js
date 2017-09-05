import React from 'react';
import Event from './event';


function getTournament(id, tournaments){
	return tournaments.find(t => t._id === id);
}

const Events = ({events, tournaments, onClick}) => {
	return (
		<div>
			<ol>
				{events.map(t =>
					<li key={t._id} >
						<Event
						    onClick={onClick}
							event={t}
							tournament={getTournament(t.tournamentId, tournaments)}
						/>
					</li>
				)}
			</ol>
		</div>
	);
}


export default Events;
