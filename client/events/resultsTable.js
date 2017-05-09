import React from 'react'

export default function renderTable(obj, allTeams, allMatches){

	let tableArr = [], maxPlayedMatches = 0;
	const matches = allMatches.filter(m => m.eventId === obj._id);
	console.log(matches);
	obj.teams.forEach(id => {
		const foundedTeam = allTeams.find(t => t._id === id);

		if(foundedTeam){
			let teamCopy = {_id: id, desc: foundedTeam.desc}; //team;//Object.assign({},team);
			teamCopy.points = { win:0, draw:0, loose:0, total:0};
			teamCopy.matches = [];


			matches.forEach(match => {
					if(match.homeId === id || match.guestId === id){

						//TODO: update with more relaible condition
						if(match.result.home !=="" && match.result.guest !== ""){
							const isHomeTeam = match.homeId === id;
							const {result} = match;

							const score = isHomeTeam
								? Number(result.home) - Number(result.guest)
								: Number(result.guest) - Number(result.home);
					 	  if(score === 0){ ++teamCopy.points.draw; }
							if(score > 0){ ++teamCopy.points.win; }
							if(score < 0){ ++teamCopy.points.loose; }
						  teamCopy.points.total = teamCopy.points.win*3 + teamCopy.points.draw;
							teamCopy.matches.push({match,score,isHomeTeam});
						}
					}
			});

			tableArr.push(teamCopy);
			maxPlayedMatches = maxPlayedMatches < teamCopy.matches.length
									? teamCopy.matches.length
									: maxPlayedMatches;

			//console.log(teamCopy);
		}
	});

	//order by total points
	tableArr.sort((a,b)=> {
		if(a.points.total === b.points.total){
			return a.desc.toLowerCase().localeCompare(b.desc.toLowerCase());
		} else{
			return b.points.total - a.points.total;
	}});

	return (
		<div>
			<h4>Results</h4>
			<table className="table table-striped table-bordered table-condensed">
      <thead>
				<tr className="text-bold">
          <td>#</td>
					<td>Team</td>
					<td>Score</td>
					{geneateColumns(maxPlayedMatches)}
					<td>Win</td>
          <td>Draw</td>
          <td>Loose</td>
				</tr>
        </thead>
        <tbody>
				{tableArr.map((t, index)=>
					<tr key={t._id}>
            <td>{index+1}</td>
						<td>{t.desc}</td>
						<td>{t.points.total} in {t.matches.length} matches  </td>
						{geneateColumns(maxPlayedMatches, t)}

						<td>{t.points.win}</td>
            <td>{t.points.draw}</td>
            <td> {t.points.loose}</td>
					</tr>)}
          </tbody>
			</table>
		</div>
	)}

function geneateColumns(len,team){
	let ret=[],tt=[];
  //const sortedMatches=[];
  //team.matches.forEach(t => sortedMatches.push(t.match));
  if(team){
    tt = team.matches.sort((a,b)=>a.match.date < b.match.date);
  }
  //const tt = team.matches.sort((a,b)=>a.match.date - b.match.date);
	for(let i=0; i<len; i++){
  	if(team){
    	const currMatch = tt[i];
  		let bgColor = "grey";
  		let title ="not played yet";
      const showMatchInfoFn = showMatchInfo;
  		if(currMatch){
  			const score = currMatch.score;
        const isHomeTeam = currMatch.isHomeTeam;
        const rivalTeam = isHomeTeam ? currMatch.match.originGuestDesc : currMatch.match.originHomeDesc;
  			bgColor = score > 0 ? "#8BC34A" : score === 0 ? "#CDDC39": "#FF7043";
  			//console.log(currMatch);
  			title = currMatch.match.result.home + ":"
  			+ currMatch.match.result.guest +" vs "
  			+ rivalTeam;
  		}
  		ret.push(<td key={i} onClick={showMatchInfoFn}  title={title} style={{backgroundColor:bgColor,cursor:"pointer",color:"black"}}></td>);
  	}else{
  		ret.push(<td key={i}> {i+1} </td>);
  	}
  }
	return ret;
}

function showMatchInfo(e){
  //console.log(e.target.innerHTML);
  if(!e.target.innerHTML){
    e.target.innerHTML =  e.target.title;
  } else{
    e.target.innerHTML = "";
  }
  //e.target.innerHTML = 111;
}
