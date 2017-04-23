import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Teams from '../teams';
import Matches from '../matches';
import Events from '../events';
import Tournaments from '../tournaments';
import Players from '../players/players';


const EditItem = ({type}) => {
	switch(type){
		case 'teams':
			return <Teams editMode />;
		case 'players':
			return <Players  editMode />;
		case 'matches':
			return <Matches editMode />;
		case 'events':	
			return <Events editMode />;
		case 'tournaments':
			return <Tournaments editMode />;
		default:
			return <div>Empty for {type} </div>;

	}
}

function generateLinks(){
	const links= ['tournaments','events','teams','matches','players','users'];
	const style = {color:'silver'};

	return links.map((t,index) => {
		const text = `/admin/${t}`;
		return (
			<span key={index}>
				<Link to={text} activeStyle={style}>{t}</Link>
				{' '}
			</span>
			);
	});	
}


const Admin = ({params}) => 
	<div>
		<p>Edit: {' '}

		{generateLinks()}
	
		</p>
		<div className="well">
			<EditItem type={params.type} />
		</div>
	</div>;


export default Admin;