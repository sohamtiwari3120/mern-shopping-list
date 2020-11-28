import { combineReducers } from 'redux';
import ItemReducer from './ItemReducer'
import ErrorReducer from './ErrorReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
    ItemReducer,
    ErrorReducer,
    AuthReducer
});