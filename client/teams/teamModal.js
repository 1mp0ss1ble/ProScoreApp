import React from 'react';
import classnames from 'classnames';
import shortid from 'shortid';
//import api from '../api'
import api from '../api/db';
import {types} from '../app/constants';
import util from '../util';
import validateInput from '../../server/shared/validations/addTeam';
import {ModalInputWrapper, ModalInput} from './teamModalInput';

class TeamModal extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			...util.getEnumrabelObjProps(this.props.team),
			errors:{},
			isLoading: false,
		};

		
		this.removeItem = this.removeItem.bind(this);
		//this.closeItem = this.closeItem.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.showInputs = this.showInputs.bind(this);
		this.isValid = this.isValid.bind(this);

		//push inputs	
		const {errors} = this.state;
		const getId = ()=> shortid.generate();

		this.inputs = [
			{ shortid:getId(),prop:'desc',title:'Desc',isRequired:true},
			{ shortid:getId(),prop:'sponsor',title:'Sponsor'},
			{ shortid:getId(),prop:'captain',title:'Captain'},
			{ shortid:getId(),prop:'rating',title:'Rating', type:'number'},

		]
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
	
 	removeItem(){
		const {dispatch} = this.props;
		let success = confirm('are you sure?');
		this.setState({errors:{}, isLoading:true});
		

		if(success){
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
				<h4>{`TEAM:  ${this.props.team.desc}`}</h4>
				{errors.database && <span className="help-block">{errors.database}</span>}
				<form onSubmit={this.handleSubmit} >
				   
				{this.showInputs()}
				   
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


export default TeamModal;

