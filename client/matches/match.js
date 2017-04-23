import React from 'react';


export default function({match, teams, event, tournament, onClick}){
	
	let home = teams.find(x => x._id === match.homeId),
		guest = teams.find(x => x._id === match.guestId),
		result = match.result || ' ?-? ',
		date = match.date,
		eventArray = [tournament.desc];
		if(event.leagueId){
			const league =  tournament.leagues.find(x => x._id === event.leagueId);
			eventArray.push(league.desc);

			if(event.groupId){
				const group = league.groups.find(x => x._id === event.groupId);
				//eventArray.push(group.desc);
			}
		}

		

		//eventArray.push(event.desc);

		const resultText = result && result.home && result.guest ? 
			result.home + " : " + result.guest : " ? : ? "

	return (
		<span className="link" onClick={onClick.bind(null,match)}>
			<mark>{home.desc}</mark> 
			{' '}{resultText }{' '}
			<mark>{guest.desc}</mark> 
			{' '} <span> {eventArray.join(' | ')}</span> {' '}
			<mark>{date}</mark> 
		</span>
	);
}