import React from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import Modal from './modal';
import api from '../api/db';
import setAuthorizationToken from '../users/setAuthorizationToken';
import {setCurrentUser} from '../users/usersActions';


class App extends React.Component {
	constructor(props){
		super(props);

		this.logout = this.logout.bind(this);
	}

	componentDidMount(){
		for(let key in api){
			if(Object.hasOwnProperty.call(api,key) && key !== 'auth'){
				console.log(key);
				this.props.dispatch(api[key].get());
			}
		}
	}

 logout(){
	 localStorage.removeItem('jwtToken');
	 setAuthorizationToken(null);
	 this.props.dispatch(setCurrentUser({}));
 }

	render(){
		return (
			<div className="content">

				<NavigationBar user={this.props.user} logout={this.logout} />

				<div className="container">
					 { this.props.children }
				</div>
				<Modal />
			</div>
		);
	}
};

export default connect(state =>
	({loaders:state.loaders, user: state.auth}))(App);
