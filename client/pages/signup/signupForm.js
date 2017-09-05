import React from 'react';
import { connect } from 'react-redux';
import api from '../../api';
import {types} from '../../app/constants'


class SignupForm extends React.Component {
	constructor(props){
		super(props);

		this.state = { username: '', password:'' }

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();

		const obj = {...this.state};
		for(let key in obj){
			obj[key] = obj[key].trim();
			if(obj[key].length < 1){
				this.setState({[key]: ''});
				return false;
			}
		}

		this.props.dispatch(api.addItem(types.player,this.state))
		.then(err => {
			console.log(err);
		});
	}

	render(){
		return (
			<form onSubmit={this.onSubmit}>
				<h2>Join us!</h2>
				<div className="input-group">
				<span className="input-group-addon modal-addon"
				id="basic-addon1">username</span>

				<input
					value={this.state.username}
					onChange={this.onChange}
					name="username"
					required
					type="text"
					className="form-control"
				/>
				</div>
				<div className="input-group">
				<span className="input-group-addon modal-addon"
				id="basic-addon2">password</span>

				<input
					value={this.state.password}
					onChange={this.onChange}
					name="password"
					type="password"
					required
					className="form-control"
				/>
				</div>
				<p></p>
				<div className="form-group">
					<button className="btn btn-primary ">
						Submit
					</button>
				</div>
			</form>
		);
	}
}

export default connect()(SignupForm);
