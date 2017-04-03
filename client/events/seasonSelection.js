import React from 'react';
import shortid from 'shortid';

export default function (currentYear){
	
	let seasons = [];

	for(let i=0; i<3; i++){
		let customYear = (currentYear  + i -1)

		seasons.push({
			id: shortid.generate(), 
			desc: customYear
		});
		seasons.push({
			id: shortid.generate(), 
			desc: `${customYear}-${customYear + 1}`
		});

		for(let j=0; j<4;j++){
			seasons.push({
				id: shortid.generate(), 
				desc: `${customYear}-${customYear + 1} (Season ${j+1})`
			});
		}
		
		
	}

	return seasons.map( t => 
		<option 
			key={t.id}>
		 	{t.desc}
		 </option>
	);
}