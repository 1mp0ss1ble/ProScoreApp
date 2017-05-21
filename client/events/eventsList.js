import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


function getFullDesc(event, tournament){
  let descArr = [];

 if(!tournament  || !event){
   return "";
 }

  return tournament.desc + "/" + event.desc;
}

class EventsList extends React.Component{
  constructor(props){
   super(props);
  }



  render(){

    const {loaders, events, tournaments} = this.props;

    if(loaders.isFetchingEvents && !events.length){
      return <span>loading...</span>;
    }

    return (
      <select onChange={(e)=>{this.props.showEvent(e.target.value);}}>
      <option value="">select an event</option>
        {this.props.events.filter(x=>x.isActive).map( event =>
          <option key={event._id} value={event._id}>
            {getFullDesc(event,tournaments.find(x=>x._id === event.tournamentId) )}
          </option>
        )}
      </select>
    );
  }
}


EventsList.propTypes = {
  showEvent: PropTypes.func.isRequired
};


export default connect(state => ({
  events: state.events,
  loaders: state.loaders,
  tournaments: state.tournaments,
}))(EventsList);
