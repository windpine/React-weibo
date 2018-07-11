import {reducer as welcomeReducer} from '../pages/welcome/store/';
import{reducer as homeReducer} from '../pages/home/store';
import {reducer as profileReducer} from '../pages/profile/store/';
import {combineReducers} from 'redux-immutable';


const reducer=combineReducers({
    welcome:welcomeReducer,
    home:homeReducer,
    profile:profileReducer,
})

export default reducer;