import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import api from '../api/db';
import util from '../util';
import {types} from '../app/constants';
import validateInput from '../../server/shared/validations/checkTournamentFields';


class CreateForm extends React.Component {

	constructor(props){
		super(props);
		this.state = { errors: {} };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		const { dispatch } = this.props;


		let obj = {
			desc: this.refs.desc.value
		}



		this.setState({errors:{}, isLoading:true});
		dispatch(api.tournaments.add(obj))
		.then( (response) => {
			this.setState({isLoading:false});
		    dispatch(api.tournaments.get());
		}).catch(errors => {
			console.log('err',errors);
			this.setState({errors: errors.response.data, isLoading:false});
		}
		);
	}

	render(){
		return (
			<form onSubmit={this.handleSubmit}>

				<div className={classnames("form-inline",{'has-error': !isEmpty(this.state.errors)})}>
				<input className="form-control" required ref="desc" placeholder='tournament name' />
				<button type='submit' disabled={this.state.isLoading} className="btn btn-primary" >
					create
				</button>
				{this.state.errors.desc && <span className="help-block">{this.state.errors.desc}</span>}

				</div>
			</form>
		);
	}
}

export default connect(state=>({state: state.tournaments}))(CreateForm);
