import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import PropTypes from 'prop-types';
import ErrorWrapper from '../../common/components/errorWrapper';
import api from '../../api/db';
import {types} from '../../app/constants'
import validateInput from '../../../server/shared/validations/checkSignup';


class SignupForm extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			username: '',
			 password:'',
			 errors: {},
			 isLoading:false,
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.isValid = this.isValid.bind(this);
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

  isValid(){
		const {isValid, errors} = validateInput(this.state);

		if(!isValid){
			this.setState({errors, isLoading:false});
		}
		return isValid;
	}

	onSubmit(e) {
		const {dispatch} = this.props;
		e.preventDefault();

		if(this.isValid()){
			this.setState({errors:{},isLoading:true});
			//console.log(this.state);
			//return;

			dispatch(api.users.signup(this.state))
			.then(res => {
				//const token = res.token;
				//api.setToken(token);
				this.setState({isLoading: false})
				//console.log('cb ', res);
				dispatch(api.users.get());
				hashHistory.push('/');
			}).
			catch( err => {
				this.setState({errors: err.response.data,isLoading: false})
				//console.log(err.response.data);
			});
		}
	}

	render(){
		const {errors} = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<h2>Join us!</h2>

				<ErrorWrapper className="input-group" error={errors.username}>
					<span className="input-group-addon modal-addon"
					id="basic-addon1">username</span>
					<input
						value={this.state.username}
						onChange={this.onChange}
						name="username"
						type="text"
						className="form-control"
					/>
				</ErrorWrapper>

				<ErrorWrapper className="input-group" error={errors.password}>
					<span className="input-group-addon modal-addon"
					id="basic-addon2">password</span>
					<input
						value={this.state.password}
						onChange={this.onChange}
						name="password"
						type="password"
						className="form-control"
					/>
				</ErrorWrapper>

				<p></p>
				<div className="form-group">
					<button disabled={this.state.isLoading} className="btn btn-primary ">
						Submit
					</button>
				</div>
			</form>
		);
	}
}

SignupForm.propTypes = {
	dispatch : PropTypes.func.isRequired,
};

SignupForm.defaultProps = {
};

export default connect()(SignupForm);
