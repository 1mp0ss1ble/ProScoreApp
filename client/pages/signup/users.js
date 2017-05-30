import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Users extends React.Component {
  render(){

    if(this.props.loader && !this.props.users.length){
      return <p>loading...</p>;
    }

    return (
      <div>
        <h4>  Users: {this.props.users.length} </h4>
        {this.props.users.map(user =>
          <p key={user._id}>{user.username} {user.password} </p>
        )}
      </div>
    );
  }
}


Users.propTypes = {
  users: PropTypes.array.isRequired,
  loader: PropTypes.bool.isRequired,
};

Users.defaultProps = {
  users: [],
  loader: true,
};


export default connect(state => ({ users: state.users, loader: state.loaders.isFetchingUsers }))(Users);
