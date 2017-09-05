import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import classnames from 'classnames';
import api from '../api/db';
import util from '../util';
import {types} from '../app/constants';
import validateInput from '../../server/shared/validations/checkMatch';


function ErrorWrapper({children,error}){
	return (
		<div className={classnames("input-group",{"has-error":error})}>
			{children}
			{error && <span className="help-block">{error}</span>}
		</div>
	);
}




function FormSelect({desc,handleChange, models}){
	return (
		<select name={desc} onChange={handleChange} className="form-group">
			<option  value="">{`select ${desc.slice(0,-2)}...`}</option>
			{models.map(t =>
				<option key={t._id} value={t._id}>{t.desc}</option>
			)}
		</select>
	);
}

class CreateForm extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			eventId:null,
			homeId:null,
			guestId:null,
			date: null,
			errors:{}
		};
		this.handDateleChange = this.handDateleChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.isValid = this.isValid.bind(this);

		this.isCreating = !!this.props.match;
	}

	handDateleChange(date){
		//console.log(e._d);
		this.setState({date});
	}

	getInputData(){
		return {
			homeId: this.state.homeId,
			guestId: this.state.guestId,
			eventId: this.state.eventId,
			originHomeDesc: this.props.teams.find(t => t._id === homeId).desc,
			originGuestDesc: this.props.teams.find(t => t._id === guestId).desc,
			date: moment(this.state.date).format("DD/MM/YYYY"),
			location: this.refs.location.value,
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


	handleSubmit(e){
		e.preventDefault();
		const { dispatch } = this.props;
		this.setState({errors:{}, isLoading: true})

		if(this.isValid()){
			console.log(this.getInputData());
			dispatch(api.matches.add(this.getInputData()))
			.then( () => {
				this.setState({isLoading: false});
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
		return (
		<form onSubmit={this.handleSubmit.bind(this)}>
			<div className="form-group">

			    {errors.database && <span>{errors.database}</span>}

			    <ErrorWrapper error={errors.eventId}>
			    	<FormSelect
			    		desc="eventId"
			    		handleChange={this.handleSelectChange}
			    		models={this.props.events}
			    	/>
				</ErrorWrapper>


				<ErrorWrapper error={errors.homeId}>
				  	<FormSelect
				  		desc="homeId"
				  		handleChange={this.handleSelectChange}
				  		models={this.props.teams}
				  	/>
				</ErrorWrapper>

				<ErrorWrapper error={errors.guestId}>
					<FormSelect
						desc="guestId"
						handleChange={this.handleSelectChange}
						models={this.props.teams}
					/>
				</ErrorWrapper>

				<ErrorWrapper error={errors.date}>
					<DatePicker
						ref="date"
						locale="en-gb"
						placeholderText="pick a date"
						selected={this.state.date}
						onChange={this.handDateleChange}
					/>
				</ErrorWrapper>
					<input
						type='text'
						ref="location"
						placeholder="location"
					/>

				<input
					type='submit'
					className="btn btn-primary"
					value='create'
				/>

			</div>
		</form>
		);
	}
}

export default CreateForm;
