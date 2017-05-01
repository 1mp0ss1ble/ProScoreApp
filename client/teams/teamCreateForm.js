import React from 'react';
import { connect } from 'react-redux';
import api from '../api/db';
import util from '../util';
import {types} from '../app/constants';

class CreateForm extends React.Component {

	handleSubmit(e){
		e.preventDefault();
		const { state, dispatch } = this.props;


	    const desc = this.refs.desc.value.toString().trim();

	    if(desc.length < 2 ){
	    	return alert('too short!');
	    }
		const countDuplicates = state.filter(t =>
					t.desc.toString().trim().toLowerCase() === desc.toLowerCase()
		);

		if(countDuplicates.length){
			return alert('dupliacte');
		}

		dispatch(api.teams.add({desc}))
		.then( res => {
			util.showError(res.data.err);
		    dispatch(api.teams.get());
		}
		).catch(err => console.log(err));
	}

	render(){
		return (
		<form onSubmit={this.handleSubmit.bind(this)}>
			<div className="form-inline">
			<input className="form-control" ref="desc" placeholder='team name' />
			<button type='submit' className="btn btn-primary" >
				create
			</button>
			</div>
		</form>
		);
	}
}

export default connect(state=>({state: state.teams}))(CreateForm);
