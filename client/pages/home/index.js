import React from 'react';
import Teams from '../../teams';
import Matches from '../../matches';
import Events from '../../events';

const teamQuantity = 3;


export default class Home extends React.Component{
	render(){
		return (<div>
				<h3>Events:</h3>
				<Events showOnlyActive />

			    <h3>Matches:</h3>
				<Matches />

			  </div>
		);
	}
}
