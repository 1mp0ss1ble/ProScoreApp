import React from 'react';
import { connect } from 'react-redux';
import TeamModal  from '../teams/teamModal';
import TournamentModal  from '../tournaments/tournamentModal';
import MatchForm  from '../matches/matchForm';
import EventForm  from '../events/eventForm';
import {types} from './constants';

const Modal = ({state,dispatch}) => {
	
	const renderContent = (type) => {
		
		switch(type){
			case types.team:
				return <TeamModal 
							team = {state.content} 
							dispatch={dispatch} 
							closeModalAction={closeModalAction}  />;
			case types.tournament:
				return <TournamentModal
							 tournament = {state.content} 
							 dispatch={dispatch}  
							 closeModalAction={closeModalAction} />;
			case types.match:
				return <MatchForm
							 match = {state.content} 
							 dispatch={dispatch}  
							 closeModalAction={closeModalAction} />;
			case types.event:
				return <EventForm
							 event = {state.content} 
							 dispatch={dispatch}  
							 closeModalAction={closeModalAction} />; 
			default:
				return <div>default</div>;
		}
	}	
	
	const onCLose = () => {
		dispatch(close());
	} 

	if (state.isOpened)
		return (
			<div className="modal">
				
				<div className="modal-content">
				<span className="close" onClick={onCLose}>&times;</span>
					{renderContent(state.modalType)}
				</div>
			</div>
		);
	else
		return null;

}



const close = () => (dispatch) => dispatch(closeModalAction);

const closeModalAction = {type:'CLOSE_MODAL'};


export default connect(state=>({state: state.modal}))(Modal);
