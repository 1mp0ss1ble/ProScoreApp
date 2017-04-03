import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Teams from '../teams';
import Matches from '../matches';
import Events from '../events';
import Tournaments from '../tournaments';
import Players from '../players/players';


/*
class EditItem extends React.Component {

	render(){
		if(this.props.type === 'teams'){
			return <Teams isEditable="true" />;
		}
		return(
			<div>
				<span> Type is: {this.props.type}</span>
			</div>
		);
	}
} 

EditItem = connect(
	state=>({teams: state.teams}),
	{getTeams: api.getTeams}
)(EditItem);
	*/

const EditItem = ({type}) => {
	if(type === 'teams') {
		return <Teams />;
	}

	if(type === 'players') {
		return <Players />;
	}

	if(type === 'matches') {
		return <Matches />;
	}

	if(type === 'events') {
		return <Events />;
	}

	if(type === 'tournaments') {
		return <Tournaments />;
	}


	return <div>Content for {type} </div>;
}

const style = {color:'silver'};

const Admin = ({params}) => 
	<div>
		<p>Edit: {' '}
		<Link to='/admin/tournaments' activeStyle={style}>tournaments</Link>{' '}	
		<Link to='/admin/events' activeStyle={style}>events</Link>{' '}	
		<Link to='/admin/teams' activeStyle={style} >teams</Link>{' '}
		<Link to='/admin/matches' activeStyle={style}>matches</Link>{' '}
		<Link to='/admin/players' activeStyle={style}>players</Link>{' '}
		<Link to='/admin/users' activeStyle={style}>users</Link>{' '}	
		</p>
		<div className="well">
			<EditItem type={params.type} />
		</div>
	</div>;

/*
class Admin extends React.Component {
	render(){
		return <div className="well">
				<EditItem type={this.params.type} />
			  </div>;		
	}
}
*/

export default Admin;