import {reducer as welcomeReducer} from '../pages/welcome/store/';
import{reducer as homeReducer} from '../pages/home/store';
import {reducer as registerReducer} from '../pages/register/store';
import{reducer as messageReducer} from '../pages/message/store';
import {combineReducers} from 'redux-immutable';


const reducer=combineReducers({
    welcome:welcomeReducer,
    home:homeReducer,
    register:registerReducer
    message:messageReducer
})

export default reducer;