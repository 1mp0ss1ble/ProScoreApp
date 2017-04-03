import React from 'react';
import shortid from 'shortid';
import api from '../api/db'
import {types} from '../app/constants';
import util from '../util';
import validateInput from '../../server/shared/validations/addTeam';
import {ModalInputWrapper, ModalInput} from './tournamentModalInput';


class TournamentModal extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			...util.getEnumrabelObjProps(this.props.tournament),
			errors:{},
			isLoading: false,
		};

		
		this.removeItem = this.removeItem.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.showInputs = this.showInputs.bind(this);
		this.isValid = this.isValid.bind(this);

		const {errors} = this.state;
		const getId = ()=> shortid.generate();

		this.inputs = [
			{ shortid:getId(),prop:'desc',title:'Desc',isRequired:true},
			//{ shortid:getId(),prop:'leagues',title:'Leagues'},
			{ shortid:getId(),prop:'divisions',title:'Divisions'},
			{ shortid:getId(),prop:'rating',title:'Rating', type:'number'},

		];
	}

	
	
	
 	removeItem(){
		const {dispatch} = this.props;
		let success = confirm('are you sure?');
		this.setState({errors:{}, isLoading:true});
		
		if(success){
			dispatch(api.tournaments.remove({id:this.state._id}))
			.then( () => {
				dispatch(this.props.closeModalAction);
				dispatch(api.tournaments.get());
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

		/*
		if(isNaN(obj['rating'])){
			util.showError('rating must be number!');
			return false;
		}
	
		obj['desc'] = obj['desc'].trim();

		if(obj['desc'].length < 1) {
			util.showError('description is required');
			return false;
		}
		*/
		if(this.isValid()){
			dispatch(api.tournaments.update(this.state))
				.then(() => {
					dispatch(this.props.closeModalAction);
					dispatch(api.tournaments.get());
				}).catch(err => 
					//util.showError(JSON.stringify(err.response.data))
					this.setState({errors: err.response.data,isLoading:false})
				);
		}
	}

	onChange(e){
		this.setState({[e.target.name]:e.target.value});
		//console.log(e.target.name,e.target.value,this.state);
	}


	showInputs(){
		return this.inputs.map( t => (
			<ModalInputWrapper 
			 			key={t.shortid}
				    	title={t.title} 
				    	spanId={'basic-addon1'} 
				    	error={this.state.errors[t.prop]}  
		    >
		    	<ModalInput 
			    	val={this.state[t.prop]} 
			    	name={t.prop}
			    	type={t.type}
			    	onChange={this.onChange} 
			    	required={t.isRequired}  />
		    </ModalInputWrapper>
		));
	}


	showLeagueInputs(){
		return (
			<div>

				<input type="text" className="form-group" name="leagueDesc" placeholder="league name" />
				<button className="btn btn-primary" onClick="handleLeagueSubmit">add</button>
			</div>
		);
	}

	render(){
		//let { desc, captain, sponsor, rating } = this.props.team; 
		const {errors} = this.state;

		return (
			<div> 
				<h4>{`EDIT:  ${this.props.tournament.desc}`}</h4>
				{errors.database && <span className="help-block">{errors.database}</span>}
				<form onSubmit={this.handleSubmit} >
				   
				{this.showInputs()}
				
				<p></p>
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


export default TournamentModal;

