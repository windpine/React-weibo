import {reducer as welcomeReducer} from '../pages/welcome/store/';
import {combineReducers} from 'redux-immutable';


const reducer=combineReducers({
    welcome:welcomeReducer
})

export default reducer;