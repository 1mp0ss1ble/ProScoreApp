import React from 'react';
import { connect } from 'react-redux';
import api from '../api/db';
import util from '../util';
import {types} from '../app/constants';

class CreateForm extends React.Component {

	handleSubmit(e){
		e.preventDefault();
		const { dispatch } = this.props;

		
		let obj = {
			homeId: this.refs.homeId.value,
			guestId: this.refs.guestId.value,
		}
		console.log(obj);
		


			/*
	    const desc = this.refs.desc.value.toString().trim();

	    if(desc.length < 2 ){
	    	return alert('too short!');
	    }
		const countDuplicates = teams.filter(t => 
					t.desc.toString().trim().toLowerCase() === desc.toLowerCase()
		);
				
		if(countDuplicates.length){
			return alert('duplicate');
		}	
		*/


		
		dispatch(api.matches.add(obj))
		.then( () => {
		    dispatch(api.matches.get());
		}
		).catch(err => console.log(err));
	}

	render(){
		
		return (
		<form onSubmit={this.handleSubmit.bind(this)}>
			<div className="form-group">
			<select ref="homeId" className="form-group" >
				{this.props.tournaments.map(t => <option key={t._id} value={t._id}>{t.desc}</option>)}
			</select>

			<select ref="homeId" className="form-group" >
				{this.props.teams.map(t => <option key={t._id} value={t._id}>{t.desc}</option>)}
			</select>
			
			<select ref="guestId" >
				{this.props.teams.map(t => <option key={t._id} value={t._id}>{t.desc}</option>)}
			</select>
			
			<input type='submit' className="btn btn-primary" value='create' />
			</div>
		</form>
		);
	}
}

export default connect(state => ({
	teams: state.teams,
	tournaments: state.tournaments,
}))(CreateForm);
