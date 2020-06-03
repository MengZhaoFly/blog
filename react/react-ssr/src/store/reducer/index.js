import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import loginReducer from './loginReducer';

const reducer = combineReducers({
	home: homeReducer,
	login: loginReducer
});

export default reducer;
