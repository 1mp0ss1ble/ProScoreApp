import React from 'react';
import { connect } from 'react-redux';
import api from '../api';
import * as actions from './playersActions';
import {types} from '../app/constants';

const Players = ({players, isFetching}) => {
	
	if(isFetching && !players.length) {
		return <div>loading...</div>;
	}

	const result = players.map((t,index) =>
		<li key={index} >{t.username}</li>
	);

	return (<ol>{result}</ol>);
};


class PlayersContainer extends React.Component {
	componentDidMount(){
		this.props.fetchPlayers(types.player);
	}

	render(){
		const {players, isFetching} = this.props;
		return <Players players={players} isFetching={isFetching} />
	}
}

const mapStateToProps = (state) => ({
	players: state.players,
	isFetching: state.loaders.isFetchingPlayers
}); 


const mapDisptachToProps = {fetchPlayers: api.getItems};

export default connect(mapStateToProps, mapDisptachToProps)(PlayersContainer);