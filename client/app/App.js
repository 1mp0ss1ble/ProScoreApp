import React from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import Modal from './modal';
import api from '../api/db';

class App extends React.Component {

	componentDidMount(){
		//this.props.dispatch(api.teams.get());
		//this.props.dispatch(api.tournaments.get());
		//this.props.dispatch(api.matches.get());
		//this.props.dispatch(api.events.get());
		for(let key in api){
			if(Object.hasOwnProperty.call(api,key) && key !== 'auth'){
				console.log(key);
				this.props.dispatch(api[key].get());
			}
		}
	}


	render(){
		return (
			<div className="content">

				<NavigationBar />

				<div className="container">
					 { this.props.children }
				</div>

				<Modal />

			</div>
		);
	}
};

export default connect(state=>({loaders:state.loaders}))(App);
