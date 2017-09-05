import React, {PropTypes} from 'react';
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
function renderTable(obj, allTeams, allMatches){

	let tableArr = [], maxPlayedMatches = 0;
	const matches = allMatches.filter(m => m.eventId === obj._id);
	console.log(matches);
	obj.teams.forEach(id => {
		const foundedTeam = allTeams.find(t => t._id === id);

		if(foundedTeam){
			let teamCopy = {_id: id, desc:foundedTeam.desc	}; //team;//Object.assign({},team);
			teamCopy.points = { win:0, draw:0, loose:0, total:0};
			teamCopy.matches = [];

			matches.forEach(match => {
					if(match.homeId === id || match.guestId === id){

						//TODO: update with more relaible condition
						if(match.result.home !=="" && match.result.guest !== ""){
							const isHomeTeam = match.homeId === id;
							const {result} = match;

							const score = isHomeTeam
								? Number(result.home) - Number(result.guest)
								: Number(result.guest) - Number(result.home);
					 	  if(score === 0){ ++teamCopy.points.draw; }
							if(score > 0){ ++teamCopy.points.win; }
							if(score < 0){ ++teamCopy.points.loose; }
						  teamCopy.points.total = teamCopy.points.win*3 + teamCopy.points.draw;
							teamCopy.matches.push({match,score});
						}
					}
			});

			tableArr.push(teamCopy);
			maxPlayedMatches = maxPlayedMatches < teamCopy.matches.length
									? teamCopy.matches.length
									: maxPlayedMatches;

			console.log(teamCopy);
		}
	});

	//order by total points
	tableArr.sort((a,b)=> {
		if(a.points.total === b.points.total){
			return a.desc.toLowerCase().localeCompare(b.desc.toLowerCase());
		} else{
			return b.points.total - a.points.total;
	}});

	return (
		<div>
			<h4>Results</h4>
			<table>
				<tr>
					<td>Desc</td>
					<td>Score</td>
					{geneateColumns(maxPlayedMatches)}
					<td>W/D/L</td>
				</tr>
				{tableArr.map(t=>
					<tr key={t._id}>
						<td>{t.desc}</td>
						<td>{t.points.total} in {t.matches.length}  </td>
						{geneateColumns(maxPlayedMatches,t)}

						<td>{t.points.win}/ {t.points.draw}/ {t.points.loose}</td>
					</tr>)}
			</table>
		</div>
	)}

function geneateColumns(len,team){
	let ret=[];
	for(let i=0;i<len;i++)
	if(team){
		const currMatch = team.matches[i];
		let bgColor = "grey";
		let title ="";
		if(currMatch){
			const score = currMatch.score;
			bgColor = score > 0 ? "green" : score === 0 ? "yellow": "red";
			console.log(currMatch);
			title = currMatch.match.result.home + ":"
			+ currMatch.match.result.guest +" "
			+ currMatch.match.originHomeDesc + "/ "
			+ currMatch.match.originGuestDesc;
		}
		ret.push(<td title={title} style={{backgroundColor:bgColor}}></td>);
	}else{
		ret.push(<td> {i+1} </td>);
	}
	return ret;
}

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
		//console.log(this.state);
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
					teams:[],
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
		this.handleTeams = this.handleTeams.bind(this);
		this.getNewTeams = this.getNewTeams.bind(this);

	}
	getNewTeams(){
		return this.props.teams.filter(team =>
			 this.state.teams.indexOf(team._id) === -1
	)}

	getInputData (){
		return {
			...this.props.event,
			desc:this.state.desc,
			teams:this.state.teams,
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
					api.events.update :
					api.events.add;

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

  handleTeams(isAdding, e){
		//e.preventDefault();
		const id = e.value;
		if(!id){
			return;
		}

		let teams = [].slice.call(this.state.teams)||[];
		console.log(teams);
		if(isAdding){
				teams.push(id);

		} else{
			teams.splice(teams.indexOf(id),1);
		}

		this.setState({teams});

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
			<div>
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

						{this.isUpdating &&
							<div>
								<select ref="teamToAdd">
									{this.getNewTeams().map(team =>
										<option key={team._id} value={team._id}>
											{team.desc}
										</option>
									)}
								</select>
								<button
									onClick={(e)=>{
											e.preventDefault();
											this.handleTeams(true,this.refs.teamToAdd)
										}}
									className="btn btn-default"
								>
									add
								</button>
								<p></p>
								<select ref="teamToRemove">
									{this.state.teams.map(id =>
										 <option key={id} value={id}>
										 {this.props.teams.find(team => team._id === id).desc}
										 </option>
									)}
								</select>
								<button
									onClick={(e)=>{
											e.preventDefault();
											this.handleTeams(false,this.refs.teamToRemove)
										}}
									className="btn btn-default"
								>
									remove
								</button>

							</div>
						}

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
					<h4>Teams:</h4>
					{this.state.teams &&
						this.state.teams.map(id =>
							<p key={id}>
								{this.props.teams.find(team=>team.id === id).desc}
							</p>
						)
					}
				</form>
				<div>
					{ this.isUpdating && renderTable(this.state, this.props.teams, this.props.matches)}
				</div>
			</div>
		);
	}
}


export default connect(state => ({
	tournaments: state.tournaments,
	teams: state.teams,
	matches: state.matches,
	isLoadingTournaments: state.loaders.isLoadingTournaments,

}))(CreateForm);
