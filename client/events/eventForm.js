import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import api from '../api/db';
import util from '../util';
import {types} from '../app/constants';
import generateSeasons from './seasonSelection';
import validateInput from '../../server/shared/validations/checkEvent';

/*
	<select 
		onChange={this.handleTournament} 
		name="tournament"
	>
		<option value="">select tournament...</option>
		{this.props.tournaments.map(t =>
		 	<option key={t._id} value={t._id}>{t.desc}</option>)}
	</select>
*/

function ErrorWrapper({children,error}){
	return (
		<div className={classnames("input-group",{"has-error":error})}>
			{children}
			{error && <span className="help-block">{error}</span>}
		</div>
	);
}



function FormSelect({desc, handleChange, value={}, models}){
	return (
		<select 
			name={desc} 
			value={value} 
			onChange={handleChange} 
			className="form-group"
		>
			<option  value="">{`select ${desc.slice(0,-2)}...`}</option>
			{models.map(t => 
				<option key={t._id} value={t._id}>{t.detailedDesc || t.desc}</option>
			)}
		</select>
	);
}



class CreateForm extends React.Component {

	constructor(props){
		super(props);

		this.isUpdating = !!this.props.event;

		if(this.isUpdating){
		
		const {event, tournaments} = this.props;
		const tournament = tournaments.find(x => 
			x._id === event.tournamentId);
		const leagues = tournament.leagues;
		

		const groups = event.leagueId ? leagues.find(x => 
			x._id === event.leagueId).groups : [];  

			this.state = {
				...this.props.event,
				leagues:leagues, 
				groups: groups, 
				errors:{}
			};
		} else {
			this.state = {
					desc:'',
					tournamentId: null,
					leagueId: null,
					groupId: null,
					isActive: false,
					leagues: [],
					groups: [],
					errors: {},
			};
		}
		
		this.handleTournament = this.handleTournament.bind(this);
		this.handleLeague = this.handleLeague.bind(this);
		this.handleGroup = this.handleGroup.bind(this);
		//this.handleDesc = this.handleDesc.bind(this);
		this.isValid = this.isValid.bind(this);
		this.getInputData = this.getInputData.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleSeasonChange = this.handleSeasonChange.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	getInputData (){
		return {
			...this.props.event,
			desc:this.state.desc,
			tournamentId: this.state.tournamentId,
			leagueId: this.state.leagueId,
			groupId: this.state.groupId,
			isActive: this.state.isActive,
		};
	}
	isValid(){
     	
     	const obj = this.getInputData();
	 	const {errors, isValid} = validateInput(obj);

     	if(!isValid){
     		this.setState({errors, isLoading:false});
     	}
     	console.log(errors)
     	return isValid;
    }

    removeItem(){
		const {dispatch} = this.props;
		let success = confirm('are you sure?');
		

		if(success){
			this.setState({errors:{}, isLoading:true});
			dispatch(api.events.remove({id:this.state._id}))
			.then( () => {
				dispatch(this.props.closeModalAction);
				dispatch(api.events.get());
			}).catch( err => 
				this.setState({errors: err.response.data,isLoading:false})
			);
		}
	}

	handleSubmit(e){
		e.preventDefault();
		
		const { dispatch } = this.props;

		//console.log(this.getInputData());
		//return;

		if(this.isValid()){
				const obj = this.getInputData();

				this.setState({errors:{},isLoading:true});
		
		const requiredAction = this.isUpdating ? 
			api.events.update : api.events.add;


			dispatch(requiredAction(obj))
			.then( (response) => {
				this.setState({isLoading:false});
				dispatch(api.events.get());
				dispatch(this.props.closeModalAction);
			    
			})
			.catch(err => 
				this.setState({errors: err.response.data, isLoading:false})
			);
		}
	}

	handleTournament(e){
		
		const tournament = this.props.tournaments
							.find(t=> t._id === e.target.value);


		if(tournament && tournament.leagues){
			
			this.setState({
				tournamentId: e.target.value,
				leagues: tournament.leagues,
			});
		} else {
			this.setState({
					tournamentId: null,
					leagueId: null,
					groupId: null,
					leagues: [],
					groups:  [],
			});
		}
	}

	handleLeague(e){
		const league = this.state.leagues
								.find(t=> t._id === e.target.value);
		//console.log(league);

		if(league && league.groups) {
			this.setState({
				leagueId: e.target.value,
				groups: league.groups
			});
		} else{
			this.setState({
				leagueId: null,
				groupId: null,
				groups: [],
			});
		}
	}

	handleGroup(e){

		const group = this.state.leagues
			.find(v => v._id === this.state.leagueId).groups
			.find(t => t._id === e.target.value);

		if(group && group._id){
			this.setState({groupId: group._id});
		} else{
			this.setState({groupId: null});
		}

		console.log(this.state);
	}


	handleInput(e){
		let val = e.target.value;
		
		if(e.target.type === 'checkbox'){
			val = !this.state.isActive;
		}

		this.setState({[e.target.name]: val});
	}

	handleSeasonChange(e){
		this.setState({[e.target.name]: e.target.value});
		this.setState({['desc']: e.target.value});
	}


	render(){
		const currentYear = new Date().getFullYear();
		const {errors} = this.state;
		return (
		<form onSubmit={this.handleSubmit.bind(this)}>
			<div className="form-inline">
				<div>
					{this.props.isLoadingTournaments ? 
						<span>Loading...</span> :
						(
							<div>

							    <ErrorWrapper error={errors.tournamentId}>
							    	<FormSelect 
							    		desc="tournamentId" 
							    		value={this.state.tournamentId || ""}
							    		handleChange={this.handleTournament} 
							    		models={this.props.tournaments} 
							    	/>
								</ErrorWrapper>

								<p></p>
								{this.state.tournamentId &&  
									<FormSelect 
							    		desc="leagueId" 
							    		value={this.state.leagueId || ""}
							    		handleChange={this.handleLeague} 
							    		models={this.state.leagues} 
							    	/>
								}
								<p></p>	
								{this.state.leagueId &&  
									<FormSelect 
							    		desc="groupId" 
							    		value={this.state.groupId || ""}
							    		handleChange={this.handleGroup} 
							    		models={this.state.groups} 
							    	/>
								}
							</div>
						)
					}
					
					<p></p>

					is Active? 
					<input 
						checked={this.state.isActive}
						onChange={this.handleInput}
						className="form-control" 
						name="isActive"
						type="checkbox"  
					/>
				</div>
				 <ErrorWrapper error={errors.desc}>
				<input
					name="desc" 
					value={this.state.desc}
					className="form-control"
					onChange={this.handleInput} 
					placeholder='description'
				/>
				</ErrorWrapper>
				<p></p>
				<button 
					type='submit'
					disabled={this.state.isLoading} 
					className="btn btn-primary" 
				>
					{this.isUpdating ? 'Update' : 'Create'}
				</button>

				{this.isUpdating && (
						<button 
						onClick={this.removeItem}
						disabled={this.state.isLoading} 
						className="btn btn-default" 
						>
							Remove
						</button>
				)}


			</div>
		</form>
		);
	}
}

export default connect(state=>({
	tournaments: state.tournaments,
	isLoadingTournaments: state.loaders.isLoadingTournaments,

}))(CreateForm);
