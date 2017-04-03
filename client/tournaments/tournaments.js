import React from 'react';
import Tournament from './tournament';




const Tournaments = ({tournaments,dispatch}) => {
	
	return (
		<div>
			<ol>
				{tournaments.slice().reverse().map(t =>
					 <li className="link" key={t._id}> 
					 	<Tournament tournament={t} dispatch={dispatch} /> 
					 </li>
				)}
			</ol>
		</div>
	);
};

export default Tournaments;