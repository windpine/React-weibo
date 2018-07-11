import {reducer as welcomeReducer} from '../pages/welcome/store/';
import{reducer as homeReducer} from '../pages/home/store';
import {combineReducers} from 'redux-immutable';


const reducer=combineReducers({
    welcome:welcomeReducer,
    home:homeReducer,
})

export default reducer;