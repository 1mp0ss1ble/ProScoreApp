import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import classnames from 'classnames';
import api from '../api/db';
import util from '../util';
import {types} from '../app/constants';
import validateInput from '../../server/shared/validations/checkMatch';


function setDetailedDescription(events, tournaments){
	let detailedEvents = events.map(event => {
		const tournament = tournaments.find(x => x._id === event.tournamentId);
		let descArr = [tournament.desc];
		if(event.leagueId){ 
			const league = tournament.leagues.find(x=>x._id === event.leagueId);
			descArr.push(league.desc);
			if(event.groupId){
				descArr.push(league.groups.find(x => x._id === event.groupId).desc);
			}
		}
		descArr.push(event.desc);
		event.detailedDesc = descArr.join(' / ')
		return event;
	});	

	return detailedEvents;
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
		<select name={desc} value={value} onChange={handleChange} className="form-group">
			<option  value="">{`select ${desc.slice(0,-2)}...`}</option>
			{models.map(t => 
				<option key={t._id} value={t._id}>{t.detailedDesc || t.desc}</option>
			)}
		</select>
	);
}


class MatchForm extends React.Component{
	constructor(props){
		super(props);
		
		this.handDateleChange = this.handDateleChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.isValid = this.isValid.bind(this);
		this.removeItem = this.removeItem.bind(this);

		this.isUpdating = !!this.props.match;
		//console.log(this.props.match);
		
		if(this.isUpdating){
			this.state = {...this.props.match,errors:{}};
		}else{
			this.state = {
				eventId: "",
				homeId: "",
				guestId: "",
				location: "",
				result:{home:"", guest:""},
				videoLink: "",
				date: moment(), 
				errors:{}
			};
		}
		
	}

	handDateleChange(date){
		//console.log(e._d);
		this.setState({date});
	}

	getInputData(){
		return {
			...this.props.match,
			homeId: this.state.homeId,
			guestId: this.state.guestId,
			eventId: this.state.eventId,
			date: moment(this.state.date,'DD/MM/YYYY').format('DD/MM/YYYY'),
			location: this.state.location,
			result: {
					home: this.refs.resultHome.value,
					guest: this.refs.resultGuest.value,
			},
			videoLink: this.state.videoLink,
		}
	}

	isValid(){
     	
     	const obj = this.getInputData();
	 	const {errors, isValid} = validateInput(obj);
     	if(!isValid){
     		this.setState({errors, isLoading:false});
     	}
     	return isValid;
    }


    removeItem(){
		const {dispatch} = this.props;
		let success = confirm('are you sure?');
		

		if(success){
			this.setState({errors:{}, isLoading:true});
			dispatch(api.matches.remove({id:this.state._id}))
			.then( () => {
				dispatch(this.props.closeModalAction);
				dispatch(api.matches.get());
			}).catch( err => 
				this.setState({errors: err.response.data,isLoading:false})
			);
		}
	}

	handleSubmit(e){
		e.preventDefault();
		const { dispatch } = this.props;
		this.setState({errors:{}, isLoading: true})
		
		//console.log(this.getInputData());
		//return;

		if(this.isValid()){
			const apiAction = this.isUpdating  
				? api.matches.update 
				: api.matches.add;
			

			dispatch(apiAction(this.getInputData()))
			.then( () => {
				this.setState({isLoading: false});
				dispatch(this.props.closeModalAction);
			    dispatch(api.matches.get());
			})
			.catch(errors =>
			  this.setState({errors:errors.response.data, isLoading: false})
			);
		}
	}

	
	generateHours(){
		let hours = [];

		for(let i=0;i<24;i++){
			hours.push(<option></option>);
		}	
	}

	generateMinutes(){

	}

	handleSelectChange(e){
		this.setState({[e.target.name]:e.target.value});
	}

	render(){
		const {errors} = this.state;
		const videLink = this.state.videoLink || null;
		const events = setDetailedDescription(this.props.events, this.props.tournaments);

		return (
		<form onSubmit={this.handleSubmit.bind(this)}>
			<div className="form-group">

			    {errors.database && <span>{errors.database}</span>}

			    <ErrorWrapper error={errors.eventId}>
			    	<FormSelect 
			    		desc="eventId" 
			    		value={this.state.eventId}
			    		handleChange={this.handleSelectChange} 
			    		models={events} 
			    	/>
				</ErrorWrapper>
				
				
				<ErrorWrapper error={errors.homeId}>
				  	<FormSelect 
				  		desc="homeId"
				  		value={this.state.homeId}
				  		handleChange={this.handleSelectChange}  
				  		models={this.props.teams} 
				  	/>
				</ErrorWrapper>

				<ErrorWrapper error={errors.guestId}>
					<FormSelect 
						desc="guestId" 
						value={this.state.guestId}
						handleChange={this.handleSelectChange} 
						models={this.props.teams} 
					/>
				</ErrorWrapper>

				<ErrorWrapper error={errors.date}>
					<DatePicker
						ref="date"
						dateFormat="DD/MM/YYYY"
						placeholderText="pick a date"
						selected={moment(this.state.date,'DD/MM/YYYY')}
						//selected={this.state.date}
						onChange={this.handDateleChange}
					/>
				</ErrorWrapper>
				<ErrorWrapper error={errors.result && errors.result.home}>
					<input 
						defaultValue={this.state.result.home||""}
						type='text' 
						ref="resultHome"
						placeholder=" home score" 
					/>
				</ErrorWrapper>	
					
				<ErrorWrapper error={errors.result && errors.result.guest}>
					<input 
						defaultValue={this.state.result.guest||""}
						type='text' 
						ref="resultGuest"
						placeholder=" guest score" 
					/>
				</ErrorWrapper>	
				
					<input 
						value={this.state.location}
						onChange={this.handleSelectChange}
						type='text' 
						name="location"
						placeholder="location" 
					/>
				<br/>
					<input 
						value={this.state.videoLink}
						onChange={this.handleSelectChange}
						type='text' 
						name="videoLink"
						placeholder="youtube videoId" 
					/>
				
				<p></p>	

				<button 
					className="btn btn-primary" 
					disabled={this.state.isLoading} 
					type='submit' 
					
				>
					{this.isUpdating ? 'Update' : 'Create'}
				</button>
					

				{this.isUpdating &&(
					<button 
						className="btn btn-default" 
						disabled={this.state.isLoading}  
						onClick={this.removeItem}>
						Remove
					</button>
				)}

				<div>
				{this.state.videoLink && (
					<div>
					<hr/>
					<h4>Video</h4>
					<iframe 
						width="420" 
						height="315" 
						src={"https://www.youtube.com/embed/" + videLink}
						frameBorder="0" 
						allowFullScreen>
					</iframe>
					</div>

				)}
				</div>

			</div>
		</form>
		);
	}
}

export default connect(state => ({
	teams:state.teams,
	events:state.events,
	tournaments: state.tournaments,
}))(MatchForm);
