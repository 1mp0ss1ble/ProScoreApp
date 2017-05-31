import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwtDecode from 'jwt-decode';
import rootReducer from './reducers';
import setAuthorizationToken from '../users/setAuthorizationToken';
import {setCurrentUser} from '../users/usersActions';

let finalCreateStore;

if(process.env.NODE_ENV !== "production"){ /*enable redux dev tool */
	 finalCreateStore = compose(
	 	window.devToolsExtension ? window.devToolsExtension() : f => f
	 )(createStore);
}else{
	finalCreateStore = createStore;
}

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(finalCreateStore);



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
