import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import shortid from 'shortid';
//import api from '../api'
import api from '../api/db';
import {types} from '../app/constants';
import util from '../util';
import validateInput from '../../server/shared/validations/checkMatch';
//import {ModalInputWrapper, ModalInput} from './teamModalInput';

class MatchModal extends React.Component {
	constructor(props){
		super(props);
		this.state = { errors: {} };

		this.onChange = this.onChange.bind(this);
	}

	
	

	
 	removeItem(){
		const {dispatch} = this.props;
		let success = confirm('are you sure?');
		

		if(success){
			this.setState({errors:{}, isLoading:true});
			dispatch(api.teams.remove({id:this.state._id}))
			.then( () => {
				dispatch(this.props.closeModalAction);
				dispatch(api.teams.get());
			}).catch( err => 
				this.setState({errors: err.response.data,isLoading:false})
			);
		}
	}

    isValid(){
     	
     	const {errors, isValid} = validateInput(this.state);

     	if(!isValid){
     		this.setState({errors, isLoading:false});
     	}
     	return isValid;
    }

	handleSubmit(e){
		e.preventDefault();
		this.setState({errors:{},isLoading:true});
		const {dispatch} = this.props;
	
		
		if(this.isValid()){
			dispatch(api.teams.update(this.state))
				.then(() => {
					dispatch(this.props.closeModalAction);
					dispatch(api.teams.get());
				}).catch(err => 
					this.setState({errors: err.response.data, isLoading:false})
				);
		}
	}



	onChange(e){
		this.setState({[e.target.name]:e.target.value});
		//console.log(e.target.name,e.target.value,this.state);
	}

	render(){
		//let { desc, captain, sponsor, rating } = this.props.team; 
		const {errors} = this.state;

		return (
			<div> 
				<h4>{`MatchId:  ${this.props.match._id}`}</h4>
				{errors.database && <span className="help-block">{errors.database}</span>}
				<form onSubmit={this.handleSubmit} >
				
				<select value={this.props.match.homeId} onChange={this.onChange}>
				{this.props.teams.map(x => 
					<option key={x._id} value={x._id}>{x.desc}</option>)}
				</select>

					<button 
						className="btn btn-primary" 
						disabled={this.state.isLoading} 
						type='submit' 
						style={{float:'left'}}
					>
						Save
					</button>
				</form>

				<p>
				<button 
					className="btn btn-default" 
					disabled={this.state.isLoading}  
					onClick={this.removeItem}>
					Remove
				</button>
				</p>
			
			</div>
		);
	}
}


export default connect(state => ({teams:state.teams}))(MatchModal);

