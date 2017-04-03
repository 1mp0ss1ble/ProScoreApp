import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import api from '../api/db';
import util from '../util';
import {types} from '../app/constants';
import generateSeasons from './seasonSelection';
import validateInput from '../../server/shared/validations/checkEvent';



class CreateForm extends React.Component {

	constructor(props){
		super(props);
		this.state = {
				tournamentId: null,
				leagueId: null,
				groupId: null,
				isActive: false,
				leagues: [],
				groups: [],
				errors: {},
		};

		this.handleTournament = this.handleTournament.bind(this);
		this.handleLeague = this.handleLeague.bind(this);
		this.handleGroup = this.handleGroup.bind(this);
		//this.handleDesc = this.handleDesc.bind(this);
		this.isValid = this.isValid.bind(this);
		this.getInputData = this.getInputData.bind(this);
	}

	getInputData (){
		return {
			desc:this.refs.desc.value,
			tournamentId: this.state.tournamentId,
			leagueId: this.state.leagueId,
			groupId: this.state.leagueId,
			isActive: this.refs.isActive.checked,
			info: this.refs.info.value,
		};
	}
	isValid(){
     	
     	const obj = this.getInputData();
		console.log(obj);
     	const {errors, isValid} = validateInput(obj);

     	if(!isValid){
     		this.setState({errors, isLoading:false});
     		console.log('erros',errors);
     	}
     	return isValid;
    }

	handleSubmit(e){
		e.preventDefault();
		const { dispatch } = this.props;


			/*
	    const desc = this.refs.desc.value.toString().trim();

	    if(desc.length < 2 ){
	    	return alert('too short!');
	    }
		const countDuplicates = state.filter(t => 
					t.desc.toString().trim().toLowerCase() === desc.toLowerCase()
		);
				
		if(countDuplicates.length){
			return alert('duplicate');
		}	
		*/

		if(this.isValid()){
				const obj = this.getInputData();
				this.setState({errors:{},isLoading:true});
				//console.log('passed',obj);
				//return;
		
			dispatch(api.events.add(obj))
			.then( (response) => {
				console.log('api get');
				this.setState({isLoading:false});
			    dispatch(api.events.get());
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
								<div 	className={classnames("input-group",{'has-error':errors.tournament})} >
									<select 
										onChange={this.handleTournament} 
										name="tournament"
									>
										<option value="">select tournament...</option>
										{this.props.tournaments.map(t =>
										 	<option key={t._id} value={t._id}>{t.desc}</option>)}
									</select>
									{errors.tournament && <span className="help-block">{errors.tournament}</span>}
								</div>
								<p></p>
								{this.state.tournamentId &&  
									<select onChange={this.handleLeague} name="league">
										<option value="">select a league (optional)...</option>
										{this.state.leagues.map(t =>
										 	<option key={t._id} value={t._id}>{t.desc}</option>)}
									</select>
								}
								<p></p>	
								{this.state.leagueId &&  
									<select onChange={this.handleGroup} name="group">
										<option value="">select a group(optional)...</option>
										{this.state.groups.map(t =>
										 	<option key={t._id}  value={t._id}>{t.desc}</option>)}
									</select>
								}
							</div>
					)
				}
				
				<p></p>	
				<div className={classnames("input-group",{'has-error':errors.desc})} >		
					<select 
					 defaultValue={currentYear} 
					 ref="desc"
					 >	
						{generateSeasons(currentYear)}
					</select> 
					{errors.desc && <span className="help-block">{errors.desc}</span>}
				</div>
				<p></p>

				is Active? 
				<input className="form-control" ref="isActive" type="checkbox"  />
				</div>
				<input ref="info" className="form-control" placeholder='extra info'/>
				<p></p>
				<input type='submit' disabled={this.state.isLoading} className="btn btn-primary" value='create' />
			</div>
		</form>
		);
	}
}

export default connect(state=>({
	tournaments: state.tournaments,
	isLoadingTournaments: state.loaders.isLoadingTournaments,

}))(CreateForm);
