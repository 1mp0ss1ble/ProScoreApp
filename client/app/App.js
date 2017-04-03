import React from 'react';
import NavigationBar from './NavigationBar';
import Modal from './modal';

class App extends React.Component {
	render(){
		return (
			<div className="content">

				<NavigationBar />

				<div className="container">
					
					{this.props.children}
				</div>

				<Modal />
				
			</div>
		);
	}
};

export default App;