import React from 'react';
import Team from './team';


const Teams = ({ teams, isFetching, isEditable=false, dispatch }) => {
	 

	const message = isFetching ? 'loading...' : 'no teams...';
	
	if(!teams.length){
		return <span>{message}</span>;
	}

	return (
		<ol>
			{ teams.slice().reverse().map(
			    (t, index) =>{
			    	let isVisible = false;
			    	const handleCick = (value) => {
						isVisible = !isVisible;

			    	}

				    return (	
				    	<li className="link" key={t._id}>
				    		<Team dispatch={dispatch} team={t} /> 
				    	</li>
				    );
			    }			    
			)}
		</ol>
	);
} 


export default Teams;