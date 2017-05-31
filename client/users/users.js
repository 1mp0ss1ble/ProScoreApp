import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Users = ({users, loader}) =>{

  if(loader && !users.length){
    return <p>Loading...</p>
  }

  return (
    <div>
      <h3>Users <small>({users.length})</small></h3>
      <ul>
        {users.map( user => <li title={`ID: ${user._id}`} key={user._id}>{user.username}</li>)}
      </ul>
    </div>
  );
}

Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default connect(state => ({users: state.users, loader: state.loaders.isFetchingUsers}))(Users);
