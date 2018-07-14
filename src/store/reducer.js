import {reducer as welcomeReducer} from '../pages/welcome/store/';
import{reducer as homeReducer} from '../pages/home/store';
import {reducer as registerReducer} from '../pages/register/store';
import {combineReducers} from 'redux-immutable';


const reducer=combineReducers({
    welcome:welcomeReducer,
    home:homeReducer,
    register:registerReducer,
})

export default reducer;