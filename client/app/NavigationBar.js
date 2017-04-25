import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem,NavDropdown, MenuItem} from 'react-bootstrap/lib';


class NavigationBar extends React.Component{
	render(){
		return (
			/*	<nav className="navbar navbar-default">
					<div className="container-fluid">
						<div className="navbar-header">
							<Link to="/" className="navbar-brand">Match</Link>
						</div>

						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav navbar-right">
								<li>
									<Link to="/Admin">Admin</Link>							
								</li>
								<li>
									<Link to="/Signup">Signup</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			 */	

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
		  </Navbar>
		);
   }
}

export default NavigationBar;
