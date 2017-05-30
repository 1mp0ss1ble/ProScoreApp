import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import classnames from 'classnames';
import jwtDecode from 'jwt-decode';
import api from '../../api/db';
import { connect } from 'react-redux';
import setAuthorizationToken from '../../users/setAuthorizationToken';
import ErrorWrapper from '../../common/components/errorWrapper';
import validateInput from '../../../server/shared/validations/checkSignup';


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errors: {},
      isLoading: false,
    }
    this.isValid = this.isValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

onChange(e){
  this.setState({[e.target.name]:e.target.value});
}

  isValid(){
    const {errors, isValid} = validateInput(this.state);
    if(!isValid){
			this.setState({errors, isLoading:false});
		}
    return isValid;
  }

  onSubmit(e){
    e.preventDefault();
    const {dispatch} = this.props;
    this.setState({errors:{},isLoading:true});

    //return console.log(this.state);

    if(this.isValid()){
      dispatch(api.users.login(this.state)).then( res => { /*success*/
        this.setState({isLoading:false});
        const token = res.data.token
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        //console.log(jwtDecode(token));
        dispatch({type:"SET_CURRENT_USER", payload: jwtDecode(token)});
        hashHistory.push('/');
      })
      .catch( err => {
        console.log('errors',err);
        this.setState({errors: err.response.data,isLoading: false});
      });
    }
  }

  render(){
    const {errors} = this.state;

    return (
      <div>
        Log in
        <form onSubmit={this.onSubmit}>

        <ErrorWrapper className="input-group" error={errors.form}>
          <div className="input-group">
            <span className="input-group-addon modal-addon"
  					id="basic-addon1">username</span>
  					<input
  						onChange={this.onChange}
  						name="username"
  						type="text"
  						className="form-control"
  					/>
          </div>
          <div className="input-group">
          	<span className="input-group-addon modal-addon"
  					id="basic-addon2">password</span>
  					<input
  						onChange={this.onChange}
  						name="password"
  						type="password"
  						className="form-control"
  					/>
          </div>
				</ErrorWrapper>


          <button type="submit" disabled={this.state.isLoading} className="btn btn-default">Go</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
}


export default connect()(Login);
