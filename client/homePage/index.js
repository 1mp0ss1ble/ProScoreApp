import React from 'react';
import Teams from '../teams';
import Matches from '../matches';
const teamQuantity = 3;


export default class Home extends React.Component{ 
	render(){
		return (<div>
				<h3>Teams:</h3>
				<Teams />

			    <h3>Matches:</h3>
				<Matches />
		
			  </div>
		);		
	}
}


