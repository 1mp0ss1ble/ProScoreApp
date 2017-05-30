import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import jwtDecode from 'jwt-decode';
import rootReducer from './reducers';
import setAuthorizationToken from '../users/setAuthorizationToken';
import {setCurrentUser} from '../users/usersActions';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);



export default () => {
	const store = createStoreWithMiddleware(rootReducer);

 const token = localStorage.jwtToken;

	if(token){
			setAuthorizationToken(token);
			store.dispatch(setCurrentUser(jwtDecode(token)));
			//{type:"SET_CURRENT_USER", payload: });
	}

  return store;
};
