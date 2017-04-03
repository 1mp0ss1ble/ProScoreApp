import React from 'react';
import { Link } from 'react-router';


export default () => {
	return (
		<nav className="navbar navbar-default">
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
	);
}