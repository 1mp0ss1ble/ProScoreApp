import React from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap'
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
				{tabsInstance}
				<div className="container">
					 { this.props.children }
				</div>
				<Modal />
			</div>
		);
	}
};

export default connect(state =>
	({loaders:state.loaders}))(App);




	const tabsInstance = (
	  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
	    <Row className="clearfix">
	      <Col sm={4}>
	        <Nav bsStyle="pills" stacked>
	          <NavItem eventKey="first">
	            Tab 1
	          </NavItem>
	          <NavItem eventKey="second">
	            Tab 2
	          </NavItem>
	        </Nav>
	      </Col>
	      <Col sm={8}>
	        <Tab.Content animation>
	          <Tab.Pane eventKey="first">
	            Tab 1 content
	          </Tab.Pane>
	          <Tab.Pane eventKey="second">
	            Tab 2 content
	          </Tab.Pane>
	        </Tab.Content>
	      </Col>
	    </Row>
	  </Tab.Container>
	);
