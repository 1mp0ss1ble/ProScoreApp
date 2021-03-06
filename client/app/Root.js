import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory }  from 'react-router';
import App from './App';
import configureStore from './configureStore';
import HomePage from '../pages/home';
import AdminPage from '../pages/admin';
import SignupPage from '../pages/signup';
import LoginPage from '../pages/login';


const Signup = () => <div>Signup</div>;


const Root = () => (
<Provider store={configureStore()}>
	<Router history={hashHistory}>
	     <Route component={App}>
			  <Route path="/" component={HomePage} />
			  <Route path="/signup" component={SignupPage} />
				<Route path="/login" component={LoginPage} />
			  <Route path="admin(/:type)" component={AdminPage} />
	    </Route>
  </Router>
</Provider>
);


export default Root;
