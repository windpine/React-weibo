import {reducer as welcomeReducer} from '../pages/welcome/store/';
import{reducer as homeReducer} from '../pages/home/store';
import{reducer as messageReducer} from '../pages/message/store';
import {combineReducers} from 'redux-immutable';


const reducer=combineReducers({
    welcome:welcomeReducer,
    home:homeReducer,
    message:messageReducer
})

export default reducer;