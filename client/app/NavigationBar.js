import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

//import { LinkContainer } from 'react-router-bootstrap';
//import { Nav, Navbar, NavItem,NavDropdown, MenuItem} from 'react-bootstrap/lib';




class NavigationBar extends React.Component{
	render(){
		const {user} = this.props.user;
		console.log('user',user);

		const guestLinks = (
			<ul className="nav navbar-nav navbar-left">

				<li>
					<Link to="/Signup">Signup</Link>
				</li>
				<li>
					<Link to="/Login">Login</Link>
				</li>
			</ul>
		);

		const userLinks = (user) => (
			<ul className="nav navbar-nav navbar-left">
				<li>
					<Link to="/logout"
						onClick={(e)=>{
							e.preventDefault(); this.props.logout();
						}}
					>
					 Hi, <b>{user.username}</b> (Log out)
					</Link>
			  </li>
			</ul>
		);

		return (
				<nav className="navbar navbar-default">
					<div className="container-fluid">
						<div className="navbar-header">
							<Link to="/" className="navbar-brand">Match</Link>
						</div>

						<div className="">

							<ul className="nav navbar-nav navbar-left">
								<li>
									<Link to="/Admin">Admin</Link>
								</li>
	   					</ul>

			  			{ user && !isEmpty(user) ? userLinks(user) : guestLinks }

						</div>
					</div>
				</nav>
			 /*

			<Navbar collapseOnSelect>
			<Navbar.Header>
			  <Navbar.Brand>
				<a href="#">ProScore</a>
			  </Navbar.Brand>
			  <Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
			  <Nav pullRight>
				<LinkContainer to={{pathname: '/admin'}}>
					<NavItem eventKey={1} href="#/Admin">Admin</NavItem>
				</LinkContainer>

				<LinkContainer to={{pathname: '/signup'}}>
					<NavItem eventKey={1} href="#/Signup">Signup</NavItem>
				</LinkContainer>
			  </Nav>
			</Navbar.Collapse>
		  </Navbar> */
		);
   }
}
NavigationBar.propTypes = {
	user: PropTypes.object,
  logout: PropTypes.func.isRequired,
}

export default NavigationBar;
