import React from 'react';
import classnames from 'classnames';



export default function ({event, tournament, onClick}) {

	function getDetails({leagueId, groupId}){
		let bj = {
			league:{desc:''},
			group:{desc:''}
		};

		const leagues = this.leagues;

		if(leagueId){
			obj.league = leagues.find(t => t._id === leagueId) || {};
		}

		if(groupId){
			//console.log(groupId, obj.league.groups);
			obj.group = obj.league.groups.find(v =>v._id === groupId) || {};

		}

		return obj;
	}


	return (
		<span
			className={classnames('link',{'text-muted':!event.isActive})}
			onClick={onClick.bind(null,event)}
	  >
			 	{event.desc  && tournament.desc} {' '}
				{getDetails.call(tournament, event).league.desc} {' '}
			  {getDetails.call(tournament, event).group.desc} {' '}

		</span>
	);
}
